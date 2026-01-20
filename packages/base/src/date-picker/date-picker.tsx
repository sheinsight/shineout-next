import { getDataset, useDatePickerFormat, useInputAble, usePersistFn, usePopup, util } from '@sheinx/hooks';
import classNames from 'classnames';
import { AbsoluteList } from '../absolute-list';
import React, { useEffect, useRef } from 'react';
import { DatePickerProps, DatePickerValueType } from './date-picker.type';
import AnimationList from '../animation-list';
import Picker from './picker';
import { getLocale } from '../config';
import Icons from '../icons';
import Result from './result';
import useInnerTitle from '../common/use-inner-title';
import useWithFormConfig from '../common/use-with-form-config';
import useTip from '../common/use-tip';
import { useConfig } from '../config';

const { devUseWarning } = util;

const verticalPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
const horizontalPosition = ['left-top', 'left-bottom', 'right-top', 'right-bottom'];

const preventDefault = (e: React.MouseEvent) => {
  e.preventDefault();
};
const DatePicker = <Value extends DatePickerValueType>(props0: DatePickerProps<Value>) => {
  if (props0.defaultRangeMonth) {
    devUseWarning.deprecated('defaultRangeMonth', 'defaultPickerValue', 'DatePicker');
  }
  const props = useWithFormConfig(props0);
  const { locale, direction } = useConfig();
  const {
    jssStyle,
    range,
    type = 'date',
    border = true,
    clearable = true,
    disabled,
    size,
    adjust = true,
    startOfWeek,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [clickTimes, setClickTimes] = React.useState(0);
  const [isCloseFromConfirm, setIsCloseFromConfirm] = React.useState(false);
  const [oldDateArr, setOldDateArr] = React.useState<(Date | undefined)[]>([]);
  const inputRef = useRef<{
    inputRef: HTMLInputElement | null;
    inputRefs: (HTMLInputElement | null)[];
  }>({
    inputRef: null,
    inputRefs: [],
  });

  const styles = jssStyle?.datePicker?.();
  const isRTL = direction === 'rtl';

  const dfp = 'bottom-left';
  const [focused, setFocused] = React.useState(false);
  let listPosition: string = props.position || dfp;
  if (horizontalPosition.includes(listPosition)) {
    listPosition = listPosition.split('-').reverse().join('-');
  } else if (!verticalPosition.includes(listPosition)) {
    listPosition = dfp;
  }

  if (isRTL) {
    if (listPosition === 'bottom-left') listPosition = 'bottom-right';
    else if (listPosition === 'bottom-right') listPosition = 'bottom-left';
    else if (listPosition === 'top-left') listPosition = 'top-right';
    else if (listPosition === 'top-right') listPosition = 'top-left';
  }

  const options = {
    timeZone: props.timeZone,
    // 需要确保 weekStartsOn 是 number，否则后续的星期顺序计算都会出错
    weekStartsOn: util.isEmpty(startOfWeek) ? Number(getLocale(locale, 'startOfWeek')) : startOfWeek as number,
  };

  const inputAbleResult = useInputAble({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange as any,
    beforeChange: props.beforeChange as any,
    control: 'value' in props,
  });

  const {
    inputArr,
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
    clearToUndefined: props.clearToUndefined,
    onClear: undefined,
    allowSingle: props.allowSingle,
    defaultCurrent: props.defaultPickerValue || props.defaultRangeMonth,
    formatResult: props.formatResult,
    onPickerChange: props.onPickerChange,
  });

  const onCollapse = usePersistFn((isOpen: boolean) => {
    if (isOpen) {
      setOldDateArr(dateArr);
      func.startEdit();
    } else {
      setClickTimes(0);

      if (props.needConfirm) {
        if (!isCloseFromConfirm) {
          func.handleClear();
          // 点击空白处关闭面板时，还原到上次的值
          func.setDateArr(oldDateArr);
        }
      } else {
        func.finishEdit();

        // 如果是通过 props.open 控制的，那么需要在关闭时，将组件再次进入编辑状态
        if (props.open === true) {
          func.startEdit();
        }
      }

      setIsCloseFromConfirm(false);
    }
    props.onCollapse?.(isOpen);
  });

  // 如果一开始就打开了板子，那么需要初始化让组件进入编辑状态
  useEffect(() => {
    if (props.open) {
      func.startEdit();
    }
  }, [props.open]);

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

  const handleFocus = usePersistFn((e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  });

  const handleBlur = usePersistFn((e: React.FocusEvent<HTMLInputElement>, index?: number) => {
    setFocused(false);
    props.onBlur?.(e, index);

    if(props.needConfirm) return;

    if (props.inputable && !props.quickSelect && index !== undefined) {
      func.handleInputBlur(e.target.value, index);
    }

    // 当输入框有值时，失焦时需要立即触发 onChange，否则触控板的轻触模拟出来的click事件就获取不到最新的值
    if(inputArr.some(d => d !== undefined)) {
      func.finishEdit();
    };
  });

  const handleClose = (isFromConfirm?: boolean) => {
    setIsCloseFromConfirm(isFromConfirm || false);
    closePop();
    if (isFromConfirm) {
      func.finishEdit();
    }
    inputRef.current.inputRefs.forEach((el) => {
      el?.blur();
    });
  };

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
          onRef={inputRef}
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
              handleClose();
            } else {
              openPop();
            }
          }
        }}
      >
        {renderInnerTitle(result)}
        {disabledStatus !== 'all' && !isEmpty && clearable && (
          <div className={classNames(styles?.clear, styles?.icon)} onClick={func.handleClear}>
            {Icons.datepicker.Close}
          </div>
        )}
        <div className={styles?.icon}>
          {props.type === 'time' ? Icons.datepicker.Time : Icons.datepicker.Calendar}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (props.formatResult && props.inputable) {
      devUseWarning.conflict('DatePicker', 'formatResult', 'inputable');
    }
  }, []);

  return (
    <div
      {...util.getDataAttribute({ ['input-border']: 'true', type })}
      {...getDataset(props)}
      className={classNames(
        props.className,
        styles?.rootClass,
        styles?.wrapper,
        props.innerTitle && styles?.wrapperInnerTitle,
        size === 'small' && styles?.wrapperSmall,
        size === 'large' && styles?.wrapperLarge,
        focused && disabled !== true && styles?.wrapperFocus,
        disabledStatus === 'all' && styles?.wrapperDisabled,
        (!!props.error || props.status === 'error') && styles?.wrapperError,
        range && styles?.wrapperRange,
        !border && styles?.wrapperNoBorder,
        !!props.underline && styles?.wrapperUnderline,
      )}
      ref={targetRef}
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
        adjust={adjust}
      >
        <AnimationList
          onRef={popupRef}
          className={classNames(styles?.pickerWrapper)}
          display={'block'}
          type={'scale-y'}
          duration={'fast'}
          show={open}
          onMouseDown={preventDefault}
        >
          <Picker
            setTargetArr={func.setTargetArr}
            dateArr={dateArr}
            inputArr={inputArr}
            setDateArr={func.setDateArr}
            onClearInputArr={func.handleClearInputArr}
            currentArr={currentArr}
            range={range}
            setCurrentArr={func.setCurrentArrWithParams}
            mode={mode}
            setMode={func.setMode}
            type={type}
            options={options}
            disabled={disabled}
            allowSingle={props.allowSingle}
            jssStyle={jssStyle}
            closePop={handleClose}
            defaultTime={props.defaultTime}
            min={props.min}
            max={props.max}
            format={format}
            disabledTime={props.disabledTime}
            quickSelect={props.quickSelect}
            showSelNow={props.showSelNow}
            clickTimes={clickTimes}
            setClickTimes={setClickTimes}
            setActiveIndex={setActiveIndex}
            hourStep={props.hourStep}
            minuteStep={props.minuteStep}
            secondStep={props.secondStep}
            registerModeDisabled={func.registerModeDisabled}
            isDisabledDate={func.isDisabledDate}
            needConfirm={props.needConfirm}
            renderDate={props.renderDate}
          >
            {props.children}
          </Picker>
        </AnimationList>
      </AbsoluteList>
    </div>
  );
};

export default DatePicker;
