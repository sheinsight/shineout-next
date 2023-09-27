import { useDatePickerFormat, useInputAble, usePersistFn, usePopup, util } from '@sheinx/hooks';
import classNames from 'classnames';
import { AbsoluteList } from '../absolute-list';
import React, { useEffect } from 'react';
import { DatePickerProps, DatePickerValueType } from './date-picker.type';
import AnimationList from '../animation-list';
import Picker from './picker';
import { getLocale, useConfig } from '../config';
import Icons from '../icons';
import Result from './result';
import useInnerTitle from '../common/use-inner-title';

const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
const horizontalPosition = ['left-top', 'left-bottom', 'right-top', 'right-bottom'];
const DatePicker = <Value extends DatePickerValueType>(props: DatePickerProps<Value>) => {
  const { locale } = useConfig();
  const { jssStyle, range, type = 'date', border = true } = props;
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const styles = jssStyle?.datePicker;
  const [focused, setFocused] = React.useState(false);
  let listPosition: string = props.position || 'bottom-left';
  if (horizontalPosition.includes(listPosition)) {
    listPosition = listPosition.split('-').reverse().join('-');
  } else if (!verticalPosition.includes(listPosition)) {
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
    targetResultArr,
    dateArr,
    currentArr,
    mode,
    isEmpty,
    format,
    func,
    disabledStatus,
  } = useDatePickerFormat({
    value: inputAbleResult.value,
    range: props.range,
    onChange: inputAbleResult.onChange,
    type: type,
    format: props.format,
    options,
    disabled: props.disabled!,
    clearWithUndefined: props.clearWithUndefined,
    onClear: undefined,
    allowSingle: props.allowSingle,
    defaultCurrent: props.defaultPickerValue || props.defaultRangeMonth,
    formatResult: props.formatResult,
  });

  const onCollapse = usePersistFn((isOpen: boolean) => {
    if (isOpen) {
      func.startEdit();
    } else {
      func.finishEdit();
    }
    props.onCollapse?.(isOpen);
  });

  const { open, position, targetRef, popupRef, openPop, closePop } = usePopup({
    open: props.open,
    onCollapse: onCollapse,
    disabled: disabledStatus === 'all',
    trigger: 'click',
    position: listPosition as DatePickerProps<Value>['position'],
  });

  const hasValue = Array.isArray(inputAbleResult.value)
    ? inputAbleResult.value.filter(Boolean).length > 0
    : !!inputAbleResult.value;

  const renderInnerTitle = useInnerTitle({
    innerTitle: props.innerTitle,
    placeTitle: props.placeTitle,
    open: open || hasValue,
    size: props.size,
    jssStyle: jssStyle,
  });

  const renderResult = () => {
    const result = (
      <div
        className={classNames(
          styles?.result,
          props.align === 'right' && styles?.resultAlignRight,
          props.align === 'center' && styles?.resultAlignCenter,
          props.align === 'left' && styles?.resultAlignLeft,
        )}
        ref={targetRef}
      >
        <Result
          jssStyle={jssStyle}
          activeIndex={activeIndex}
          type={type}
          range={range}
          inputable={props.inputable && !props.formatResult}
          disabledLeft={disabledStatus === 'left'}
          disabledRight={disabledStatus === 'right'}
          placeholder={props.placeholder}
          focused={open}
          targetResultArr={targetResultArr}
          resultArr={resultArr}
          onChange={func.handleInputChange}
        />
      </div>
    );
    return (
      <div
        className={classNames(
          styles?.resultWrapper,
          styles?.wrapperPaddingBox,
          styles?.wrapperInnerTitleTop,
          styles?.wrapperInnerTitleBottom,
        )}
        tabIndex={disabledStatus === 'all' ? undefined : 0}
        onClick={disabledStatus === 'all' ? undefined : openPop}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      >
        {renderInnerTitle(result)}
        {disabledStatus !== 'all' && !isEmpty && (
          <div className={classNames(styles?.clear, styles?.icon)} onClick={func.handleClear}>
            {Icons.CloseCircle}
          </div>
        )}
        <div className={styles?.icon}>{props.type === 'time' ? Icons.Clock : Icons.Calendar}</div>
      </div>
    );
  };

  useEffect(() => {
    if (props.formatResult && props.inputable) {
      console.warn('formatResult and inputable cannot be used at the same time');
    }
  }, []);

  return (
    <div
      data-soui-type={'input'}
      className={classNames(
        props.className,
        styles?.wrapper,
        props.innerTitle && styles?.wrapperInnerTitle,
        props.size === 'small' && styles?.wrapperSmall,
        props.size === 'large' && styles?.wrapperLarge,
        focused && styles?.wrapperFocus,
        disabledStatus === 'all' && styles?.wrapperDisabled,
        props.status === 'error' && styles?.wrapperError,
        range && styles?.wrapperRange,
        !border && styles?.wrapperNoBorder,
      )}
      {...util.getDataAttribute({ type })}
      style={props.style}
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
            setTargetArr={func.setTargetArr}
            dateArr={dateArr}
            setDateArr={func.setDateArr}
            currentArr={currentArr}
            range={range}
            setCurrentArr={func.setCurrentArr}
            mode={mode}
            setMode={func.setMode}
            type={type}
            options={options}
            disabled={props.disabled}
            jssStyle={jssStyle}
            closePop={closePop}
            defaultTime={props.defaultTime}
            min={props.min}
            max={props.max}
            format={format}
            disabledTime={props.disabledTime}
            quickSelect={props.quickSelect}
            showSelNow={props.showSelNow}
            setActiveIndex={setActiveIndex}
            hourStep={props.hourStep}
            minuteStep={props.minuteStep}
            secondStep={props.secondStep}
            registerModeDisabled={func.registerModeDisabled}
          />
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default DatePicker;
