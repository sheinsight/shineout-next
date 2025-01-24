import { useState, useEffect, useRef, useMemo } from 'react';
import { usePersistFn } from '../../common/use-persist-fn';
import { getKey } from '../../utils/render';
import type { BaseTableProps } from './use-table.type';
import { isObject } from '../../utils/is';
import { OptionalToRequired } from '../../common/type';
import { useLatestObj } from '../../common/use-latest-obj';
import { util } from '@sheinx/hooks';

interface GetExpandDataResult {
  treeData: any[];
  treeExpandLevel: Map<any, number>;
  unmatchExpandKeys: (string | number)[];
}
export const getExpandData = (
  _treeData: any[],
  keys: (string | number)[],
  keygen: any,
  treeColumnsName?: string,
): GetExpandDataResult => {
  const expandKeys = keys;
  const expandSet = new Set(expandKeys);
  const unmatchExpandKeys: (string | number)[] = [];
  const treeExpandLevel = new Map();

  if (expandSet.size === 0 || !treeColumnsName) {
    return { treeData: _treeData, treeExpandLevel, unmatchExpandKeys };
  }

  const treeData = [...(_treeData || [])];

  const treeDataInfo = treeData.map((item) => {
    return {
      id: getKey(keygen, item),
      level: 1,
      data: item,
      pid: null,
    };
  });

  for (let i = 0; i < treeData.length; i++) {
    if (expandSet.size === 0) break;
    const item = treeData[i];
    const key = getKey(keygen, item, i);
    const parentLevel = treeExpandLevel.get(key) || 0;
    const children = isObject(item) && (item[treeColumnsName] as any[] | undefined);
    if (expandSet.has(key)) {
      if (children && children.length > 0) {
        const nodes = [];
        children.forEach((child) => {
          const node = {
            id: getKey(keygen, child),
            level: parentLevel + 2,
            data: child,
            pid: key,
          };
          nodes.push(node);
          treeExpandLevel.set(getKey(keygen, child), parentLevel + 1);
        });
        treeData.splice(i + 1, 0, ...children);
        treeDataInfo.splice(i + 1, 0, ...nodes);
        expandSet.delete(key);
      } else {
        unmatchExpandKeys.push(key);
      }
    }
  }
  return { treeData, treeExpandLevel, unmatchExpandKeys, treeDataInfo };
};

export interface UseTableTreeProps
  extends Pick<
    OptionalToRequired<BaseTableProps<any>>,
    'onTreeExpand' | 'treeExpandKeys' | 'defaultTreeExpandKeys' | 'keygen'
  > {
  treeColumnsName: string | undefined;
  data: any[];
}

export const useTableTree = (props: UseTableTreeProps) => {
  const [expandKeysState, setExpandKeysState] = useState(props.defaultTreeExpandKeys || []);
  const { current: context } = useRef({
    changedByExpand: false,
  });

  useEffect(() => {
    context.changedByExpand = false;
  }, [expandKeysState, props.treeExpandKeys]);

  const expandKeys = props.treeExpandKeys === undefined ? expandKeysState : props.treeExpandKeys;

  const handleTreeExpand = usePersistFn((data: any, index: number) => {
    const key = getKey(props.keygen, data, index);
    const changeKeys = new Set(expandKeys);
    if (changeKeys.has(key)) {
      changeKeys.delete(key);
    } else {
      changeKeys.add(key);
    }

    if (props.treeExpandKeys === undefined) {
      setExpandKeysState(Array.from(changeKeys));
    } else if (props.onTreeExpand) {
      props.onTreeExpand?.(Array.from(changeKeys), data, changeKeys.has(key), index);
    }
    context.changedByExpand = true;
  });

  const isTreeExpanded = usePersistFn((data: any, index: number) => {
    if (!props.treeColumnsName) return false;
    const key = getKey(props.keygen, data, index);
    return expandKeys.includes(key);
  });

  const func = useLatestObj({
    isTreeExpanded,
    handleTreeExpand,
  });

  const { treeData, treeExpandLevel, unmatchExpandKeys } = useMemo(
    () => getExpandData(props.data, expandKeys, props.keygen, props.treeColumnsName),
    [props.data, expandKeys, props.treeColumnsName],
  );

  const isEmptyTree = useMemo(
    () => props.data.filter((item) => item[props.treeColumnsName!]?.length)?.length === 0,
    [props.data, props.treeColumnsName],
  );

  useEffect(() => {
    if (!unmatchExpandKeys.length || !expandKeysState.length) {
      return;
    }

    // 检查treeData中的每一项，对比expandKeysState，如果expandKeysState有但是children是空的，则需要修正expandKeysState
    const newExpandKeys = expandKeysState.filter((key) => !unmatchExpandKeys.includes(key));

    if (util.shallowEqual(newExpandKeys, expandKeysState)) {
      return;
    }

    setExpandKeysState(newExpandKeys);
  }, [unmatchExpandKeys, expandKeysState]);

  return {
    data: treeData,
    treeExpandLevel,
    changedByExpand: context.changedByExpand,
    isEmptyTree: isEmptyTree,
    func,
  };
};

export default useTableTree;
