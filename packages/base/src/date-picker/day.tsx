import React from 'react';
import { dateUtil, useDatePick, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import { getLocale, useConfig } from '../config';
import TimePicker from './time';
import Link from '../link';

import type { DayProps } from './day.type';
import PickerTitle from './pickerTitle';
import Confirm from './confirm';

const Day = (props: DayProps) => {
  const { jssStyle, allowSingle } = props;
  const { locale, direction } = useConfig();
  const styles = jssStyle?.datePicker?.();

  const areaType = props.type === 'week' ? 'week' : 'day';
  const onChange = usePersistFn((date, noClose?: boolean) => {
    props.onChange(date, noClose || props.type === 'datetime');
    props.setTarget(undefined);
  });

  const setCurrent = usePersistFn((date: Date, type?: string) => {
    props.setCurrent(date, type || areaType);
  });
  const { func, currentYear, currentMonth } = useDatePick({
    current: props.current,
    onCurrentChange: setCurrent,
    value: props.value,
    range: props.range,
    onChange,
    allowSingle,
    onClearInputArr: props.onClearInputArr,
    position: props.position,
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
    props.onChange(new Date(), props.needConfirm || props.type === 'datetime');
    setTimeout(() => {
      if (props.needConfirm && props.closeByConfirm && !props.range) props.closeByConfirm();
    }, 0);
  };

  const renderDay = (item: Date, index: number) => {
    const isActive = func.isActive(item);
    const isCurrentMonth = func.isCurrentMonth(item);
    const isDisabled = func.isDisabled(item);
    const isToday = func.isToday(item);
    const isInRange = func.isInRange(item);
    return (
      <td
        dir={direction}
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
        onClick={() => {
          if (props.range) {
            func.handleDayClick(item, props.needConfirm || props.clickTimes < 1);
            props.setClickTimes(props.clickTimes + 1);
          } else {
            func.handleDayClick(item, props.needConfirm);
          }
        }}
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
        {props.renderDate ? (
          props.renderDate({
            date: item,
            isDisabled,
            isInRange,
            isToday,
            isCurrentMonth,
            isActive,
            position: props.position,
            className: styles?.pickerCellContent,
          })
        ) : (
          <div className={styles?.pickerCellContent}>
            <span>{func.getDayStr(item)}</span>
          </div>
        )}
      </td>
    );
  };
  const weeks = getLocale(locale, 'weekdayValues.narrow');
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    // weekStartsOn可能是字符串，需要转换为数字，否则得到星期顺序不正确
    const num = (Number(props.options.weekStartsOn) + index) % 7;
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
        dir={direction}
      >
        <div className={styles?.pickerCellContent}>{func.getWeekStr(item)}</div>
      </th>
    );
  };

  const renderFooter = () => {
    const showLeft = props.type === 'datetime' || props.type === 'date' || props.type === 'week';

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

    const showNeedConfirm = props.needConfirm && !props.range;

    if (props.type !== 'datetime' && props.type !== 'date' && !showNeedConfirm) return null;
    return (
      <div
        className={styles?.pickerFooter}
        dir={direction}
        style={{
          borderTop: props.needConfirm && props.range ? 'none' : undefined,
          marginTop: props.needConfirm && props.range ? -16 : undefined,
        }}
      >
        {props.type === 'datetime' && (
          <div
            className={classNames(styles?.pickerFooterTime, styles?.datetime)}
            style={{ paddingRight: showNeedConfirm ? 0 : undefined }}
          >
            {
              <>
                <span>{Icons.datepicker.Time}</span>
                <TimePicker {...props} showSelNow={false} showTitle={false} format={format} />
                <span>{timeStr || '00:00:00'}</span>
              </>
            }
          </div>
        )}
        {props.showSelNow && (
          <div
            className={classNames(styles?.pickerFooterNow)}
            style={{
              marginRight: showNeedConfirm ? 'auto' : undefined,
              paddingLeft: showNeedConfirm ? (props.type === 'date' ? 22 : 6) : undefined,
            }}
          >
            {props.type === 'date' && (
              <Link
                type='primary'
                jssStyle={jssStyle}
                className={styles?.pickerFooterBtn}
                onClick={selNow}
              >
                {getLocale(locale, 'now')}
              </Link>
            )}
            {props.type === 'datetime' && (
              <Link
                type='primary'
                jssStyle={jssStyle}
                className={styles?.pickerFooterBtn}
                onClick={selNow}
              >
                {getLocale(locale, 'current')}
              </Link>
            )}
          </div>
        )}

        {showNeedConfirm && <Confirm closeByConfirm={props.closeByConfirm} jssStyle={jssStyle} />}
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
      <div className={styles?.pickerHeader} dir={direction}>
        <div className={styles?.pickerHeaderLeft}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevYear} dir={direction}>
            {Icons.datepicker.ArrowDoubleLeft}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrevMonth} dir={direction}>
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
          <strong>-</strong>
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
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNextMonth} dir={direction}>
            {Icons.datepicker.ArrowRight}
          </span>
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNextYear} dir={direction}>
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
