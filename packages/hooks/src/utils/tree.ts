import { KeygenResult } from '../common/type';

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
  filterFunc: (data: DataItem) => boolean,
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
    if (filterFunc(node)) {
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
