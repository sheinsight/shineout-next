/**
 * cn - 尺寸
 *    -- 内置三种尺寸，small、default、large
 * en - Size
 *    -- There are three built-in sizes, small, default, and large.
 */
import { useState } from 'react';
import { Transfer, Radio } from 'shineout';

const data: { id: string; name: string }[] = [];
const radios = ['small', 'default', 'large'];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  const [radio, setRadio] = useState<'small' | 'default' | 'large'>('small');

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        keygen
        value={radio}
        onChange={setRadio}
        data={radios}
      ></Radio.Group>
      <Transfer data={data} size={radio} keygen='id' listHeight={232} renderItem='name'></Transfer>
    </div>
  );
};
