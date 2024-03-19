import { produce } from '../utils/immer';
import { KeygenResult } from '../common/type';
import { deepClone } from './clone';

export const getFlattenTree = <T>(
  data: T[],
  childrenKey = 'children' as keyof T,
  wide?: boolean,
) => {
  const arr: T[][] = [];
  const flatten = (list: T[], path: T[]) => {
    list.forEach((item) => {
      const children = item[childrenKey] as any;
      if (children && children.length > 0) {
        const clonedPath = [...path];
        clonedPath.push(item);
        if (wide) arr.push(clonedPath);
        flatten(children, clonedPath);
      } else {
        arr.push([...path, item]);
      }
    });
  };
  flatten(data, []);
  return arr;
};

export const getFilterTree = <DataItem, K extends (node: DataItem) => KeygenResult>(
  treeNodes: DataItem[] | undefined,
  filterFunc: undefined | void | ((data: DataItem) => boolean),
  filterExpandKeys: KeygenResult[] | undefined,
  keyFunc: K,
  childrenKey = 'children' as keyof DataItem,
  showHitDescendants: boolean,
  firstMatchNode?: (node: DataItem) => void,
  {
    advanced,
  }: {
    advanced?: boolean;
  } = {},
) => {
  const mapFilteredNodeToData = (node: DataItem): DataItem | null => {
    if (!node) return null;
    let match = false;
    if (filterFunc && filterFunc(node)) {
      if (firstMatchNode) firstMatchNode(node);
      match = true;
    }
    const children = ((node[childrenKey] || []) as DataItem[])
      .map(mapFilteredNodeToData)
      .filter((n: any) => n);
    if (children.length || match) {
      const key = keyFunc(node);
      if (filterExpandKeys && children.length > 0) filterExpandKeys.push(key);
      if (!node[childrenKey]) return node;
      let childNodes = showHitDescendants && match ? node[childrenKey] || [] : children;
      if (advanced && match && children.length > 0) childNodes = children;
      return { ...node, [childrenKey]: childNodes };
    }
    return null;
  };
  return treeNodes!.map(mapFilteredNodeToData).filter((node) => node);
};

type FilterDatum<DataItem> = {
  data: DataItem[];
  childrenKey: any;
  getKey: (node: DataItem) => KeygenResult;
  getDataById: (id: KeygenResult) => DataItem;
};

export const mergeFilteredTree = (
  filterDatum: FilterDatum<any>,
  rawDatum: FilterDatum<any>,
  tiledId: KeygenResult[],
) => {
  const filterData = filterDatum.data;
  const { childrenKey } = filterDatum;
  if (tiledId.length === 0) return filterData;
  const recursion = (node: { [x: string]: any }) => {
    const nodeKey = filterDatum.getKey(node);
    if (tiledId.indexOf(nodeKey) >= 0) {
      node[childrenKey] = deepClone(rawDatum.getDataById(nodeKey)[childrenKey] || []);
    } else {
      const item = filterDatum.getDataById(nodeKey);
      if (item && item[childrenKey]) {
        node[childrenKey] = deepClone(item[childrenKey] || []);
      }
    }
    const children = node[childrenKey] || [];
    children.map(recursion);
  };
  return produce(filterData, (draft) => {
    draft.map(recursion);
  });
};
