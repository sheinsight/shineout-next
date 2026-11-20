import { Image } from 'antd';
import { IMGS } from '../_shared/images';

// antd 的 Image 没有 lazy，用原生的 loading='lazy' 代替（浏览器自己的懒加载，不是 JS 实现）
export default function Demo() {
  return (
    <div style={{ width: '100%' }}>
      {IMGS.slice(0, 4).map((src, i) => (
        <Image
          key={i}
          loading='lazy'
          preview={false}
          width='100%'
          height={528}
          src={src}
          styles={{ root: { width: '100%' } }}
          style={{ objectFit: 'cover' }}
        />
      ))}
    </div>
  );
}
