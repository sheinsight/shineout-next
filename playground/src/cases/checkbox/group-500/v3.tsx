import { Checkbox } from 'shineout-v3';
import { BenchToolbar } from '../../../core/BenchToolbar';
import { OPTIONS, useGroupState } from './shared';

export default function Demo() {
  const { value, setValue, tick, actions } = useGroupState();
  return (
    <div>
      <BenchToolbar actions={actions}>
        已选 {value.length} 项 · tick {tick}
      </BenchToolbar>
      <div data-bench='group'>
        <Checkbox.Group data={OPTIONS} keygen value={value} onChange={setValue} />
      </div>
    </div>
  );
}
