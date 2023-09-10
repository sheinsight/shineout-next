import Popover from '../popover';
import React from 'react';
import { PopoverProps } from '../popover/popover.type';

// 透传Props
export interface BaseTipProps {
  popover?: PopoverProps['position'];
  popoverProps?: PopoverProps;
  tip?: React.ReactNode;
  error?: string | { message?: string };
  jssStyle?: PopoverProps['jssStyle'];
}
const useTip = (
  props: BaseTipProps & { focused: boolean; rootRef: React.RefObject<HTMLElement> },
) => {
  const { popover, popoverProps, error, tip, focused, rootRef, jssStyle } = props;
  if (!tip) return null;
  const styles =
    popoverProps?.style && popoverProps?.style?.width
      ? popoverProps?.style
      : Object.assign({ minWidth: 200, maxWidth: 400 }, popoverProps?.style || {});
  let errorMessage = typeof error === 'string' ? error : (error as any)?.message;
  if ((tip && focused) || (popover && errorMessage)) {
    return (
      <Popover
        jssStyle={jssStyle}
        getPopupContainer={() => rootRef.current}
        {...popoverProps}
        style={styles}
        visible
        position={popoverProps?.position || 'bottom-left'}
        type={errorMessage ? 'error' : undefined}
      >
        {errorMessage || tip}
      </Popover>
    );
  }
  return null;
};

export default useTip;
