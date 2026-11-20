import { useState } from 'react';
import { Button, Image } from 'shineout-v2';
import { IMG } from '../_shared/images';

const box = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  color: '#666C7C',
};

export default function Demo() {
  const [key, setKey] = useState(0);
  return (
    <>
      <Button onClick={() => setKey(key + 1)} style={{ marginBottom: 12 }}>
        reload
      </Button>
      <div key={key} style={{ display: 'flex', gap: 8 }}>
        <Image
          fit='fill'
          width={128}
          height={128}
          target='_modal'
          placeholder={<div style={box}>疯狂加载中...</div>}
          src={IMG}
        />
        <Image
          fit='fill'
          width={128}
          height={128}
          src='error'
          error={<div style={{ ...box, flexDirection: 'column' }}>Error</div>}
        />
      </div>
    </>
  );
}
