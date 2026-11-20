import { Breadcrumb, Message } from 'shineout-v2';
import { makeBaseData } from '../_shared/data';

const notify = (text: string) => Message.info(text);
const data = makeBaseData(notify);

export default function Demo() {
  return (
    <div>
      <Breadcrumb data={data} style={{ fontSize: 12 }} />
      <Breadcrumb data={data} style={{ fontSize: 14, marginTop: 24 }} />
      <Breadcrumb data={data} style={{ fontSize: 16, marginTop: 24 }} />
    </div>
  );
}
