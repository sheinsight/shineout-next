import { BorderBeam } from 'antd';
import { COLORS, panel } from '../_shared/panel';

const durations = [
  { name: 'Fast loop', seconds: 3, description: 'The beam completes one loop every 3 seconds.' },
  { name: 'Default loop', seconds: 6, description: 'The beam completes one loop every 6 seconds.' },
  { name: 'Slow loop', seconds: 12, description: 'The beam completes one loop every 12 seconds.' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {durations.map(({ name, seconds, description }) => (
        <BorderBeam key={name} duration={seconds}>
          <div style={{ ...panel, width: 220, minHeight: 132, padding: 20 }}>
            <strong>{name}</strong>
            <span style={{ float: 'right', color: COLORS.subText }}>{seconds}s</span>
            <p style={{ margin: '12px 0 0', color: COLORS.subText }}>{description}</p>
          </div>
        </BorderBeam>
      ))}
    </div>
  );
}
