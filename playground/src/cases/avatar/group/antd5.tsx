import { Avatar } from 'antd-v5';
import { AVATAR_IMAGES } from '../_shared/assets';

const renderAvatars = () => AVATAR_IMAGES.map((src, i) => <Avatar key={i} src={src} />);

// antd 的 max 只能配置个数和 Popover，没有 renderMax，第三组用同样的 max，超出部分显示为「+N」
export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group>{renderAvatars()}</Avatar.Group>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group max={{ count: 3 }}>{renderAvatars()}</Avatar.Group>
      </div>
      <div>
        <Avatar.Group max={{ count: 3, popover: { trigger: 'hover' } }}>{renderAvatars()}</Avatar.Group>
      </div>
    </div>
  );
}
