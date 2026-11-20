import { Breadcrumb, Message } from 'shineout-v3';
import { makeMaxData } from '../_shared/data';

const data = makeMaxData((text) => Message.info(text));

export default function Demo() {
  return <Breadcrumb max={3} data={data} />;
}
