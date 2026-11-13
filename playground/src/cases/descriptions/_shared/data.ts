export interface Item { label: string; value: string }

export const base: Item[] = [
  { label: 'Name', value: 'Mai Mai' },
  { label: 'Residence', value: 'Beijing' },
  { label: 'Address', value: 'Yingdu Building' },
  { label: 'Mobile', value: '187-2323-9834' },
  { label: 'Hometown', value: 'Beijing' },
];

export const longAddress: Item[] = base.map((d) => (d.label === 'Address' ? { ...d, value: 'Yingdu Building,Zhichun Road,Beijing' } : d));

export const three: Item[] = [
  { label: 'Name', value: 'Mai Mai' },
  { label: 'Mobile', value: '187-2323-9834' },
  { label: 'Residence', value: 'Beijing' },
];

export const semantic: Item[] = [
  { label: 'Name', value: 'Tom' },
  { label: 'Age', value: '28' },
  { label: 'Address', value: 'New York No. 1 Lake Park' },
  { label: 'Phone', value: '123-456-7890' },
  { label: 'Company', value: 'Shein' },
  { label: 'Position', value: 'Engineer' },
];

/** antd 的数据项用 children 放值 */
export const toAntd = (list: Item[]) => list.map((d) => ({ key: d.label, label: d.label, children: d.value }));
