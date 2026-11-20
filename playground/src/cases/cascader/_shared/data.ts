// cascader 各用例共用的数据，来自 shineout 示例。
// Shineout 用 data + keygen，antd 用 options + fieldNames，结构相同、只是字段名不同，
// 这里统一用 value / children 两个字段，antd 通过 fieldNames 映射
export interface CityItem {
  value: string;
  children?: CityItem[];
  disabled?: boolean;
}

export const cities: CityItem[] = [
  {
    value: 'jiangsu',
    children: [{ value: 'nanjing', children: [{ value: 'jiangning' }, { value: 'yuhuatai' }] }],
  },
  {
    value: 'anhui',
    children: [{ value: 'hefei', children: [{ value: 'feidong' }] }],
  },
];

// antd 用 value 同时作 label，children 作子节点
export const antdFieldNames = { label: 'value', value: 'value', children: 'children' } as const;

/** 给指定的 value 加 disabled，antd 的禁用写在选项上，Shineout 是传函数，两边禁用的是同一批节点 */
export const withDisabled = (list: CityItem[], isDisabled: (v: string) => boolean): CityItem[] =>
  list.map((item) => ({
    ...item,
    disabled: isDisabled(item.value),
    children: item.children && withDisabled(item.children, isDisabled),
  }));

export const ALL_VALUES = ['jiangning', 'yuhuatai', 'nanjing', 'jiangsu', 'feidong', 'hefei', 'anhui'];

/** 一棵大树，用于虚拟滚动：3 层，每层 50 个，共约 13 万个节点（与原示例一致） */
export function generateBigTreeData(level: number, count: number, prefix = ''): CityItem[] {
  const out: CityItem[] = [];
  for (let i = 0; i < count; i++) {
    const value = prefix ? `${prefix}-${i}` : `${i}`;
    out.push({ value, children: level > 0 ? generateBigTreeData(level - 1, count, value) : [] });
  }
  return out;
}
