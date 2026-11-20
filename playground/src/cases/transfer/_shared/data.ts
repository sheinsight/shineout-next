export interface Item {
  id: string;
  name: string;
}

/** 确定性数据：id-0 … id-(n-1)，name-1 … name-n */
export function makeItems(n: number): Item[] {
  return Array.from({ length: n }, (_, i) => ({ id: `id-${i}`, name: `name-${i + 1}` }));
}
