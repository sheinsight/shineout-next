export interface DataItem {
  id: string;
  children?: DataItem[];
}

/** 同 tree 示例里的 createNestedArray：[5,3,2] = 5 个根节点，每个 3 个子节点，每个子节点再 2 个；id 形如 0、0-1、0-1-0 */
export function makeNested(widths: number[], prefix = ''): DataItem[] {
  if (!widths.length) return [];
  const [w, ...rest] = widths;
  return Array.from({ length: w }, (_, i) => {
    const id = prefix ? `${prefix}-${i}` : `${i}`;
    return rest.length ? { id, children: makeNested(rest, id) } : { id };
  });
}

/** 01-base / 11-action-on-click 里的 2 棵小树（0 和 1，各 3 层） */
export const smallTree: DataItem[] = ['0', '1'].map((r) => ({
  id: r,
  children: [
    { id: `${r}-0`, children: [{ id: `${r}-0-0` }, { id: `${r}-0-1`, children: [{ id: `${r}-0-1-0` }] }] },
    { id: `${r}-1`, children: [{ id: `${r}-1-0` }] },
  ],
}));

/** 所有节点的 id（先序） */
export const allIds = (list: DataItem[]): string[] => list.flatMap((d) => [d.id, ...(d.children ? allIds(d.children) : [])]);

export interface AntdNode {
  key: string;
  title: string;
  disabled?: boolean;
  children?: AntdNode[];
}

/** antd 的 treeData：{ key, title, children }，title 和 Shineout 的 renderItem 一致（node xxx） */
export const toAntd = (list: DataItem[], disabledId?: string): AntdNode[] =>
  list.map((d) => ({
    key: d.id,
    title: `node ${d.id}`,
    disabled: d.id === disabledId ? true : undefined,
    children: d.children ? toAntd(d.children, disabledId) : undefined,
  }));
