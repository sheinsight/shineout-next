import { Breadcrumb, Message } from 'shineout-v3';
import { makeBaseData } from '../_shared/data';

const notify = (text: string) => Message.info(text);
const data = makeBaseData(notify);

export default function Demo() {
  return <Breadcrumb data={data} />;
}
