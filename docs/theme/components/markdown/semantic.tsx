import React from 'react';
import { useSnapshot } from 'valtio';
import store from '../../store';
import { SemanticSchema } from 'docs/types';

interface SemanticTabProps {
  schema: SemanticSchema;
  name: string;
}

/**
 * Semantic DOM tab —— 占位版本。
 * C3 步骤会替换为左右双栏 + hover 高亮的完整实现。
 */
const Semantic: React.FC<SemanticTabProps> = ({ schema, name }) => {
  const state = useSnapshot(store);
  const Demo = schema.demo;

  return (
    <div style={{ padding: 24 }}>
      <h2>{name} Semantic DOM</h2>
      <p style={{ color: '#999' }}>
        {state.locales === 'cn'
          ? '占位：交互式 hover 高亮实现中…'
          : 'Placeholder: interactive hover-highlight pending…'}
      </p>

      <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
        <div style={{ flex: 1, padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
          <Demo />
        </div>
        <ul style={{ flex: 1, listStyle: 'none', padding: 0 }}>
          {schema.keys.map((k) => (
            <li key={k.key} style={{ padding: '8px 12px', borderBottom: '1px solid #eee' }}>
              <code style={{ color: '#1677ff', fontWeight: 600 }}>{k.key}</code>
              <span style={{ marginLeft: 12, color: '#666' }}>
                {state.locales === 'cn' ? k.cn : k.en}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Semantic;
