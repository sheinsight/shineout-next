import { BorderBeam } from 'shineout-v3';
import { panel } from '../_shared/panel';

const widths: { name: string; lineWidth?: number; description: string }[] = [
  { name: 'Default line', description: 'The beam uses the default 1px line width.' },
  { name: 'Wide line', lineWidth: 2, description: 'The beam uses a 2px line width.' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {widths.map(({ name, lineWidth, description }) => (
        <BorderBeam key={name} lineWidth={lineWidth}>
          <div style={{ ...panel, width: 280, border: `${lineWidth || 1}px solid var(--soui-neutral-border-1)` }}>
            <strong>{name}</strong>
            <span style={{ float: 'right', color: 'var(--soui-neutral-text-4)' }}>{lineWidth || 1}px</span>
            <p style={{ margin: '12px 0 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
          </div>
        </BorderBeam>
      ))}
    </div>
  );
}
