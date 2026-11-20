import { Avatar, Badge } from 'shineout-v3';
import { AVATAR_IMAGES, UserIcon } from '../_shared/assets';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar icon={<UserIcon />} />
      <Avatar>J</Avatar>
      <Avatar src={AVATAR_IMAGES[0]} />
      <Badge count={<div style={{ fontSize: 16, transform: 'rotate(45deg)' }}>🌱</div>}>
        <Avatar style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)', color: '#fff' }}>🍊</Avatar>
      </Badge>
    </div>
  );
}
