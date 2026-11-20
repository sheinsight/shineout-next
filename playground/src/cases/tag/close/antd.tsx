import { useState } from 'react';
import { Tag } from 'antd';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [tags, setTags] = useState(Array.from({ length: 50 }, (_, i) => `Tag ${i + 1}`));
  useBenchState({ count: tags.length });
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
      {tags.map((a) => (
        <Tag
          key={a}
          closable
          onClose={(e) => {
            e.preventDefault();
            setTags((list) => list.filter((t) => t !== a));
          }}
        >
          {a}
        </Tag>
      ))}
    </div>
  );
}
