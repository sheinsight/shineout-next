import { Breadcrumb } from 'shineout-v2';

const data = [{ title: 'Home', url: '/' }, { title: 'Self' }];

export default function Demo() {
  return (
    <div>
      <Breadcrumb data={data} separator='/' style={{ marginBottom: 24 }} />
      <Breadcrumb data={data} separator={<span>{'>'}</span>} />
    </div>
  );
}
