import { useEffect, useRef } from 'react';
import useLatestObj from '../../common/use-latest-obj';
import { useInputAble } from '../../common/use-input-able';
import {
  BaseTreeProps,
  TreePathType,
  CheckedStatusType,
  TreeContext,
  UpdateFunc,
  TreeDatum,
} from './use-tree.type';
import { usePersistFn } from '../../common/use-persist-fn';
import { KeygenResult } from '../../common/type';
import { isFunc, isString, isNumber, isArray, isUnMatchedData } from '../../utils/is';

function toArray<Value>(value: Value) {
  if (!value) return [];
  if (!Array.isArray(value)) return [value];
  return value;
}

export const MODE = {
  /**
   * 返回全选数据，包含父节点和子节点
   */
  MODE_0: 0,

  /**
   * 返回子节点和选中的父节点，不包含半选的父节点
   */
  MODE_1: 1,

  /**
   * 返回子节点，不包含父节点
   */
  MODE_2: 2,

  /**
   * 返回父亲节点，前提是子已经全选了
   */
  MODE_3: 3,

  /**
   * 所选即所得，与父子关系无关
   */
  MODE_4: 4,
};

const useTree = <DataItem>(props: BaseTreeProps<DataItem>) => {
  const {
    defaultValue,
    value = defaultValue,
    data = [],
    childrenKey = 'children' as keyof DataItem & string,
    keygen,
    mode,
    active: activeProp,
    expanded: expandedProp,
    dataUpdate = true,
    defaultExpanded = [],
    defaultExpandAll,
    disabled: disabledProps,
    unmatch,
    isControlled,
    onExpand: onExpandProp,
  } = props;

  const { value: expanded, onChange: onExpand } = useInputAble({
    value: expandedProp,
    defaultValue: defaultExpanded,
    control: isControlled,
    onChange: onExpandProp,
    beforeChange: undefined,
  });

  const { current: context } = useRef<TreeContext<DataItem>>({
    pathMap: new Map<KeygenResult, TreePathType>(),
    dataMap: new Map<KeygenResult, DataItem>(),
    forceUpdateMap: new Map<KeygenResult, () => void>(),
    valueMap: new Map<KeygenResult, CheckedStatusType>(),
    updateMap: new Map<KeygenResult, UpdateFunc>(),
    unmatchedValueMap: new Map<any, any>(),
    value: undefined,
    data: [],
    cachedValue: [],
    valueDataCache: new Map<KeygenResult, DataItem>(),
  });

  // 注册刷新方法
  const bindUpdate = usePersistFn((id: KeygenResult, update: () => void) => {
    context.forceUpdateMap.set(id, update);
  });

  const unBindUpdate = usePersistFn((id: KeygenResult) => {
    context.forceUpdateMap.delete(id);
  });

  // 注册节点
  const bindNode = (id: KeygenResult, update: UpdateFunc, item: DataItem) => {
    context.updateMap.set(id, update);
    const isActive = activeProp === id;
    const expandeds = expanded;

    if (defaultExpandAll) {
      const shouldDefaultExpand =
        defaultExpandAll &&
        isArray(item[childrenKey]) &&
        (item[childrenKey] as DataItem[]).length > 0;
      return { active: isActive, expanded: shouldDefaultExpand };
    }
    return { active: isActive, expanded: !!(expandeds && expandeds.indexOf(id) >= 0) };
  };

  const get = (id: KeygenResult) => {
    return context.valueMap.get(id);
  };

  const getKey = (item: DataItem, id: KeygenResult = '', index?: number): KeygenResult => {
    if (isFunc(keygen)) {
      return keygen(item, id as string);
    }

    if (keygen && (isString(keygen) || isNumber(keygen))) {
      return item[keygen] as KeygenResult;
    }

    // 降级处理
    return (id + (id ? ',' : '') + index) as KeygenResult;
  };

  const getValue = () => {
    const values = [] as KeygenResult[];
    context.valueMap.forEach((checked, id) => {
      switch (mode) {
        case MODE.MODE_0:
        case MODE.MODE_4:
          if (checked === 1) values.push(id);
          break;
        case MODE.MODE_1:
          if (checked >= 1) values.push(id);
          break;
        case MODE.MODE_2:
          if (checked === 1) {
            const info = context.pathMap.get(id);
            if (info && info.children.length === 0) values.push(id);
          }
          break;
        case MODE.MODE_3:
          if (checked === 1) {
            const parentChecked = (() => {
              const info = context.pathMap.get(id);
              if (!info) return false;
              const { path } = info;
              const pid = path[path.length - 1];
              if (!pid && pid !== 0) return false;
              return context.valueMap.get(pid) === 1;
            })();
            if (!parentChecked) values.push(id);
          }
          break;
        default:
      }
    });
    context.unmatchedValueMap.forEach((unmatch, id) => {
      if (unmatch) values.push(id);
    });
    context.cachedValue = values;
    return values;
  };

  const getPath = (id: KeygenResult) => {
    return context.pathMap.get(id);
  };

  const getDisabled = usePersistFn(() => {
    if (isFunc(disabledProps)) {
      return disabledProps;
    }

    return () => false;
  });

  const getChecked = (id: KeygenResult) => {
    const value = get(id);
    let checked: boolean | 'indeterminate' = value === 1;
    if (value === 2) checked = 'indeterminate';
    return checked;
  };

  const getDataById = (id: KeygenResult) => {
    const oroginData = context.dataMap.get(id);
    if (oroginData) {
      return oroginData;
    }
    if (!unmatch) return null;
    return { IS_NOT_MATCHED_VALUE: true, value: id };
  };

  const getDataByValues = (values: KeygenResult[] | KeygenResult): DataItem | DataItem[] | null => {
    if (isArray(values)) {
      return values.map(getDataById) as DataItem[] | null;
    }

    return getDataById(values) as DataItem | null;
  };

  const isUnMatched = usePersistFn((data: any) => {
    return isUnMatchedData(data);
  });

  const setValueMap = (id: KeygenResult, checked: CheckedStatusType) => {
    context.valueMap.set(id, checked);
    const update = context.forceUpdateMap.get(id);
    if (update) update();
  };

  const setUnmatedValue = () => {
    context.unmatchedValueMap = new Map();
    if (!context.value || !context.data) return;
    context.value.forEach((v) => {
      const data = getDataById(v);
      const unmatched = isUnMatchedData(data);
      if (unmatched) context.unmatchedValueMap.set(v, true);
      else context.unmatchedValueMap.delete(v);
    });
  };

  const initData = (
    data: DataItem[],
    path: KeygenResult[],
    disabled?: boolean,
    index: number[] = [],
  ): KeygenResult[] | undefined => {
    const ids: KeygenResult[] = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const id = getKey(item, path[path.length - 1], i) as KeygenResult;
      // 重复 id 警告
      if (context.dataMap.get(id)) {
        console.error(`There is already a key "${id}" exists. The key must be unique.`);
        continue;
      }

      // 制作 data mapping
      context.dataMap.set(id, item);

      let isDisabled = !!disabled;
      if (isDisabled === false) {
        isDisabled = getDisabled()(item);
      }

      const indexPath = [...index, i];

      ids.push(id);

      let children: KeygenResult[] = [];

      if (Array.isArray(item[childrenKey])) {
        const _children = initData(
          item[childrenKey] as DataItem[],
          [...path, id],
          mode === MODE.MODE_4 ? disabled : isDisabled,
          indexPath,
        );
        if (_children) children = _children;
      }

      context.pathMap.set(id, {
        children,
        path,
        isDisabled,
        indexPath,
        index: i,
      });
    }
    return ids;
  };

  const initValue = (ids_outer?: KeygenResult[], forceCheck?: boolean) => {
    let ids = ids_outer;
    if (!context.data || !context.value) {
      return undefined;
    }

    if (!ids) {
      ids = [];
      context.pathMap.forEach((item, index) => {
        if (item.path.length === 0) {
          ids!.push(index);
        }
      });
    }

    // 当前节点的选中状态
    let checked: CheckedStatusType;

    // 递归处理每个节点的选中状态
    for (let i = 0; i < ids.length; i++) {
      const item = ids[i];
      const { children } = context.pathMap.get(item)!;

      if (forceCheck) {
        setValueMap(item, 1);
        initValue(children, forceCheck);
        continue;
      }

      let childChecked: CheckedStatusType = context.value!.indexOf(item) >= 0 ? 1 : 0;

      // 选中且非 mode 1 和 mode 4，则需要将其子选项统统强制选中
      if (childChecked === 1 && mode !== MODE.MODE_1 && mode !== MODE.MODE_4) {
        initValue(children, true);
      }
      // mode 2 mode 3 mode 的情况下，需要根据 children 内容来决定是否选中
      else if (children.length > 0) {
        const res: CheckedStatusType = initValue(children)!;
        childChecked = mode === MODE.MODE_4 ? childChecked : res;
      }
      // 没有子节点的情况下，需要根据 value 来决定是否选中
      else {
        childChecked = context.value!.indexOf(item) >= 0 ? 1 : 0;
      }

      // 同步状态至 map 中
      setValueMap(item, childChecked);

      // @ts-ignore
      if (checked === undefined) {
        checked = childChecked;
      } else if (checked !== childChecked) {
        checked = 2;
      }
    }

    return checked!;
  };

  const setValue = (value?: KeygenResult[]) => {
    context.value = toArray(value) as KeygenResult[];
    if (value !== context.cachedValue) {
      initValue();
    }
    setUnmatedValue();
  };

  const isDisabled = (id: KeygenResult) => {
    if (isFunc(disabledProps)) {
      const node = context.pathMap.get(id);
      if (node) return node.isDisabled;
      return false;
    }
    return !!disabledProps;
  };

  type CheckedStatus = 0 | 1 | 2;

  const checkStatusStack = (stack: CheckedStatus[], defaultStatus: CheckedStatus) => {
    if (!stack || stack.length <= 0) return defaultStatus;
    if (stack.filter((d) => d === 0).length === stack.length) return 0;

    const s = stack.filter((d) => d === 0 || d === 2);

    if (s.length <= 0) return defaultStatus;
    return 2;
  };

  const setData = (data?: DataItem[]) => {
    const prevValue = context.value || [];
    context.cachedValue = [];
    context.pathMap = new Map();
    context.dataMap = new Map();
    context.valueMap = new Map();
    context.unmatchedValueMap = new Map();
    context.data = toArray(data) as DataItem[];
    if (!data) return;

    initData(context.data, []);
    initValue();
    setValue(prevValue);
  };

  const set = (id: KeygenResult, checked: CheckedStatusType, direction?: 'asc' | 'desc') => {
    if (!isDisabled(id)) {
      setValueMap(id, checked);
    }

    const data = getDataById(id);

    if (data && (data as any)['IS_NOT_MATCHED_VALUE']) {
      if (checked) context.unmatchedValueMap.set(id, true);
      else context.unmatchedValueMap.delete(id);
      return null;
    }

    if (mode === MODE.MODE_4) {
      return 0;
    }

    const { path, children } = context.pathMap.get(id)!;

    const childrenStack: CheckedStatusType[] = [];

    if (direction !== 'asc') {
      children.forEach((cid) => {
        const v = set(cid, checked, 'desc')!;
        childrenStack.push(v);
      });
    }

    let current = context.valueMap.get(id)!;

    const status = checkStatusStack(childrenStack, current);
    if (status !== current) {
      setValueMap(id, status);
      current = status;
    }

    if (direction !== 'desc' && path.length > 0) {
      const parentId = path[path.length - 1];
      let parentChecked = current;
      context.pathMap.get(parentId)!.children.forEach((cid) => {
        if (parentChecked !== context.valueMap.get(cid)) {
          parentChecked = 2;
        }
      });
      set(parentId, parentChecked, 'asc');
    }
    return current;
  };

  useEffect(() => {
    if (defaultExpandAll) {
      const nextExpanded = [] as KeygenResult[];
      context.dataMap.forEach((item, k) => {
        if (item[childrenKey]) {
          nextExpanded.push(k);
        }
      });
      onExpand(nextExpanded);
    }
  }, []);

  useEffect(() => {
    if (props.datum) return;
    if (!dataUpdate) return;
    setData(data);
  }, [data]);

  useEffect(() => {
    if (props.datum) return;
    setValue(value);
  }, [value]);

  const datum: TreeDatum<DataItem> = useLatestObj({
    get,
    set,
    getPath,
    getValue,
    getChecked,
    getKey,
    getDataByValues,
    setValue,
    setData,
    isDisabled,
    bindNode,
    getDataById,
    bindUpdate,
    unBindUpdate,
    isUnMatched,
    childrenKey,
    data,
    pathMap: context.pathMap,
    dataMap: context.dataMap,
    valueMap: context.valueMap,
    updateMap: context.updateMap,
  });

  return {
    datum: props.datum || datum,
    expanded,
    onExpand,
  };
};

export default useTree;
