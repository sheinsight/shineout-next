import { Transfer } from 'shineout-v2';
import { makeItems } from '../_shared/data';

const data = makeItems(5000);

export default function Demo() {
  return <Transfer data={data} keygen='id' listHeight={232} renderItem='name' />;
}
