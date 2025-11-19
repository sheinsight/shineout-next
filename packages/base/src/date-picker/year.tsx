import { YearProps } from './year.type';
import { usePersistFn, useYearPick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import React from 'react';
import PickerTitle from './pickerTitle';
import { useConfig } from '../config';
import Confirm from './confirm';

const Year = (props: YearProps) => {
  const { jssStyle } = props;
  const config = useConfig();
  const styles = jssStyle?.datePicker?.();
  const shouldChange = props.type === 'year';
  const changeMode = usePersistFn(() => {
    props.setMode('month');
  });

  const setCurrent = usePersistFn((date: Date, type?: string) => {
    props.setCurrent(date, type || 'year');
  });
  const { currentStart, currentEnd, func } = useYearPick({
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
  props.registerModeDisabled(props.position, 'year', func.isDisabled);

  const years = func.getYears();
  const colNum = 3;
  const rowNum = years.length / colNum;

  const renderYear = (item: Date, index: number) => {
    const isInRange = func.isInRange(item);
    const isDisabled = func.isDisabled(item);

    return (
      <td
        dir={config.direction}
        className={classNames(
          styles?.pickerCell,
          func.isActive(item) && styles?.pickerCellActive,
          (index === 0 || index === 11) && styles?.pickerCellBound,
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
        onClick={() => {
          func.handleYearClick(item, props.needConfirm);
        }}
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
      >
        <div className={styles?.pickerCellContent}>
          <span>{func.getYearStr(item)}</span>
        </div>
      </td>
    );
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(styles?.yearPicker, styles?.picker)}
    >
      <PickerTitle position={props.position} jssStyle={jssStyle} />
      <div className={styles?.pickerHeader} dir={config.direction}>
        <div className={styles?.pickerHeaderLeft}>
          <span
            className={styles?.pickerHeaderIcon}
            onClick={func.handlePrev}
            dir={config.direction}
          >
            {Icons.datepicker.ArrowDoubleLeft}
          </span>
        </div>
        <div className={styles?.pickerHeaderMid}>
          <span>{currentStart}</span>
          <i>-</i>
          <span>{currentEnd}</span>
        </div>
        <div className={styles?.pickerHeaderRight}>
          <span
            className={styles?.pickerHeaderIcon}
            onClick={func.handleNext}
            dir={config.direction}
          >
            {Icons.datepicker.ArrowDoubleRight}
          </span>
        </div>
      </div>
      <div className={styles?.pickerBody}>
        <table>
          <tbody>
            {Array.from({ length: rowNum }).map((_, index) => {
              return (
                <tr key={index} className={styles?.pickerRow}>
                  {years.slice(index * colNum, (index + 1) * colNum).map((item, i) => {
                    return renderYear(item, index * colNum + i);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {props.needConfirm && !props.range && (
          <Confirm closeByConfirm={props.closeByConfirm} jssStyle={props.jssStyle} />
        )}
    </div>
  );
};

export default Year;
