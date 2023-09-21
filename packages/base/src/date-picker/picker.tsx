import React from 'react';
import { PickerProps } from './picker.type';
import Day from './day';
import Month from './month';
import Year from './year';
import Quarter from './quarter';
import Time from './time';
import { useDatePickerRange } from '@sheinx/hooks';

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
      disabled: props.disabled,
      rangeDate: dateArr,
      min: position === 'end' ? endMin : startMin,
      max: position === 'end' ? endMax : startMax,
      jssStyle,
      position,
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
      return <Day {...commonProps} defaultTime={defaultTimeArr[index]} />;
    }
    if (mode === 'time') {
      return <Time {...commonProps} format={props.format} disabledTime={props.disabledTime} />;
    }
    return <Day {...commonProps} defaultTime={defaultTimeArr[index]} />;
  };
  return (
    <div className={jssStyle?.datePicker?.pickerBox}>
      {range
        ? ['start', 'end'].map((item) => {
            return renderPicker(item as 'start' | 'end');
          })
        : renderPicker()}
    </div>
  );
};

export default Picker;
