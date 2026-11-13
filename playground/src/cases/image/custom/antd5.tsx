import { useState } from 'react';
import { Button, Image } from 'antd-v5';
import { ERROR_IMG, IMG } from '../_shared/images';

const box = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  color: '#666C7C',
};

// antd 的 error 只能给 fallback（一个图片地址），用内联 SVG 代替 Shineout 示例里自定义的 error 节点
export default function Demo() {
  const [key, setKey] = useState(0);
  return (
    <>
      <Button onClick={() => setKey(key + 1)} style={{ marginBottom: 12 }}>
        reload
      </Button>
      <div key={key} style={{ display: 'flex', gap: 8 }}>
        <Image
          width={128}
          height={128}
          placeholder={<div style={box}>疯狂加载中...</div>}
          src={IMG}
          style={{ objectFit: 'cover' }}
        />
        <Image width={128} height={128} src='error' fallback={ERROR_IMG} />
      </div>
    </>
  );
}
