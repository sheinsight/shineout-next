import React from 'react';
import { PickerProps } from './picker.type';
import Day from './day';
import Month from './month';
import Year from './year';
import Quarter from './quarter';
import Time from './time';
import Quick from './quick';
import { useDatePickerRange, usePersistFn } from '@sheinx/hooks';
import Confirm from './confirm';

const Picker = (props: PickerProps) => {
  const { range, currentArr, dateArr, options, jssStyle, isDisabledDate, type } = props;
  const styles = jssStyle?.datePicker?.();
  const {
    func,
    defaultTimeArr,
    endMax,
    endMin,
    startMin,
    startMax,
    staticStartMin,
    staticStartMax,
  } = useDatePickerRange({
    type: props.type,
    defaultTime: props.defaultTime,
    range: props.range,
    inputArr: props.inputArr,
    dateArr: props.dateArr,
    setDateArr: props.setDateArr,
    currentArr: props.currentArr,
    setCurrentArr: props.setCurrentArr,
    mode: props.mode,
    setMode: props.setMode,
    disabled: props.disabled,
    options: props.options,
    close: props.closePop,
    min: props.min,
    max: props.max,
    setTargetArr: props.setTargetArr,
  });

  const handleEnterStart = usePersistFn(() => {
    props.setActiveIndex(0);
  });
  const handleEnterEnd = usePersistFn(() => {
    props.setActiveIndex(1);
  });
  const handleLeave = usePersistFn(() => {
    props.setActiveIndex(-1);
  });

  const closeByConfirm = () => props.closePop(true);

  const renderPicker = (position?: 'start' | 'end') => {
    const index = position === 'end' ? 1 : 0;
    const mode = props.mode[index];

    const commonProps = {
      options,
      value: dateArr[index],
      current: currentArr[index],
      setMode: position === 'end' ? func.setModeEnd : func.setModeStart,
      onChange: position === 'end' ? func.setDateEnd : func.setDateStart,
      setCurrent: position === 'end' ? func.setCurrentEnd : func.setCurrentStart,
      onClearInputArr: props.onClearInputArr,
      type: props.type as any,
      format: props.format,
      disabled: position === 'end' ? func.endDisabled : func.startDisabled,
      rangeDate: dateArr,
      allowSingle: props.allowSingle,

      min: position === 'end' ? endMin : startMin,
      staticMin: position === 'end' ? endMin : staticStartMin,
      max: position === 'end' ? endMax : startMax,
      staticMax: position === 'end' ? endMax : staticStartMax,

      jssStyle,
      position,
      showSelNow: props.showSelNow,
      setTarget: position === 'end' ? func.setTargetEnd : func.setTargetStart,
      registerModeDisabled: props.registerModeDisabled,
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      range,
      setClickTimes: props.setClickTimes,
      clickTimes: props.clickTimes,
      needConfirm: props.needConfirm,
      closeByConfirm,
    };
    if (range) {
      commonProps['onMouseEnter'] = position === 'end' ? handleEnterEnd : handleEnterStart;
      commonProps['onMouseLeave'] = handleLeave;
    }
    const timeProps = {
      disabledTime: props.disabledTime,
      defaultTime: defaultTimeArr[index],
      hourStep: props.hourStep,
      minuteStep: props.minuteStep,
      secondStep: props.secondStep,
    };
    if (mode === 'quarter') {
      return <Quarter key={position} {...commonProps} />;
    }

    if (mode === 'year') {
      return <Year key={position} {...commonProps} />;
    }
    if (mode === 'month') {
      return <Month key={position} {...commonProps} />;
    }
    if (mode === 'day') {
      return (
        <Day
          key={position}
          {...commonProps}
          {...timeProps}
          onDoubleClick={(item, type) => {
            // 双击同时设置开始和结束日期
            if (props.range && props.type === 'datetime') {
              if (position === 'start') {
                const end = func.getStartDobule(item);
                if (!isDisabledDate(end, 'end')) {
                  func.setCurrentEnd(end, type);
                  func.setDateEnd(end, true);
                }
              } else if (position === 'end') {
                const start = func.getEndDobule(item);
                if (!isDisabledDate(start, 'start')) {
                  func.setCurrentStart(start, type);
                  func.setDateStart(start, true);
                }
              }
            }
          }}
        />
      );
    }
    if (mode === 'time') {
      return <Time key={position} {...commonProps} {...timeProps} />;
    }
    return <Day key={position} {...commonProps} {...timeProps} />;
  };

  return (
    <div className={styles?.pickerBox}>
      {
        <Quick
          quickSelect={props.quickSelect}
          closePop={props.closePop}
          range={props.range}
          jssStyle={jssStyle}
          dateArr={dateArr}
          type={type}
          onClearInputArr={props.onClearInputArr}
          setDateArr={props.setDateArr}
          setCurrentArr={props.setCurrentArr}
          format={props.format}
          options={props.options}
        >
          {props.children}
        </Quick>
      }
      {range ? (
        <div className={styles?.pickerRange}>
          <div className={styles?.pickerRangeBody}>
            {['start', 'end'].map((item) => renderPicker(item as 'start' | 'end'))}
          </div>
          {props.needConfirm && (
            <div className={styles?.pickerRangeFooter}>
              <Confirm closeByConfirm={closeByConfirm} jssStyle={jssStyle} />
            </div>
          )}
        </div>
      ) : (
        renderPicker()
      )}
    </div>
  );
};

export default Picker;
