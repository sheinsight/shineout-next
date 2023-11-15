import { Popover } from '@sheinx/base';
import { usePopoverStyle } from '@sheinx/shineout-style';
import { PopoverProps } from './popover.type';

const jssStyle = {
  popover: usePopoverStyle,
};
export default (props: PopoverProps) => {
  return <Popover jssStyle={jssStyle} {...props} />;
};
