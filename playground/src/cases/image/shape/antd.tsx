import { Image } from 'antd';
import { IMG } from '../_shared/images';

// antd 没有 shape，用 style 模拟：rounded=圆角，circle=50% 圆角，thumbnail=带内边距和边框
const SHAPES = {
  rounded: { borderRadius: 4 },
  circle: { borderRadius: '50%' },
  thumbnail: { padding: 4, border: '1px solid #e8ebf0', borderRadius: 4, background: '#fff' },
};

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {Object.entries(SHAPES).map(([name, style]) => (
        <Image key={name} width={128} height={128} src={IMG} preview={false} style={{ objectFit: 'cover', ...style }} />
      ))}
    </div>
  );
}
