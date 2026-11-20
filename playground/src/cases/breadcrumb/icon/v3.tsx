import { Breadcrumb } from 'shineout-v3';
import { home, tag } from '../_shared/icons';

const style = { display: 'flex', alignItems: 'center' };

const data = [
  { icon: home, url: '#home' },
  { icon: tag, title: 'Custom', url: 'https://www.google.com' },
  { icon: tag, title: 'Demo' },
];
const data2 = [
  { title: <a style={style} href='#home'>Home&nbsp;{home}{' '}</a> },
  { title: <a style={style} href='https://www.google.com'>Custom&nbsp;{tag}</a> },
  { title: <span style={style}>Custom&nbsp;{tag}</span> },
];

export default function Demo() {
  return (
    <div>
      <Breadcrumb data={data} style={{ marginBottom: 24 }} />
      <Breadcrumb data={data2} />
    </div>
  );
}
