import { useState } from 'react';
import { Skeleton } from 'shineout-v3';
import { useBenchState } from '../../../core/define';

export default function Demo() {
  const [animation, setAnimation] = useState(true);
  useBenchState({ animation });
  return (
    <>
      <button data-bench='toggle' style={{ marginBottom: 24 }} onClick={() => setAnimation((v) => !v)}>
        animation: {String(animation)}
      </button>
      <Skeleton loading animation={animation} text={{ rows: 5, width: '70%' }} image button={{ count: 2 }}>
        <div>I am the content after loading. I am the content after loading. I am the content after loading. </div>
      </Skeleton>
    </>
  );
}
