import { BorderBeam } from 'antd';
import { panel, subText } from '../_shared/panel';

export default function Demo() {
  return (
    <BorderBeam>
      <div style={{ ...panel, width: 360 }}>
        <strong>Example panel</strong>
        <p style={subText}>Supporting content for the default BorderBeam example.</p>
      </div>
    </BorderBeam>
  );
}
