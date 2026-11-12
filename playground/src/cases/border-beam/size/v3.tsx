import { BorderBeam } from 'shineout-v3';
import { panel } from '../_shared/panel';

const sizes: { name: string; size?: number; description: string }[] = [
  { name: 'Short beam', size: 56, description: 'The visible beam segment is 56px long.' },
  { name: 'Default beam', description: 'The visible beam segment uses the default 100px size.' },
  { name: 'Long beam', size: 160, description: 'The visible beam segment is 160px long.' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {sizes.map(({ name, size, description }) => (
        <BorderBeam key={name} size={size}>
          <div style={{ ...panel, width: 240, minHeight: 124, padding: 20 }}>
            <strong>{name}</strong>
            <span style={{ float: 'right', color: 'var(--soui-neutral-text-4)' }}>{size || 100}px</span>
            <p style={{ margin: '12px 0 0', color: 'var(--soui-neutral-text-4)' }}>{description}</p>
          </div>
        </BorderBeam>
      ))}
    </div>
  );
}
