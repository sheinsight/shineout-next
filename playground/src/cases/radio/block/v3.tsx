import { Radio } from 'shineout-v3';
import { idColors } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Radio.Group keygen='id' data={idColors} format='id' defaultValue={3} renderItem='color' />
      <Radio.Group
        style={{ display: 'inline-block', marginTop: 24 }}
        block
        keygen='id'
        data={idColors}
        format='id'
        defaultValue={3}
        renderItem='color'
      />
    </>
  );
}
