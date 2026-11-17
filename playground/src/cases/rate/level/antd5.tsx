import { Rate } from 'antd-v5';
import { defaultIcon, cryIcon0, cryIcon, normallyIcon, happyIcon0, happyIcon } from '../_shared/icons';

const front = [cryIcon0, cryIcon, normallyIcon, happyIcon0, happyIcon];

// Shineout 的规则：当前值是 n，所有选中的星都显示 front[n - 1]，没选中的显示背景图标
const character = ({ index = 0, value = 0 }: { index?: number; value?: number }) =>
  index < Math.ceil(value) ? front[Math.ceil(value) - 1] : defaultIcon;

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[5, 4, 3, 2, 1, 0].map((v) => (
        <Rate key={v} style={{ fontSize: 28 }} defaultValue={v} character={character} />
      ))}
    </div>
  );
}
