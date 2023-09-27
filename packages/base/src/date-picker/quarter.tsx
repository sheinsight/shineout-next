import { QuarterProps } from './quarter.type';
import { useQuarterPick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import React from 'react';
import PickerTitle from './pickerTitle';

const Quarter = (props: QuarterProps) => {
  const { jssStyle } = props;
  const styles = jssStyle?.datePicker;
  const { currentYear, func } = useQuarterPick({
    current: props.current,
    rangeDate: props.rangeDate,
    onCurrentChange: props.setCurrent,
    value: props.value,
    onChange: props.onChange,
    min: props.min,
    max: props.max,
    disabled: props.disabled,
    options: props.options,
  });

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
      >
        <div
          className={jssStyle?.datePicker?.pickerCellContent}
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
          <span>Q{func.getQuarterStr(item)}</span>
        </div>
      </td>
    );
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(jssStyle?.datePicker?.quarterPicker, jssStyle?.datePicker?.picker)}
    >
      <PickerTitle position={props.position} jssStyle={jssStyle} />
      <div className={jssStyle?.datePicker?.pickerHeader}>
        <div className={jssStyle?.datePicker?.pickerHeaderLeft}>
          <span className={jssStyle?.datePicker?.pickerHeaderIcon} onClick={func.handlePrev}>
            {Icons.AngleDoubleLeft}
          </span>
        </div>
        <div className={jssStyle?.datePicker?.pickerHeaderMid}>
          <span
            className={styles?.pickerHeaderInfo}
            onClick={() => {
              props.setMode('year');
            }}
          >
            {currentYear}
          </span>
        </div>
        <div className={jssStyle?.datePicker?.pickerHeaderRight}>
          <span className={jssStyle?.datePicker?.pickerHeaderIcon} onClick={func.handleNext}>
            {Icons.AngleDoubleRight}
          </span>
        </div>
      </div>
      <div className={jssStyle?.datePicker?.pickerBody}>
        <table>
          <tbody>
            {Array.from({ length: rowNum }).map((_, index) => {
              return (
                <tr key={index} className={jssStyle?.datePicker?.pickerRow}>
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
