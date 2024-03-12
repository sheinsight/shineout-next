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
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';

const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
const horizontalPosition = ['left-top', 'left-bottom', 'right-top', 'right-bottom'];

const preventDefault = (e: React.MouseEvent) => {
  e.preventDefault();
};
const DatePicker = <Value extends DatePickerValueType>(props0: DatePickerProps<Value>) => {
  const props = useWithFormConfig(props0);
  const { locale } = useConfig();
  const { jssStyle, range, type = 'date', border = true, clearable = true, disabled, size } = props;
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const styles = jssStyle?.datePicker?.();
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
    clearable,
    disabled: disabled!,
    clearWithUndefined: props.clearWithUndefined,
    onClear: undefined,
    allowSingle: props.allowSingle,
    defaultCurrent: props.defaultPickerValue || props.defaultRangeMonth,
    formatResult: props.formatResult,
    onPickerChange: props.onPickerChange,
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

  const tipNode = useTip({
    popover: props.popover,
    popoverProps: props.popoverProps,
    error: props.error,
    tip: props.tip,
    focused,
    rootRef: targetRef,
    jssStyle: props.jssStyle,
  });

  const hasValue = Array.isArray(inputAbleResult.value)
    ? inputAbleResult.value.filter(Boolean).length > 0
    : !!inputAbleResult.value;

  const renderInnerTitle = useInnerTitle({
    innerTitle: props.innerTitle,
    placeTitle: props.placeTitle,
    open: open || hasValue,
    size: size,
    jssStyle: jssStyle,
  });

  const handleFocus = usePersistFn((e: React.FocusEvent) => {
    setFocused(true);
    props.onFocus?.(e);
  });

  const handleBlur = usePersistFn((e: React.FocusEvent) => {
    setFocused(false);
    props.onBlur?.(e);
  });

  const handleResultClick = usePersistFn(() => {
    if (disabledStatus === 'all') return;
    openPop();
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
          focused={focused}
          open={open}
          onFocus={handleFocus}
          onBlur={handleBlur}
          targetResultArr={targetResultArr}
          resultArr={resultArr}
          onChange={func.handleInputChange}
        />
      </div>
    );
    const canFocus = !(props.inputable || disabledStatus === 'all');
    return (
      <div
        className={classNames(
          styles?.resultWrapper,
          styles?.wrapperPaddingBox,
          styles?.wrapperInnerTitleTop,
          styles?.wrapperInnerTitleBottom,
        )}
        ref={targetRef}
        tabIndex={canFocus ? 1 : undefined}
        onClick={handleResultClick}
        onFocus={canFocus ? handleFocus : undefined}
        onBlur={canFocus ? handleBlur : undefined}
        onMouseDown={
          props.inputable
            ? (e) => {
                if ((e.target as HTMLInputElement).tagName === 'INPUT') return;
                e.preventDefault();
              }
            : undefined
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (open) {
              closePop();
            } else {
              openPop();
            }
          }
        }}
      >
        {renderInnerTitle(result)}
        {disabledStatus !== 'all' && !isEmpty && clearable && (
          <div className={classNames(styles?.clear, styles?.icon)} onClick={func.handleClear}>
            {Icons.CloseOpaqueMultic1}
          </div>
        )}
        <div className={styles?.icon}>{props.type === 'time' ? Icons.Time : Icons.Calendar1}</div>
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
      {...util.getDataAttribute({ ['input-border']: 'true', type })}
      className={classNames(
        props.className,
        styles?.wrapper,
        props.innerTitle && styles?.wrapperInnerTitle,
        size === 'small' && styles?.wrapperSmall,
        size === 'large' && styles?.wrapperLarge,
        focused && styles?.wrapperFocus,
        disabledStatus === 'all' && styles?.wrapperDisabled,
        (!!props.error || props.status === 'error') && styles?.wrapperError,
        range && styles?.wrapperRange,
        !border && styles?.wrapperNoBorder,
        !!props.underline && styles?.wrapperUnderline,
      )}
      style={{ width: props.width, ...props.style }}
    >
      {tipNode}
      {renderResult()}
      <AbsoluteList
        parentElRef={targetRef}
        popupElRef={popupRef}
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
          onMouseDown={preventDefault}
        >
          <Picker
            setTargetArr={func.setTargetArr}
            dateArr={dateArr}
            setDateArr={func.setDateArr}
            currentArr={currentArr}
            range={range}
            setCurrentArr={func.setCurrentArrWithParams}
            mode={mode}
            setMode={func.setMode}
            type={type}
            options={options}
            disabled={disabled}
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
