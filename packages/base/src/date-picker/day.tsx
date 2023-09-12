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
          jssStyle?.datePicker?.pickerCell,
          isActive && jssStyle?.datePicker?.pickerCellActive,
          isCurrentMonth && jssStyle?.datePicker?.pickerCellCurrentMonth,
          isDisabled && jssStyle?.datePicker?.pickerCellDisabled,
          isToday && jssStyle?.datePicker?.pickerCellToday,
        )}
        key={index}
        onClick={() => func.handleDayClick(item)}
      >
        <div className={jssStyle?.datePicker?.pickerCellContent}>
          <span>{func.getDayStr(item)}</span>
        </div>
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
    <div className={classNames(jssStyle?.datePicker?.dayPicker, jssStyle?.datePicker?.picker)}>
      <div className={jssStyle?.datePicker?.pickerHeader}>
        <div className={jssStyle?.datePicker.pickerIcon}>
          <span onClick={func.handlePrevYear}>{Icons.AngleDoubleLeft}</span>
          <span onClick={func.handlePrevMonth}>{Icons.AngleLeft}</span>
        </div>
        <div className={jssStyle?.datePicker?.pickerTitle}>
          <span>{currentYear}</span>
          <span>-</span>
          <span>{currentMonth}</span>
        </div>
        <div className={jssStyle?.datePicker.pickerIcon}>
          <span onClick={func.handleNextMonth}>{Icons.AngleRight}</span>
          <span onClick={func.handleNextYear}>{Icons.AngleDoubleRight}</span>
        </div>
      </div>
      <div className={jssStyle?.datePicker?.pickerBody}>
        <table>
          <thead>
            <tr>
              {weekDays.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: len }).map((_, index) => {
              return (
                <tr key={index} className={jssStyle?.datePicker?.pickerRow}>
                  {days.slice(index * 7, (index + 1) * 7).map((item, index) => {
                    return renderDay(item, index);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Day;
