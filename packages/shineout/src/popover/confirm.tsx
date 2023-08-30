import { useMemo } from 'react';

import { PopoverConfirm } from '@sheinx/base';
import {
  useAlertStyle,
  useButtonStyle,
  usePopoverStyle,
  useSpinStyle,
} from '@sheinx/shineout-style';

import type { PopoverConfirmProps } from './confirm.type';

export default (props: PopoverConfirmProps) => {
  const popoverStyle = usePopoverStyle();
  const buttonStyle = useButtonStyle();
  const alertStyle = useAlertStyle();
  const spinStyle = useSpinStyle();

  const jssStyle = useMemo(
    () => ({
      popover: popoverStyle,
      button: buttonStyle,
      alert: alertStyle,
      spin: spinStyle,
    }),
    [popoverStyle, buttonStyle, alertStyle, spinStyle],
  );
  return (
    <PopoverConfirm {...props} jssStyle={jssStyle}>
      {props.children}
    </PopoverConfirm>
  );
};
