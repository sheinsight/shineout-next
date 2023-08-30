import { useEffect, useRef } from 'react';
import { BaseTreeProps, TreePathType, CheckedStatusType } from './use-tree.type';
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
  const { data, childrenKey, keygen, disabled: disabledProps } = props;

  const { current: context } = useRef({
    pathMap: new Map<KeygenResult, TreePathType>(),
    dataMap: new Map<KeygenResult, DataItem>(),
    valueMap: new Map<KeygenResult, CheckedStatusType>(),
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

      if (isDisabled === false && isFunc(disabledProps)) {
        isDisabled = disabledProps(item);
      }

      ids.push(id);

      const indexPath = [...index, i];
      let children: KeygenResult[] = [];

      if (Array.isArray(item[childrenKey])) {
        const _children = initData(
          item[childrenKey] as DataItem[],
          [...path, id],
          isDisabled,
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

  //   const setData = () => {
  //     if (!data) return;

  //     context.pathMap = new Map();
  //     context.dataMap = new Map();
  //     context.valueMap = new Map();
  //   };

  //   const setValue = () => {};

  useEffect(() => {
    initData(data, []);
  }, []);

  return {};
};

export default useTree;
