import type { ReactNode } from 'react';
import { Avatar, Popover, icons } from 'shineout-v3';
import { AVATAR_IMAGES } from '../_shared/assets';

const renderAvatars = () => AVATAR_IMAGES.map((src, i) => <Avatar key={i} src={src} />);

const renderMax = (dom: ReactNode[]) => (
  <div>
    <Avatar>
      <div style={{ width: 16, height: 16, display: 'flex' }}>{icons.More}</div>
    </Avatar>
    <Popover style={{ padding: 16, display: 'flex', gap: 8 }}>{dom}</Popover>
  </div>
);

export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group>{renderAvatars()}</Avatar.Group>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Avatar.Group max={3}>{renderAvatars()}</Avatar.Group>
      </div>
      <div>
        <Avatar.Group max={3} renderMax={renderMax}>
          {renderAvatars()}
        </Avatar.Group>
      </div>
    </div>
  );
}
