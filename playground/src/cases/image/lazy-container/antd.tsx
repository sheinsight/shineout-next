import { Image } from 'antd';
import { IMGS } from '../_shared/images';

// antd 没有 container，原生 loading='lazy' 会自己识别滚动容器
export default function Demo() {
  return (
    <div id='image-container' style={{ width: '100%', height: 300, overflow: 'auto' }}>
      {IMGS.slice(0, 4).map((src, i) => (
        <Image
          key={i}
          loading='lazy'
          preview={false}
          width='100%'
          height='100%'
          src={src}
          styles={{ root: { width: '100%', height: '100%' } }}
          style={{ objectFit: 'cover' }}
        />
      ))}
    </div>
  );
}
