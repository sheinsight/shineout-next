import { Image } from 'antd-v5';
import { IMG } from '../_shared/images';

// 按实测：fill 填满并裁剪 → cover；center 等比缩进容器 → contain；fit 原尺寸居中裁切 → none；stretch 拉伸 → fill
const FITS = { fill: 'cover', center: 'contain', fit: 'none', stretch: 'fill' } as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {Object.entries(FITS).map(([name, objectFit]) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column' }}>
          <Image width={128} height={128} src={IMG} preview={false} style={{ objectFit }} />
          <div style={{ textAlign: 'center', color: '#141737', fontSize: 12, marginTop: 5 }}>{name}</div>
        </div>
      ))}
    </div>
  );
}
