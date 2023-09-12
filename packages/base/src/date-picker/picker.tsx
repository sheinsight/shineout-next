import React from 'react';
import { PickerProps } from './picker.type';
import Day from './day';
import Month from './month';
import Year from './year';
import { usePersistFn } from '@sheinx/hooks';

const Picker = (props: PickerProps) => {
  const { range, mode, currentArr, setDateArr, dateArr, setMode, options, jssStyle, closePop } =
    props;

  const setDate = (index: number, date: Date) => {
    setDateArr((arr) => {
      const newArr = [...arr];
      newArr[index] = date;
      if (range && index === 0 && newArr[1]) {
        if (date.getTime() > newArr[1]!.getTime()) {
          newArr[1] = new Date(date);
        }
      }
      if (!range) closePop();
      if (range && newArr[1 - index] !== undefined) {
        closePop();
      }
      return newArr;
    });
  };

  const setCurrent = (index: number, date: Date) => {
    props.setCurrentArr((arr: Date[]) => {
      const newArr = [...arr];
      newArr[index] = date;
      if (range && index === 0 && newArr[1]) {
        if (date.getTime() > newArr[1]!.getTime()) {
          newArr[1] = new Date(date);
        }
      }
      if (range && index === 1 && newArr[0]) {
        if (date.getTime() < newArr[0]!.getTime()) {
          newArr[0] = new Date(date);
        }
      }

      return newArr;
    });
  };

  const setCurrentStart = usePersistFn((date: Date) => {
    setCurrent(0, date);
  });

  const setCurrentEnd = usePersistFn((date: Date) => {
    setCurrent(1, date);
  });

  const setDateStart = usePersistFn((date: Date) => {
    setDate(0, date);
  });

  const setDateEnd = usePersistFn((date: Date) => {
    setDate(1, date);
  });

  const renderPicker = (position?: string) => {
    const index = position === 'end' ? 1 : 0;
    let min: Date | undefined = undefined;
    if (position === 'end') {
      min = dateArr[0];
    }

    const commonProps = {
      key: position,
      setMode,
      options,
      value: dateArr[index],
      onChange: position === 'end' ? setDateEnd : setDateStart,
      current: currentArr[index],
      setCurrent: position === 'end' ? setCurrentEnd : setCurrentStart,
      type: props.type as any,
      disabled: props.disabled,
      min,
      jssStyle,
    };
    if (mode === 'year') {
      return <Year {...commonProps} />;
    }
    if (mode === 'month') {
      return <Month {...commonProps} />;
    }
    if (mode === 'day') {
      return <Day {...commonProps} />;
    }
    return <Day {...commonProps} />;
  };
  return (
    <div className={jssStyle?.datePicker?.pickerBox}>
      {range
        ? ['start', 'end'].map((item) => {
            return renderPicker(item);
          })
        : renderPicker()}
    </div>
  );
};

export default Picker;
