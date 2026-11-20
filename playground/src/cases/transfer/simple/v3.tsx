import { Transfer } from 'shineout-v3';
import { makeItems } from '../_shared/data';

const data = makeItems(10);

export default function Demo() {
  return (
    <Transfer
      simple
      data={data}
      defaultValue={['id-7', 'id-8', 'id-9']}
      keygen='id'
      format='id'
      listHeight={232}
      renderItem='name'
    />
  );
}
