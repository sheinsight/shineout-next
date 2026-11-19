import { Transfer } from 'shineout-v3';
import { makeItems, Item } from '../_shared/data';

const data = makeItems(10);

export default function Demo() {
  return (
    <div style={{ width: 600 }}>
      <Transfer
        data={data}
        keygen='id'
        listHeight={188}
        renderItem='name'
        onFilter={(text: string, item: Item) => item.name.indexOf(text) > -1}
        searchPlaceholder='Input search text'
        highlight
      />
    </div>
  );
}
