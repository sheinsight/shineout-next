import { MonthProps } from './month.type';
import { useMonthPick, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import React from 'react';
import PickerTitle from './pickerTitle';

const Month = (props: MonthProps) => {
  const { jssStyle } = props;
  const styles = jssStyle?.datePicker?.();
  const shouldChange = props.type === 'month';
  const changeMode = usePersistFn(() => {
    props.setMode('day');
  });

  const setCurrent = usePersistFn((date) => {
    props.setCurrent(date, 'month');
  });
  const { currentYear, func } = useMonthPick({
    current: props.current,
    rangeDate: shouldChange ? props.rangeDate : undefined,
    onCurrentChange: setCurrent,
    value: shouldChange ? props.value : undefined,
    onChange: shouldChange ? props.onChange : changeMode,
    min: props.min,
    max: props.max,
    disabled: shouldChange ? props.disabled : undefined,
    options: props.options,
  });

  props.registerModeDisabled(props.position, 'month', func.isDisabled);

  const months = func.getMonths();
  const colNum = 3;
  const rowNum = months.length / colNum;

  const renderMonth = (item: Date, index: number) => {
    const isInRange = func.isInRange(item);
    const isDisabled = func.isDisabled(item);
    return (
      <td
        className={classNames(
          styles?.pickerCell,
          func.isActive(item) && styles?.pickerCellActive,
          isDisabled && styles?.pickerCellDisabled,
          func.isNow(item) && styles?.pickerCellToday,
          isInRange && styles?.pickerCellInRange,
          (isInRange === 'start' || isInRange === 'start-end') &&
            props.position === 'start' &&
            styles?.pickerCellInRangeStart,
          (isInRange === 'end' || isInRange === 'start-end') &&
            props.position === 'end' &&
            styles?.pickerCellInRangeEnd,
        )}
        key={index}
        onMouseEnter={
          isDisabled
            ? undefined
            : () => {
                props.setTarget(item);
              }
        }
        onMouseLeave={
          isDisabled
            ? undefined
            : () => {
                props.setTarget(undefined);
              }
        }
        onClick={() => {
          func.handleMonthClick(item);
        }}
      >
        <div className={styles?.pickerCellContent}>
          <span>{func.getMonthStr(item)}</span>
        </div>
      </td>
    );
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(styles?.monthPicker, styles?.picker)}
    >
      <PickerTitle position={props.position} jssStyle={jssStyle} />
      <div className={styles?.pickerHeader}>
        <div className={styles?.pickerHeaderLeft}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrev}>
            {Icons.AngleDoubleLeft}
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
        </div>
        <div className={styles?.pickerHeaderRight}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handleNext}>
            {Icons.AngleDoubleRight}
          </span>
        </div>
      </div>
      <div className={styles?.pickerBody}>
        <table>
          <tbody>
            {Array.from({ length: rowNum }).map((_, index) => {
              return (
                <tr key={index} className={styles?.pickerRow}>
                  {months.slice(index * colNum, (index + 1) * colNum).map((item, i) => {
                    return renderMonth(item, index * colNum + i);
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

export default Month;
