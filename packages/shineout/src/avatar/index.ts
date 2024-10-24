import Avatar from './avatar';


type RefAvatar = typeof Avatar;

export interface AvatarComponent extends RefAvatar {
    displayName: string;
}

const AvatarComp: AvatarComponent = Avatar as AvatarComponent;

AvatarComp.displayName = 'ShineoutAvatar';

export default AvatarComp;
