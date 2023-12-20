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
