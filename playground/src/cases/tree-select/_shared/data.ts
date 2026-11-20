export interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

/** 原示例里反复出现的 3 棵小树 */
export const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export interface AntdNode {
  value: string;
  title: string;
  children?: AntdNode[];
}

/** antd 的 treeData：{ value, title, children }，文字和 Shineout 的 renderItem 保持一致（node xxx） */
export const toAntd = (list: DataItem[], prefix = 'node '): AntdNode[] =>
  list.map((d) => ({
    value: d.id,
    title: prefix + d.title,
    children: d.children ? toAntd(d.children, prefix) : undefined,
  }));

/** n 层、每层 w 个子节点的确定性树，id 形如 0-1-2（用来替代 tree 示例里的 createNestedArray） */
export function makeTree(widths: number[], prefix = ''): DataItem[] {
  if (!widths.length) return [];
  const [w, ...rest] = widths;
  return Array.from({ length: w }, (_, i) => {
    const id = prefix ? `${prefix}-${i}` : `${i}`;
    return { id, title: id, children: rest.length ? makeTree(rest, id) : undefined };
  });
}
