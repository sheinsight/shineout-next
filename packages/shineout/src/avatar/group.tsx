import { AvatarGroupProps } from './group.type';
import { AvatarGroup as UnStyledAvatarGroup } from '@sheinx/base';
import { useAvatarStyle, usePopoverStyle } from '@sheinx/shineout-style';

const jssStyle = {
  avatar: useAvatarStyle,
  popover: usePopoverStyle,
};
const ButtonGroup = (props: AvatarGroupProps) => {
  return <UnStyledAvatarGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
