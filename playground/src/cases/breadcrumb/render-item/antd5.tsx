import { Breadcrumb } from 'antd-v5';

const data = [{ name: 'home', link: '#home' }, { name: 'menu', link: 'https://www.google.com' }, { name: 'self' }];

// antd 用 itemRender，参数是 items 里的条目，这里把原数据放进 items 的 title 字段再取出
const items = data.map((d) => ({ title: d.name, href: d.link }));

export default function Demo() {
  return (
    <Breadcrumb
      items={items}
      itemRender={(route) => (route.href ? <a href={route.href}>{route.title}</a> : route.title)}
    />
  );
}
