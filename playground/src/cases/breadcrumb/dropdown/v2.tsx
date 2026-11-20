import { Breadcrumb, Message } from 'shineout-v2';
import { makeDropdownData } from '../_shared/data';

const notify = (text: string) => Message.info(text);
const data = makeDropdownData(notify);

export default function Demo() {
  return <Breadcrumb data={data} />;
}
