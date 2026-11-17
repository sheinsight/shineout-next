import { Radio } from 'shineout-v2';
import { weekdays } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Radio.Group button='outline' keygen={(c: string) => c} data={weekdays} defaultValue='Wednesday' />
      <br />
      <Radio.Group
        button='outline'
        keygen={(c: string) => c}
        data={weekdays}
        defaultValue='Wednesday'
        disabled
        style={{ marginTop: 24 }}
      />
    </>
  );
}
