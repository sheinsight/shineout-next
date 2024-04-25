import { QuarterProps } from './quarter.type';
import { usePersistFn, useQuarterPick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import React from 'react';
import PickerTitle from './pickerTitle';

const Quarter = (props: QuarterProps) => {
  const { jssStyle } = props;
  const styles = jssStyle?.datePicker?.();

  const setCurrent = usePersistFn((date) => {
    props.setCurrent(date, 'quarter');
  });
  const { currentYear, func } = useQuarterPick({
    current: props.current,
    rangeDate: props.rangeDate,
    onCurrentChange: setCurrent,
    value: props.value,
    onChange: props.onChange,
    min: props.min,
    max: props.max,
    disabled: props.disabled,
    options: props.options,
  });

  props.registerModeDisabled(props.position, 'quarter', func.isDisabled);

  const quarter = func.getQuarters();
  const colNum = 4;
  const rowNum = 1;

  const renderQuarter = (item: Date, index: number) => {
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
        onClick={() => {
          func.handleQuarterClick(item);
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
          <span>Q{func.getQuarterStr(item)}</span>
        </div>
      </td>
    );
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(styles?.quarterPicker, styles?.picker)}
    >
      <PickerTitle position={props.position} jssStyle={jssStyle} />
      <div className={styles?.pickerHeader}>
        <div className={styles?.pickerHeaderLeft}>
          <span className={styles?.pickerHeaderIcon} onClick={func.handlePrev}>
            {Icons.datepicker.ArrowDoubleLeft}
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
                  {quarter.slice(index * colNum, (index + 1) * colNum).map((item, i) => {
                    return renderQuarter(item, index * colNum + i);
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

export default Quarter;
