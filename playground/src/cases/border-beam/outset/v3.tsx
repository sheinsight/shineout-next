import { BorderBeam } from 'shineout-v3';
import { panel } from '../_shared/panel';

export default function Demo() {
  return (
    <BorderBeam outset={0}>
      <div style={{ ...panel, overflow: 'hidden', width: 360 }}>
        <strong>Clipped panel</strong>
        <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
          The beam remains inside this overflow-hidden container.
        </p>
      </div>
    </BorderBeam>
  );
}
