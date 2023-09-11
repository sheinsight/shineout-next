import React from 'react';
import { useDatePick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';

import type { DayProps } from './day.type';

const Day = (props: DayProps) => {
  const { jssStyle } = props;
  const { func, currentYear, currentMonth } = useDatePick({
    current: props.current,
    onCurrentChange: props.setCurrent,
    value: props.value,
    onChange: props.onChange,
    min: props.min,
    max: props.max,
    type: props.type,
    disabled: props.disabled,
    options: props.options,
  });
  const days = func.getDays();
  const len = days.length / 7;

  const renderDay = (item: Date, index: number) => {
    const isActive = func.isActive(item);
    const isCurrentMonth = func.isCurrentMonth(item);
    const isDisabled = func.isDisabled(item);
    const isToday = func.isToday(item);
    return (
      <td
        className={classNames(
          jssStyle?.datePicker?.dayPickerCell,
          isActive && jssStyle?.datePicker?.dayPickerCellActive,
          isCurrentMonth && jssStyle?.datePicker?.dayPickerCellCurrentMonth,
          isDisabled && jssStyle?.datePicker?.dayPickerCellDisabled,
          isToday && jssStyle?.datePicker?.dayPickerCellToday,
        )}
        key={index}
        onClick={() => func.handleDayClick(item)}
      >
        {func.getDayStr(item)}
      </td>
    );
  };
  // todo getLocale
  const weeks = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const num = (props.options.weekStartsOn + index) % 7;
    return weeks[num];
  });
  return (
    <div className={jssStyle?.datePicker?.dayPicker}>
      <div className={jssStyle?.datePicker?.dayPickerHeader}>
        <div className={jssStyle?.datePicker.dayPickerIcon}>
          <span onClick={func.handlePrevYear}>{Icons.AngleDoubleLeft}</span>
          <span onClick={func.handlePrevMonth}>{Icons.AngleLeft}</span>
        </div>
        <div className={jssStyle?.datePicker?.dayPickerTitle}>
          <span>{currentYear}</span>
          <span>-</span>
          <span>{currentMonth}</span>
        </div>
        <div className={jssStyle?.datePicker.dayPickerIcon}>
          <span onClick={func.handleNextMonth}>{Icons.AngleRight}</span>
          <span onClick={func.handleNextYear}>{Icons.AngleDoubleRight}</span>
        </div>
      </div>
      <table className={jssStyle?.datePicker?.dayPickerBody}>
        <thead>
          <tr>
            {weekDays.map((item, index) => {
              return <td key={index}>{item}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: len }).map((_, index) => {
            return (
              <tr key={index} className={jssStyle?.datePicker?.dayPickerRow}>
                {days.slice(index * 7, (index + 1) * 7).map((item, index) => {
                  return renderDay(item, index);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Day;
