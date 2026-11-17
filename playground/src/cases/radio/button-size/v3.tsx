import { Radio } from 'shineout-v3';
import { colors } from '../_shared/data';

export default function Demo() {
  const data = colors.slice(0, 3);
  return (
    <div>
      <Radio.Group size='small' button keygen={(c: string) => c} data={data} defaultValue='red' />
      <br />
      <Radio.Group button keygen={(c: string) => c} data={data} defaultValue='red' style={{ marginTop: 24 }} />
      <br />
      <Radio.Group size='large' button keygen={(c: string) => c} data={data} defaultValue='red' style={{ marginTop: 24 }} />
      <br />
    </div>
  );
}
