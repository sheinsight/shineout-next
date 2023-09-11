import { useDatePickerFormat, useInputAble, usePersistFn, usePopup, util } from '@sheinx/hooks';
import classNames from 'classnames';
import { AbsoluteList } from '../absolute-list';
import React from 'react';
import { DatePickerProps, DatePickerValue } from './date-picker.type';
import AnimationList from '../animation-list';
import Picker from './picker';
import { getLocale, useConfig } from '../config';
import Icons from '../icons';

const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
const DatePicker = <Value extends DatePickerValue>(props: DatePickerProps<Value>) => {
  const { locale } = useConfig();
  const { disabled, jssStyle, range, type = 'date' } = props;
  const disabledAll = disabled && typeof disabled !== 'function';
  const [focused, setFocused] = React.useState(false);
  let listPosition = props.position || 'bottom-left';
  if (!verticalPosition.includes(listPosition)) {
    listPosition = 'bottom-left';
  }
  const options = {
    timeZone: props.timeZone,
    weekStartsOn: getLocale(locale, 'startOfWeek'),
  };

  const inputAbleResult = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange as any,
    beforeChange: props.beforeChange as any,
    control: 'value' in props,
  });

  const {
    resultArr,
    dateArr,
    setDateArr,
    startEdit,
    finishEdit,
    currentArr,
    setCurrentArr,
    mode,
    setMode,
    handleClear,
    isEmpty,
  } = useDatePickerFormat({
    value: inputAbleResult.value,
    range: props.range,
    onChange: inputAbleResult.onChange,
    type: type,
    format: props.format,
    options,
    clearWithUndefined: props.clearWithUndefined,
    onClear: undefined,
  });

  const onCollapse = usePersistFn((isOpen: boolean) => {
    if (isOpen) {
      startEdit();
    } else {
      finishEdit();
    }
    props.onCollapse?.(isOpen);
  });

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: props.open,
    onCollapse: onCollapse,
    disabled: disabledAll,
    trigger: 'click',
    position: listPosition as DatePickerProps<Value>['position'],
  });

  const renderResult = () => {
    return (
      <div
        className={classNames(
          jssStyle?.datePicker?.result,
          jssStyle?.datePicker?.paddingBox,
          props.align === 'right' && jssStyle?.datePicker?.resultAlignRight,
          props.align === 'center' && jssStyle?.datePicker?.resultAlignCenter,
          props.align === 'left' && jssStyle?.datePicker?.resultAlignLeft,
        )}
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
        <div className={jssStyle?.datePicker?.resultTextWrapper}>
          <div className={jssStyle?.datePicker?.resultText}>{resultArr[0]}</div>
          {range && <div className={jssStyle?.datePicker?.resultSeparator}>{'~'}</div>}
          {range && <div className={jssStyle?.datePicker?.resultText}>{resultArr[1]}</div>}
        </div>
        {!isEmpty && (
          <div className={jssStyle?.datePicker?.clear} onClick={handleClear}>
            {Icons.CloseCircle}
          </div>
        )}
        <div className={jssStyle?.datePicker?.icon}>{Icons.Calendar}</div>
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
        range && jssStyle?.datePicker?.wrapperRange,
      )}
      {...util.getDataAttribute({ type })}
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
          <Picker
            dateArr={dateArr}
            setDateArr={setDateArr}
            currentArr={currentArr}
            range={!!range}
            setCurrentArr={setCurrentArr}
            mode={mode}
            setMode={setMode}
            type={type}
            options={options}
            disabled={disabled}
            jssStyle={jssStyle}
            closePop={closePop}
          />
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default DatePicker;
