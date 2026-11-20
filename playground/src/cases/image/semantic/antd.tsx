import { Image } from 'antd';
import { IMG } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Image
        width={128}
        height={128}
        src={IMG}
        styles={{ root: { borderRadius: 12, overflow: 'hidden' }, image: { objectFit: 'cover' } }}
        classNames={{
          root: 'antd-image-root',
          image: 'antd-image-img',
        }}
        placeholder={<div style={{ textAlign: 'center', lineHeight: '150px' }}>Loading...</div>}
      />
      <Image
        width={128}
        height={128}
        src='invalid-url'
        styles={{ root: { borderRadius: 12 } }}
      />
    </div>
  );
}
