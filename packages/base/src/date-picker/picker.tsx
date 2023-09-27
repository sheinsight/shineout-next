import React from 'react';
import { PickerProps } from './picker.type';
import Day from './day';
import Month from './month';
import Year from './year';
import Quarter from './quarter';
import Time from './time';
import Quick from './quick';
import { useDatePickerRange, usePersistFn } from '@sheinx/hooks';

const Picker = (props: PickerProps) => {
  const { range, currentArr, dateArr, options, jssStyle } = props;
  const { func, defaultTimeArr, endMax, endMin, startMin, startMax } = useDatePickerRange({
    type: props.type,
    defaultTime: props.defaultTime,
    range: props.range,
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

  const renderPicker = (position?: 'start' | 'end') => {
    const index = position === 'end' ? 1 : 0;
    const mode = props.mode[index];

    const commonProps = {
      key: position,
      options,
      value: dateArr[index],
      current: currentArr[index],
      setMode: position === 'end' ? func.setModeEnd : func.setModeStart,
      onChange: position === 'end' ? func.setDateEnd : func.setDateStart,
      setCurrent: position === 'end' ? func.setCurrentEnd : func.setCurrentStart,
      type: props.type as any,
      format: props.format,
      disabled: position === 'end' ? func.endDisabled : func.startDisabled,
      rangeDate: dateArr,
      min: position === 'end' ? endMin : startMin,
      max: position === 'end' ? endMax : startMax,
      jssStyle,
      position,
      showSelNow: props.showSelNow,
      setTarget: position === 'end' ? func.setTargetEnd : func.setTargetStart,
      onMouseEnter: () => {},
      onMouseLeave: () => {},
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
      return <Quarter {...commonProps} />;
    }

    if (mode === 'year') {
      return <Year {...commonProps} />;
    }
    if (mode === 'month') {
      return <Month {...commonProps} />;
    }
    if (mode === 'day') {
      return <Day {...commonProps} {...timeProps} />;
    }
    if (mode === 'time') {
      return <Time {...commonProps} {...timeProps} />;
    }
    return <Day {...commonProps} {...timeProps} />;
  };

  return (
    <div className={jssStyle?.datePicker?.pickerBox}>
      {props.quickSelect?.length && (
        <Quick
          quickSelect={props.quickSelect}
          range={props.range}
          jssStyle={jssStyle}
          dateArr={dateArr}
          setDateArr={props.setDateArr}
          setCurrentArr={props.setCurrentArr}
          format={props.format}
          options={props.options}
        />
      )}
      {range
        ? ['start', 'end'].map((item) => {
            return renderPicker(item as 'start' | 'end');
          })
        : renderPicker()}
    </div>
  );
};

export default Picker;
