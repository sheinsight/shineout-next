export const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet', 'pink'];
export const colors7 = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

/** antd 的 options：{ value, label } */
export const toOptions = (list: string[]) => list.map((c) => ({ value: c, label: c }));

export interface City {
  value: string;
  group: string;
}

/** 06-group：分组前的数据，顺序即分组出现的顺序 */
export const cities: City[] = [
  { value: 'Mars', group: '3' },
  { value: 'China', group: '2' },
  { value: 'Beijing', group: '1' },
  { value: 'Shanghai', group: '1' },
];

export const groupName = (g: string) => (g === '1' ? 'City' : g === '2' ? 'Country' : 'Other');

/** 04-bigdata：10 万项，原示例里每项的高度是随机的（动态行高），这里不用 */
export interface BigItem {
  id: string;
  name: string;
}
export const bigData: BigItem[] = Array.from({ length: 100000 }, (_, i) => ({ id: `id-${i}`, name: `标签 ${i}` }));
export const bigOptions = bigData.map((d) => ({ value: d.id, label: d.name }));
