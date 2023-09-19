import React from 'react';
import { useDatePick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import { getLocale, useConfig } from '../config';

import type { DayProps } from './day.type';

const Day = (props: DayProps) => {
  const { jssStyle } = props;
  const { locale } = useConfig();

  const styles = jssStyle?.datePicker;
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
    rangeDate: props.rangeDate,
    defaultTime: props.defaultTime,
  });
  const days = func.getDays();
  const len = days.length / 7;

  const renderDay = (item: Date, index: number) => {
    const isActive = func.isActive(item);
    const isCurrentMonth = func.isCurrentMonth(item);
    const isDisabled = func.isDisabled(item);
    const isToday = func.isToday(item);
    const isInRange = func.isInRange(item);
    return (
      <td
        className={classNames(
          styles?.pickerCell,
          isActive && styles?.pickerCellActive,
          !isCurrentMonth && styles?.pickerCellBound,
          isDisabled && styles?.pickerCellDisabled,
          isToday && styles?.pickerCellToday,
          isInRange && styles?.pickerCellInRange,
          (isInRange === 'start' || isInRange === 'start-end') &&
            props.position === 'start' &&
            styles?.pickerCellInRangeStart,
          (isInRange === 'end' || isInRange === 'start-end') &&
            props.position === 'end' &&
            styles?.pickerCellInRangeEnd,
        )}
        key={index}
        onClick={() => func.handleDayClick(item)}
      >
        <div className={styles?.pickerCellContent}>
          <span>{func.getDayStr(item)}</span>
        </div>
      </td>
    );
  };
  const weeks = getLocale(locale, 'weekdayValues.narrow');
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const num = (props.options.weekStartsOn + index) % 7;
    return weeks[num];
  });

  const renderWeek = (item: Date) => {
    if (props.type !== 'week') {
      return;
    }
    return (
      <th
        onClick={() => func.handleDayClick(item)}
        className={classNames(styles?.pickerCell, styles?.pickerCellBound)}
        key={'week'}
      >
        <div className={styles?.pickerCellContent}>{func.getWeekStr(item)}</div>
      </th>
    );
  };
  return (
    <div
      className={classNames(
        props.type === 'week' ? styles?.weekPicker : styles?.dayPicker,
        styles?.picker,
      )}
    >
      <div className={styles?.pickerHeader}>
        <div className={styles?.pickerHeaderLeft}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevYear}>
            {Icons.AngleDoubleLeft}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevMonth}>
            {Icons.AngleLeft}
          </span>
        </div>
        <div className={styles?.pickerHeaderMid}>
          <span
            className={styles?.pickerHeaderInfo}
            onClick={() => {
              props.setMode('year');
            }}
          >
            {currentYear}
          </span>
          <i>-</i>
          <span
            className={styles?.pickerHeaderInfo}
            onClick={() => {
              props.setMode('month');
            }}
          >
            {currentMonth}
          </span>
        </div>
        <div className={styles?.pickerHeaderRight}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNextMonth}>
            {Icons.AngleRight}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNextYear}>
            {Icons.AngleDoubleRight}
          </span>
        </div>
      </div>
      <div className={styles?.pickerBody}>
        <table>
          <thead>
            <tr>
              {props.type === 'week' && <th>{getLocale(locale, 'weekShort')}</th>}
              {weekDays.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: len }).map((_, index) => {
              const start = index * 7;
              return (
                <tr
                  key={index}
                  className={classNames(
                    styles?.pickerRow,
                    props.type === 'week' && styles?.pickerRowWeek,
                  )}
                >
                  {renderWeek(days[start + 3])}
                  {days.slice(start, start + 7).map((item, index) => {
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
