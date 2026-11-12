import { Avatar } from 'shineout-v3';
import { AVATAR_IMAGES } from '../_shared/assets';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Avatar
        src={AVATAR_IMAGES[0]}
        styles={{ root: { border: '2px solid #1890ff', boxShadow: '0 2px 8px rgba(24,144,255,0.3)' } }}
      />
      <Avatar.Group styles={{ group: { gap: 8 }, root: { border: '2px solid #52c41a' } }}>
        <Avatar src={AVATAR_IMAGES[0]} />
        <Avatar src={AVATAR_IMAGES[1]} />
        <Avatar src={AVATAR_IMAGES[2]} styles={{ root: { border: '2px solid #ff4d4f' } }} />
      </Avatar.Group>
    </div>
  );
}
