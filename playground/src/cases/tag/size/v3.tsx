import { Tag } from 'shineout-v3';

export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Tag size='small'>Small</Tag>
        <Tag>Default</Tag>
        <Tag size='large'>Large</Tag>
      </div>
      <div>
        <Tag size='small' onClose>
          Small
        </Tag>
        <Tag onClose>Default</Tag>
        <Tag size='large' onClose>
          Large
        </Tag>
      </div>
    </div>
  );
}
