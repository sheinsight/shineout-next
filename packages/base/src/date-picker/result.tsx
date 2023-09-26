import { DatePickerProps, getLocale, useConfig } from '@sheinx/base';
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';

const Input = (props: {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onRef?: (ref: HTMLInputElement) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  focused?: boolean;
  disabled?: boolean;
}) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value, props.focused]);
  return (
    <input
      ref={props.onRef}
      className={props.className}
      placeholder={props.placeholder}
      autoComplete={'off'}
      value={value}
      disabled={props.disabled}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange(e.target.value);
      }}
      onMouseDown={props.onMouseDown}
    />
  );
};
interface ResultProps
  extends Pick<
    DatePickerProps<string>,
    'jssStyle' | 'type' | 'inputable' | 'range' | 'placeholder'
  > {
  focused: boolean;
  targetResultArr: Array<string | undefined>;
  resultArr: Array<string | undefined>;
  onChange: (value: string, index: number) => void;
  disabledLeft?: boolean;
  disabledRight?: boolean;
}
const Result = (props: ResultProps) => {
  const {
    jssStyle,
    type,
    inputable,
    focused,
    targetResultArr,
    resultArr,
    range,
    placeholder,
    onChange,
    disabledLeft,
    disabledRight,
  } = props;
  const { locale } = useConfig();

  const styles = jssStyle?.datePicker;
  const { current: context } = useRef<{ inputRefs: Array<HTMLDivElement>; clickIndex: number }>({
    inputRefs: [],
    clickIndex: 0,
  });

  useEffect(() => {
    if (focused) {
      context.inputRefs[context.clickIndex]?.focus();
    } else {
      context.inputRefs[0]?.blur();
      context.inputRefs[1]?.blur();
      context.clickIndex = 0;
    }
  }, [focused]);

  const getPlaceHolderArr: () => Array<string> = () => {
    if (Array.isArray(placeholder)) return placeholder;
    if (placeholder) return [placeholder];
    if (type === 'quarter') {
      const start = range ? getLocale(locale, 'startQuarter') : getLocale(locale, 'selectQuarter');
      const end = range ? getLocale(locale, 'endQuarter') : getLocale(locale, 'selectQuarter');
      return [start, end];
    }
    if (type === 'year') {
      const start = range ? getLocale(locale, 'startYear') : getLocale(locale, 'selectYear');
      const end = range ? getLocale(locale, 'endYear') : getLocale(locale, 'selectYear');
      return [start, end];
    }
    if (type === 'month') {
      const start = range ? getLocale(locale, 'startMonth') : getLocale(locale, 'selectMonth');
      const end = range ? getLocale(locale, 'endMonth') : getLocale(locale, 'selectMonth');
      return [start, end];
    }
    if (type === 'week') {
      const start = range ? getLocale(locale, 'startWeek') : getLocale(locale, 'selectWeek');
      const end = range ? getLocale(locale, 'endWeek') : getLocale(locale, 'selectWeek');
      return [start, end];
    }

    if (type === 'time') {
      const start = range ? getLocale(locale, 'startTime') : getLocale(locale, 'selectTime');
      const end = range ? getLocale(locale, 'endTime') : getLocale(locale, 'selectTime');
      return [start, end];
    }
    const start = range ? getLocale(locale, 'startDate') : getLocale(locale, 'selectDate');
    const end = range ? getLocale(locale, 'endDate') : getLocale(locale, 'selectDate');
    return [start, end];
  };

  const placeholderArr = getPlaceHolderArr();

  const renderItem = (info: {
    inputable?: boolean;
    target: string | undefined;
    value: string | undefined;
    place: string;
    index: number;
  }) => {
    const dis = info.index === 1 ? disabledRight : disabledLeft;
    if (info.inputable) {
      return (
        <Input
          key={info.index}
          onRef={(el) => {
            context.inputRefs[info.index] = el;
          }}
          disabled={dis}
          focused={focused}
          className={classNames(
            styles?.resultText,
            info.target && styles?.placeholder,
            dis && styles?.resultTextDisabled,
          )}
          value={info.target || info.value || ''}
          placeholder={info.place}
          onChange={(s) => {
            onChange(s, info.index);
          }}
          onMouseDown={() => {
            context.clickIndex = info.index;
          }}
        />
      );
    } else
      return (
        <div className={classNames(styles?.resultText, dis && styles?.resultTextDisabled)}>
          {(info.target && <span className={styles?.placeholder}>{info.target}</span>) ||
            info.value || <span className={styles?.placeholder}>{info.place}</span>}
        </div>
      );
  };

  return (
    <div className={styles?.resultTextWrapper}>
      {renderItem({
        inputable,
        target: targetResultArr[0],
        value: resultArr[0],
        place: placeholderArr[0],
        index: 0,
      })}
      {range && <div className={styles?.resultSeparator}>{'~'}</div>}
      {range &&
        renderItem({
          inputable,
          target: targetResultArr[1],
          value: resultArr[1],
          place: placeholderArr[1],
          index: 1,
        })}
    </div>
  );
};

export default Result;
