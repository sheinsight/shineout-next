import { useState } from 'react';
import { Button, Image } from 'shineout-v3';
import { IMG } from '../_shared/images';

export default function Demo() {
  const [key, setKey] = useState(0);
  return (
    <>
      <Button onClick={() => setKey(key + 1)} style={{ marginBottom: 12 }}>
        reload
      </Button>
      <div key={key} style={{ display: 'flex', gap: 8 }}>
        <Image fit='fill' width={128} height={128} target='_modal' src={IMG} href={IMG} />
        <Image fit='fill' width={128} height={128} src='error' />
      </div>
    </>
  );
}
