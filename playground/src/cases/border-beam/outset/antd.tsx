import { BorderBeam } from 'antd';
import { COLORS, panel } from '../_shared/panel';

export default function Demo() {
  return (
    <BorderBeam outset={0}>
      <div style={{ ...panel, overflow: 'hidden', width: 360 }}>
        <strong>Clipped panel</strong>
        <p style={{ margin: '8px 0 0', color: COLORS.subText }}>
          The beam remains inside this overflow-hidden container.
        </p>
      </div>
    </BorderBeam>
  );
}
