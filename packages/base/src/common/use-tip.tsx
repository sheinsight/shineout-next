import Popover from '../popover';
import React from 'react';
import ErrorTrans from '../form/error-trans';
import { useConfig } from '../config';

import type { PopoverProps } from '../popover/popover.type';

// 透传Props
export interface BaseTipProps {
  /**
   * @en The position where the validation info pop up
   * @cn 校验信息弹出位置
   * @override PopoverProps["position"]
   */
  popover?: boolean | PopoverProps['position'];
  /**
   * @en Prompt information
   * @cn 提示信息
   * @private 内部属性
   */
  tip?: React.ReactNode;
  /**
   * @en Vilidate popup properties
   * @cn 校验或者tip弹框接受的属性
   * @type PopoverProps
   */
  popoverProps?: PopoverProps;
  /**
   * @cn 错误信息
   * @en error message
   * @private 内部属性
   */
  error?: string | { message?: string };
  jssStyle?: PopoverProps['jssStyle'];
}
const useTip = (
  props: BaseTipProps & { focused: boolean; rootRef: React.RefObject<HTMLElement> },
) => {
  const { popover, popoverProps, error, tip, focused, rootRef, jssStyle } = props;
  const config = useConfig();
  let dfp: PopoverProps['position'] = config.direction === 'rtl' ? 'bottom-right' : 'bottom-left';

  if(typeof popover === 'string') {
    dfp = popover
  }

  const styles =
    popoverProps?.style && popoverProps?.style?.width
      ? popoverProps?.style
      : Object.assign({ minWidth: 200, maxWidth: 400 }, popoverProps?.style || {});
  let errorMessage = typeof error === 'string' ? error : (error as any)?.message;
  const errorObj = typeof error === 'string' ? new Error(error) : (error as Error);
  if ((tip && focused) || (popover && errorMessage)) {
    return (
      <Popover
        jssStyle={jssStyle}
        getPopupContainer={popoverProps?.getPopupContainer || (() => rootRef.current)}
        useTextStyle
        {...popoverProps}
        style={styles}
        visible
        position={popoverProps?.position || dfp}
        type={errorMessage ? 'error' : undefined}
      >
        {errorMessage ? <ErrorTrans error={errorObj} /> : tip}
      </Popover>
    );
  }
  return null;
};

export default useTip;
