export const flattenArray = <T>(arr1: any[]): T[] =>
  arr1.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val)),
    [],
  );
