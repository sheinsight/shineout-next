import { useState } from 'react';
import { Spin } from 'antd-v5';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  useBenchState({ loading });
  return (
    <>
      <button data-bench='toggle' style={{ marginBottom: 16 }} onClick={() => setLoading((v) => !v)}>
        loading: {String(loading)}
      </button>
      <Spin tip={<span style={{ fontSize: 14 }}>loading...</span>} spinning={loading}>
      <div
        style={{
          width: '100%',
          fontWeight: 300,
          border: '1px solid #E8EBF0',
          padding: 16,
          boxSizing: 'border-box',
        }}
      >
        <p style={{ width: '20%', height: 18, background: '#E8EBF0', borderRadius: 2, marginBottom: 16 }}></p>
        <p style={{ width: '100%', height: 18, borderRadius: 2, background: '#E8EBF0', marginBottom: 16 }}></p>
        <p style={{ width: '100%', height: 18, borderRadius: 2, background: '#E8EBF0' }}></p>
      </div>
      </Spin>
    </>
  );
}
