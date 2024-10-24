// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type AvatarClasses =
  {
    wrapper: string;
  };
export type AvatarClassType = keyof AvatarClasses;

const avatarStyle: JsStyles<AvatarClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default avatarStyle;
