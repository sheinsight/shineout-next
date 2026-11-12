import { BorderBeam } from 'shineout-v3';
import { COLORS, panel } from '../_shared/panel';
import { presets } from './shared';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {presets.map(({ name, usage, description, color }) => (
        <BorderBeam key={name} color={color}>
          <div style={{ ...panel, width: 248, minHeight: 148, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong>{name}</strong>
              <span style={{ color: COLORS.subText, fontSize: 12 }}>{usage}</span>
            </div>
            <p style={{ margin: '12px 0', color: COLORS.subText }}>{description}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {color.map((item) => (
                <span
                  key={`${item.color}-${item.percent}`}
                  title={item.color}
                  style={{ width: 18, height: 18, borderRadius: 3, background: item.color, border: `1px solid ${COLORS.border}` }}
                />
              ))}
            </div>
          </div>
        </BorderBeam>
      ))}
    </div>
  );
}
