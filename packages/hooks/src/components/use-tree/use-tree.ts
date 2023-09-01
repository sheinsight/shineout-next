import { useEffect, useRef } from 'react';
import { BaseTreeProps, TreePathType, CheckedStatusType, TreeContext } from './use-tree.type';
import { KeygenResult } from '../../common/type';
import { isFunc, isString, isNumber } from '../../utils/is';

export const MODE = {
  MODE_0: 0,
  MODE_1: 1,
  MODE_2: 2,
  MODE_3: 3,
  MODE_4: 4,
};

const useTree = <DataItem>(props: BaseTreeProps<DataItem>) => {
  const {
    // value,
    data = [],
    childrenKey = 'children' as keyof DataItem,
    keygen,
    mode,
    disabled: disabledProps,
  } = props;

  const { current: context } = useRef<TreeContext<DataItem>>({
    pathMap: new Map<KeygenResult, TreePathType>(),
    dataMap: new Map<KeygenResult, DataItem>(),
    valueMap: new Map<KeygenResult, CheckedStatusType>(),
    disabled: false,
  });

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

  // const initValue = (ids: KeygenResult[] = [], forceCheck?: boolean) => {
  //   if (data || value) {
  //     return undefined;
  //   }

  //   if (ids.length === 0) {
  //     context.pathMap.forEach((path, index) => {
  //       if (path.path.length === 0) {
  //         ids.push(index);
  //       }
  //     });
  //   }

  //   for (let i = 0; i < ids.length; i++) {
  //     const { children } = context.pathMap.get(ids[i]);

  //     console.log(children)
  //   }
  // };

  const setData = () => {
    if (!data) return;

    context.pathMap = new Map();
    context.dataMap = new Map();
    context.valueMap = new Map();
    context.disabled = getDisabled();
  };

  // const setValue = () => {};

  useEffect(() => {
    setData();
    initData(data, []);
    console.log(context);
  }, []);

  return {};
};

export default useTree;
