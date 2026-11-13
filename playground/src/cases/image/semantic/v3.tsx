import { Image } from 'shineout-v3';
import { IMG } from '../_shared/images';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src={IMG}
        href={IMG}
        styles={{ root: { borderRadius: 12, overflow: 'hidden' } }}
        classNames={{
          root: 'shineout-image-root',
          img: 'shineout-image-img',
          placeholder: 'shineout-image-placeholder',
          error: 'shineout-image-error',
        }}
        placeholder={<div style={{ textAlign: 'center', lineHeight: '150px' }}>Loading...</div>}
      />
      <Image
        width={128}
        height={128}
        src='invalid-url'
        styles={{
          root: { borderRadius: 12 },
          error: { background: '#fff2f0', color: '#ff4d4f' },
        }}
      />
    </div>
  );
}
