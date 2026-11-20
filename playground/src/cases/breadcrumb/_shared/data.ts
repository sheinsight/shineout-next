// breadcrumb 各用例共用的数据。结构沿用 Shineout 的写法（title / url / onClick，嵌套数组表示下拉），
// antd 用 toAntdItems 转成它的 items。这个文件不能 import 任何组件库，点击提示由各库传入
export interface Crumb {
  title?: any;
  url?: string;
  icon?: any;
  onClick?: () => void;
}
export type CrumbData = (Crumb | Crumb[])[];

export const makeBaseData = (notify: (text: string) => void): CrumbData => [
  { title: 'Home', url: '/' },
  { title: 'Button', url: '/#/cn/component/shineout/Button?tab=examples' },
  { title: 'Handler', onClick: () => notify('clicked') },
  { title: 'Self' },
];

export const makeDropdownData = (notify: (text: string) => void): CrumbData => [
  { title: 'Home', url: '/' },
  { title: 'Button', url: '/#/cn/component/shineout/Button?tab=examples' },
  [
    { title: 'Dropdown', onClick: () => notify('Dropdown') },
    { title: 'Menu', url: '#menu' },
    { title: 'Pagination' },
    { title: 'Table' },
  ],
  { title: 'Self' },
];

export const makeMaxData = (notify: (text: string) => void): CrumbData => [
  { title: 'Home', url: '/' },
  { title: 'Button', onClick: () => notify('Button') },
  { title: 'Dropdown', onClick: () => notify('Dropdown') },
  { title: 'Menu', url: '#menu' },
  { title: 'Pagination', onClick: () => notify('Pagination') },
  { title: '我是超宽的面包屑🍞🍞🍞', onClick: () => notify('我是超宽的面包屑🍞🍞🍞') },
  { title: 'Self' },
];

/** Shineout 的 data 转成 antd 的 items：嵌套数组 → 第一项作为触发文字，其余进 menu */
export const toAntdItems = (data: CrumbData): any[] =>
  data.map((d) => {
    const toItem = (c: Crumb) => ({ title: c.title, href: c.url, onClick: c.onClick });
    if (Array.isArray(d)) {
      const [first, ...rest] = d;
      return { ...toItem(first), menu: { items: rest.map((r, i) => ({ key: i, title: r.title, href: r.url })) } };
    }
    return toItem(d);
  });
