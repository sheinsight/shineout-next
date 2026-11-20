import { Radio } from 'shineout-v3';
import { weekdays } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Radio.Group button keygen={(c: string) => c} data={weekdays} defaultValue='Wednesday' />
      <br />
      <Radio.Group
        button
        keygen={(c: string) => c}
        data={weekdays}
        defaultValue='Wednesday'
        disabled
        style={{ marginTop: 24 }}
      />
    </>
  );
}
