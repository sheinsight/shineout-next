import { YearProps } from './year.type';
import { usePersistFn, useYearPick } from '@sheinx/hooks';
import classNames from 'classnames';
import Icons from '../icons';
import React from 'react';

const Day = (props: YearProps) => {
  const { jssStyle } = props;
  const styles = jssStyle?.datePicker;
  const shouldChange = props.type === 'year';
  const changeMode = usePersistFn(() => {
    props.setMode('month');
  });
  const { currentStart, currentEnd, func } = useYearPick({
    current: props.current,
    rangeDate: shouldChange ? props.rangeDate : undefined,
    onCurrentChange: props.setCurrent,
    value: shouldChange ? props.value : undefined,
    onChange: shouldChange ? props.onChange : changeMode,
    min: props.min,
    max: props.max,
    disabled: shouldChange ? props.disabled : undefined,
    options: props.options,
  });

  const years = func.getYears();
  const colNum = 3;
  const rowNum = years.length / colNum;

  const renderYear = (item: Date, index: number) => {
    const isInRange = func.isInRange(item);
    return (
      <td
        className={classNames(
          styles?.pickerCell,
          func.isActive(item) && styles?.pickerCellActive,
          (index === 0 || index === 11) && styles?.pickerCellBound,
          func.isDisabled(item) && styles?.pickerCellDisabled,
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
            func.handleYearClick(item);
          }}
        >
          <span>{func.getYearStr(item)}</span>
        </div>
      </td>
    );
  };

  return (
    <div className={classNames(jssStyle?.datePicker?.yearPicker, jssStyle?.datePicker?.picker)}>
      <div className={jssStyle?.datePicker?.pickerHeader}>
        <div className={jssStyle?.datePicker?.pickerHeaderLeft}>
          <span className={jssStyle?.datePicker?.pickerHeaderIcon} onClick={func.handlePrev}>
            {Icons.AngleDoubleLeft}
          </span>
        </div>
        <div className={jssStyle?.datePicker?.pickerHeaderMid}>
          <span>{currentStart}</span>
          <i>-</i>
          <span>{currentEnd}</span>
        </div>
        <div className={jssStyle?.datePicker.pickerHeaderRight}>
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
                  {years.slice(index * colNum, (index + 1) * colNum).map((item, i) => {
                    return renderYear(item, index * colNum + i);
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
