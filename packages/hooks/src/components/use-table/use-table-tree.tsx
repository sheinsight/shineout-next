import { useState, useEffect, useRef, useMemo } from 'react';
import { usePersistFn } from '../../common/use-persist-fn';
import { getKey } from '../../utils/render';
import type { BaseTableProps } from './use-table.type';
import { isObject } from '../../utils/is';
import { OptionalToRequired } from '../../common/type';
import { useLatestObj } from '../../common/use-latest-obj';

const getExpandData = (
  data: any[],
  keys: (string | number)[],
  keygen: any,
  treeColumnsName?: string,
): [any[], Map<any, number>] => {
  const expandKeys = keys;
  const expandSet = new Set(expandKeys);
  const expandLevel = new Map();

  if (expandSet.size === 0 || !treeColumnsName) {
    return [data, expandLevel];
  }

  const newData = [...(data || [])];

  for (let i = 0; i < newData.length; i++) {
    if (expandSet.size === 0) break;
    const item = newData[i];
    const key = getKey(keygen, item, i);
    const parentLevel = expandLevel.get(key) || 0;
    const children = isObject(item) && (item[treeColumnsName] as any[] | undefined);
    if (expandSet.has(key) && children) {
      children.forEach((child) => {
        expandLevel.set(getKey(keygen, child), parentLevel + 1);
      });
      newData.splice(i + 1, 0, ...children);
      expandSet.delete(key);
    }
  }
  return [newData, expandLevel];
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

  const [treeData, treeExpandLevel] = useMemo(
    () => getExpandData(props.data, expandKeys, props.keygen, props.treeColumnsName),
    [props.data, expandKeys, props.treeColumnsName],
  );

  const isEmptyTree =
    props.data.filter((item) => item[props.treeColumnsName!]?.length)?.length === 0;

  return {
    data: treeData,
    treeExpandLevel,
    changedByExpand: context.changedByExpand,
    isEmptyTree: isEmptyTree,
    func,
  };
};

export default useTableTree;
