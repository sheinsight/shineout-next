import { useEffect, useRef } from 'react';
import {
  BaseTreeProps,
  TreePathType,
  CheckedStatusType,
  TreeContext,
  UpdateFunc,
} from './use-tree.type';
import { KeygenResult } from '../../common/type';
import { isFunc, isString, isNumber } from '../../utils/is';

export const MODE = {
  // 返回全选数据，包含父节点和子节点
  MODE_0: 0,

  // 返回子节点和选中的父节点，不包含半选的父节点
  MODE_1: 1,

  // 返回子节点，不包含父节点
  MODE_2: 2,

  // 返回父亲节点，前提是子已经全选了
  MODE_3: 3,

  // 所选即所得，与父子关系无关
  MODE_4: 4,
};

const useTree = <DataItem>(props: BaseTreeProps<DataItem>) => {
  const {
    value = [],
    data = [],
    childrenKey = 'children' as keyof DataItem,
    keygen,
    mode,
    active,
    expanded,
    defaultExpanded,
    defaultExpandAll,
    disabled: disabledProps,
  } = props;

  const { current: context } = useRef<TreeContext<DataItem>>({
    pathMap: new Map<KeygenResult, TreePathType>(),
    dataMap: new Map<KeygenResult, DataItem>(),
    valueMap: new Map<KeygenResult, CheckedStatusType>(),
    updateMap: new Map<KeygenResult, UpdateFunc>(),
    disabled: false,
  });

  // 注册节点
  const registerUpdate = (id: KeygenResult, update: UpdateFunc) => {
    context.updateMap.set(id, update);

    const isActive = active === id;
    const expandeds = expanded || defaultExpanded;

    if (defaultExpandAll) {
      return { active: isActive, expanded: true };
    }
    return { active: isActive, expanded: !!(expandeds && expandeds.indexOf(id) >= 0) };
  };

  const getKey = (item: DataItem, id: KeygenResult = '', index?: number) => {
    if (isFunc(keygen)) {
      return keygen(item, index);
    }

    if (keygen && (isString(keygen) || isNumber(keygen))) {
      return item[keygen] as KeygenResult;
    }

    // 降级处理
    return id + (id ? ',' : '') + index;
  };

  const getDisabled = () => {
    if (isFunc(disabledProps)) {
      return disabledProps;
    }

    return () => !!disabledProps;
  };

  const setValueMap = (id: KeygenResult, checked: CheckedStatusType) => {
    context.valueMap.set(id, checked);
  };

  const initData = (
    data: DataItem[],
    path: KeygenResult[],
    disabled?: boolean,
    index: number[] = [],
  ) => {
    const ids: KeygenResult[] = [];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const id = getKey(item, path[path.length - 1], i);

      // 重复 id 警告
      if (context.dataMap.get(id)) {
        return;
      }
      // 制作 data mapping
      context.dataMap.set(id, item);

      let isDisabled = !!disabled;

      if (isDisabled === false && isFunc(context.disabled)) {
        isDisabled = context.disabled(item);
      }

      ids.push(id);

      const indexPath = [...index, i];
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
        index: i,
        path,
        children,
        isDisabled,
        indexPath,
      });
    }

    return ids;
  };

  const initValue = (ids: KeygenResult[] = [], forceCheck?: boolean) => {
    if (!data || !value) {
      return undefined;
    }

    if (ids.length === 0) {
      context.pathMap.forEach((path, index) => {
        if (path.path.length === 0) {
          ids.push(index);
        }
      });
    }

    // 当前节点的选中状态
    let checked: CheckedStatusType;

    // 递归处理每个节点的选中状态
    for (let i = 0; i < ids.length; i++) {
      const { children } = context.pathMap.get(ids[i])!;
      if (forceCheck) {
        setValueMap(ids[i], 1);
        initValue(children, forceCheck);
        return;
      }

      let childChecked: CheckedStatusType = value!.indexOf(ids[i]) >= 0 ? 1 : 0;

      // 选中且非 mode 1 和 mode 4，则需要将其子选项统统强制选中
      if (childChecked === 1 && mode !== MODE.MODE_1 && mode !== MODE.MODE_4) {
        initValue(children, true);
      }
      // mode 2 mode 3 mode 的情况下，需要根据 children 内容来决定是否选中
      else if (children.length > 0) {
        const res: CheckedStatusType = initValue(children)!;
        if (mode !== MODE.MODE_4) {
          childChecked = res;
        }
      }
      // 没有子节点的情况下，需要根据 value 来决定是否选中
      else {
        childChecked = value.indexOf(ids[i]) >= 0 ? 1 : 0;
      }

      // 同步状态至 map 中
      setValueMap(ids[i], childChecked);

      if (checked === undefined) {
        checked = childChecked;
      } else if (checked !== childChecked) {
        checked = 2;
      }
    }

    return checked!;
  };

  const setValue = () => {
    initValue();
  };

  const setData = () => {
    if (!data) return;

    context.pathMap = new Map();
    context.dataMap = new Map();
    context.valueMap = new Map();
    context.disabled = getDisabled();
  };

  useEffect(() => {
    setData();
    initData(data, []);
    initValue();
    setValue();
    console.log(context.valueMap);
  }, []);

  return {
    pathMap: context.pathMap,
    dataMap: context.dataMap,
    valueMap: context.valueMap,
    registerUpdate,
  };
};

export default useTree;
