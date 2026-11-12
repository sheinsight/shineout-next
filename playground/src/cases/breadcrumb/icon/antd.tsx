import { Breadcrumb } from 'antd';
import { home, tag } from '../_shared/icons';

const style = { display: 'flex', alignItems: 'center' };

const items: any[] = [
  { title: home, href: '#home' },
  { title: <>{tag}&nbsp;Custom</>, href: 'https://www.google.com' },
  { title: <>{tag}&nbsp;Demo</> },
];
const items2: any[] = [
  { title: <a style={style} href='#home'>Home&nbsp;{home}{' '}</a> },
  { title: <a style={style} href='https://www.google.com'>Custom&nbsp;{tag}</a> },
  { title: <span style={style}>Custom&nbsp;{tag}</span> },
];

export default function Demo() {
  return (
    <div>
      <Breadcrumb items={items} style={{ marginBottom: 24 }} />
      <Breadcrumb items={items2} />
    </div>
  );
}
