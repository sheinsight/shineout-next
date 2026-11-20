import { Image } from 'antd-v5';
import { IMG } from '../_shared/images';

const TARGETS = ['_modal', '_blank', '_self', '_download'] as const;

// antd 只有弹层预览（默认开启），没有 _blank / _self / _download：
// 只有 _modal 对应 preview，其余三个只渲染图片本身（preview={false}），这里不是等价对比
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {TARGETS.map((target) => (
        <div key={target}>
          <Image width={128} height={128} src={IMG} preview={target === '_modal'} style={{ objectFit: 'cover' }} />
          <div style={{ fontSize: 12, textAlign: 'center' }}>{target}</div>
        </div>
      ))}
    </div>
  );
}
