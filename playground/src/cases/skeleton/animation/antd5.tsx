import { useState } from 'react';
import { Skeleton, Space } from 'antd-v5';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [animation, setAnimation] = useState(true);
  useBenchState({ animation });
  return (
    <>
      <button data-bench='toggle' style={{ marginBottom: 24 }} onClick={() => setAnimation((v) => !v)}>
        animation: {String(animation)}
      </button>
      <Skeleton loading active={animation} avatar={{ size: 48 }} title={false} paragraph={{ rows: 5, width: '70%' }}>
        <div>I am the content after loading. I am the content after loading. I am the content after loading. </div>
      </Skeleton>
      <Space style={{ marginTop: 8 }}>
        <Skeleton.Button active={animation} />
        <Skeleton.Button active={animation} />
      </Space>
    </>
  );
}
