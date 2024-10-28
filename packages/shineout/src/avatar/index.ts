import Avatar from './avatar';
import Group from './group';

type RefAvatar = typeof Avatar;
export interface AvatarComponent extends RefAvatar {
  Group: typeof Group;
  displayName: string;
}

(Avatar as AvatarComponent).displayName = 'ShineoutAvatar';
(Avatar as AvatarComponent).Group = Group;

export default Avatar as AvatarComponent;
