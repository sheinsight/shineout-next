import { Avatar } from 'shineout-v3';
import { UserIcon } from '../_shared/assets';

const row = { display: 'flex', gap: 24, alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexDirection: 'column' }}>
      <div style={row}>
        <Avatar icon={<UserIcon size={12} />} size='small' />
        <Avatar icon={<UserIcon size={16} />} />
        <Avatar icon={<UserIcon size={20} />} size='large' />
      </div>
      <div style={row}>
        <Avatar icon={<UserIcon size={12} />} size='small' shape='square' />
        <Avatar icon={<UserIcon size={16} />} shape='square' />
        <Avatar icon={<UserIcon size={20} />} size='large' shape='square' />
      </div>
    </div>
  );
}
