import { Popover } from '@sheinx/base';
import { util } from '@sheinx/hooks';
import { usePopoverStyle } from '@sheinx/shineout-style';
import { PopoverProps } from './popover.type';

const { devUseWarning } = util;

const jssStyle = {
  popover: usePopoverStyle,
};

const IPopover = (props: PopoverProps) => {
  return <Popover jssStyle={jssStyle} {...props} />;
};

export const IPopoverContent = (props: PopoverProps) => {
  if (process.env.NODE_ENV !== 'production') {
    devUseWarning.deprecated('Popover.Content', 'useTextStyle', 'Popover');
  }

  return <Popover jssStyle={jssStyle} {...props} useTextStyle />;
};

export default IPopover
