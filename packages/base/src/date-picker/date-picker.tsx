import { usePopup } from '@sheinx/hooks';
import classNames from 'classnames';
import { AbsoluteList } from '../absolute-list';
import React from 'react';
import { DatePickerProps } from './date-picker.type';
import AnimationList from '../animation-list';
import Picker from './picker';

const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
const DatePicker = (props: DatePickerProps) => {
  const { disabled, jssStyle } = props;
  const disabledAll = disabled && typeof disabled !== 'function';
  const [focused, setFocused] = React.useState(false);
  let listPosition = props.position || 'bottom-left';
  if (!verticalPosition.includes(listPosition)) {
    listPosition = 'bottom-left';
  }
  const { open, position, targetRef, popupRef, openPop } = usePopup({
    open: props.open,
    onCollapse: props.onCollapse,
    disabled: disabledAll,
    trigger: 'click',
    position: listPosition as DatePickerProps['position'],
  });
  const renderResult = () => {
    return (
      <div
        className={classNames(jssStyle?.datePicker?.result, jssStyle?.datePicker?.paddingBox)}
        onClick={openPop}
        ref={targetRef}
        tabIndex={disabledAll ? -1 : 0}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      >
        result
      </div>
    );
  };

  return (
    <div
      className={classNames(
        jssStyle?.datePicker?.wrapper,
        focused && jssStyle?.datePicker?.wrapperFocus,
        disabledAll && jssStyle?.datePicker?.wrapperDisabled,
        props.status === 'error' && jssStyle?.datePicker?.wrapperError,
      )}
    >
      {renderResult()}
      <AbsoluteList
        parentElement={targetRef.current}
        popupEl={popupRef.current}
        absolute={props.absolute}
        zIndex={props.zIndex}
        position={position}
        focus={open}
        fixedWidth={false}
        popupGap={4}
        adjust
      >
        <AnimationList
          onRef={popupRef}
          className={classNames(jssStyle?.datePicker?.picker)}
          display={'block'}
          type={'fade'}
          duration={'fast'}
          show={open}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <Picker />
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default DatePicker;
