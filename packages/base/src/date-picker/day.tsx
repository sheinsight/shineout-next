import React from 'react';
import { dateUtil, useDatePick, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import { getLocale, useConfig } from '../config';
import TimePicker from './time';
import Button from '../button';

import type { DayProps } from './day.type';
import PickerTitle from './pickerTitle';

const Day = (props: DayProps) => {
  const { jssStyle } = props;
  const { locale } = useConfig();

  const styles = jssStyle?.datePicker?.();

  const areaType = props.type === 'week' ? 'week' : 'day';

  const onChange = usePersistFn((date) => {
    props.onChange(date, props.type === 'datetime');
    props.setTarget(undefined);
  });

  const setCurrent = usePersistFn((date) => {
    props.setCurrent(date, areaType);
  });
  const { func, currentYear, currentMonth } = useDatePick({
    current: props.current,
    onCurrentChange: setCurrent,
    value: props.value,
    onChange,
    min: props.min,
    max: props.max,
    type: props.type as any,
    disabled: props.disabled,
    options: props.options,
    rangeDate: props.rangeDate,
    defaultTime: props.defaultTime,
    format: props.format,
  });

  props.registerModeDisabled(props.position, 'day', func.isDisabled);
  const days = func.getDays();
  const len = days.length / 7;

  const selNow = () => {
    let now = new Date();
    if (func.isDisabled(now)) return;
    props.setCurrent(new Date(), areaType);
    props.onChange(new Date(), props.type === 'datetime');
  };

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
        onDoubleClick={() => {
          props.onDoubleClick?.(item, areaType);
        }}
        onMouseEnter={
          isDisabled
            ? undefined
            : () => {
                props.setTarget(func.getDateWithTime(item));
              }
        }
        onMouseLeave={
          isDisabled
            ? undefined
            : () => {
                props.setTarget(undefined);
              }
        }
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

  const renderFooter = () => {
    const showLeft = props.type === 'datetime' && (props.rangeDate?.[0] || props.rangeDate?.[1]);
    const showRight = props.showSelNow;

    const timeStr = func.getTimeStr();
    if (!showLeft && !props.showSelNow) return null;
    let { format } = props;
    if (/^[X|x]$/.test(dateUtil.compatibleFmt(format)!)) {
      format = 'HH:mm:ss';
    } else {
      const match = format.match(/[H|h].*/);
      // eslint-disable-next-line
      if (match) format = match[0];
    }
    return (
      <div className={styles?.pickerFooter}>
        {props.type === 'datetime' && (
          <div className={classNames(styles?.pickerFooterLeft, styles?.datetime)}>
            {timeStr && (
              <>
                <span>{Icons.datepicker.Time}</span>
                <TimePicker {...props} showSelNow={false} showTitle={false} format={format} />
                <span>{func.getTimeStr()}</span>
              </>
            )}
          </div>
        )}
        {showRight && (
          <div className={styles?.pickerFooterRight}>
            {props.showSelNow && props.type === 'date' && (
              <Button
                size={'small'}
                jssStyle={jssStyle}
                className={styles?.pickerFooterBtn}
                onClick={selNow}
              >
                {getLocale(locale, 'now')}
              </Button>
            )}
            {props.showSelNow && props.type === 'datetime' && (
              <Button
                size={'small'}
                jssStyle={jssStyle}
                className={styles?.pickerFooterBtn}
                onClick={selNow}
              >
                {getLocale(locale, 'current')}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={classNames(
        props.type === 'week' ? styles?.weekPicker : styles?.dayPicker,
        styles?.picker,
      )}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <PickerTitle position={props.position} jssStyle={jssStyle} />
      <div className={styles?.pickerHeader}>
        <div className={styles?.pickerHeaderLeft}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevYear}>
            {Icons.datepicker.ArrowDoubleLeft}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevMonth}>
            {Icons.datepicker.ArrowLeft}
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
            {Icons.datepicker.ArrowRight}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNextYear}>
            {Icons.datepicker.ArrowDoubleRight}
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
      {renderFooter()}
    </div>
  );
};

export default Day;
