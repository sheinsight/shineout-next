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
  const { disabled, jssStyle, range, type = 'date', border = true, placeholder } = props;
  const disabledAll = disabled && typeof disabled !== 'function';
  const placeholderArr = Array.isArray(placeholder) ? placeholder : [placeholder, placeholder];
  const styles = jssStyle?.datePicker;
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
    allowSingle: props.allowSingle,
    defaultCurrent: props.defaultPickerValue || props.defaultRangeMonth,
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
          styles?.result,
          styles?.paddingBox,
          props.align === 'right' && styles?.resultAlignRight,
          props.align === 'center' && styles?.resultAlignCenter,
          props.align === 'left' && styles?.resultAlignLeft,
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
        <div className={styles?.resultTextWrapper}>
          <div className={styles?.resultText}>
            {resultArr[0] || <span className={styles?.placeholder}>{placeholderArr[0]}</span>}
          </div>
          {range && <div className={styles?.resultSeparator}>{'~'}</div>}
          {range && (
            <div className={styles?.resultText}>
              {resultArr[1] || <span className={styles?.placeholder}>{placeholderArr[1]}</span>}
            </div>
          )}
        </div>
        {!isEmpty && (
          <div className={styles?.clear} onClick={handleClear}>
            {Icons.CloseCircle}
          </div>
        )}
        <div className={styles?.icon}>{Icons.Calendar}</div>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        styles?.wrapper,
        focused && styles?.wrapperFocus,
        disabledAll && styles?.wrapperDisabled,
        props.status === 'error' && styles?.wrapperError,
        range && styles?.wrapperRange,
        !border && styles?.wrapperNoBorder,
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
          className={classNames(styles?.pickerWrapper)}
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
