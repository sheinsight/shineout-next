import { PopoverConfirm } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  usePopoverStyle,
  useSpinStyle,
} from '@sheinx/shineout-style';

import type { PopoverConfirmProps } from './confirm.type';

const jssStyle = {
  popover: usePopoverStyle,
  button: useButtonStyle,
  alert: useAlertStyle,
  spin: useSpinStyle,
};
export default (props: PopoverConfirmProps) => {
  return (
    <PopoverConfirm {...props} jssStyle={jssStyle}>
      {props.children}
    </PopoverConfirm>
  );
};
