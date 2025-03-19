import { getLocale, useConfig } from '../config';
import { DatePickerProps } from './date-picker.type';
import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { FormFieldContext } from '../form/form-field-context';

export const Input = (props: {
  className?: string;
  value: string;
  placeholder?: string;
  style?: React.CSSProperties;
  maxLength?: number;
  onChange: (v: string) => void;
  onRef?: (ref: HTMLInputElement) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  open?: boolean;
  disabled?: boolean;
  inputRef?: React.MutableRefObject<
    | {
        updateValue?: React.Dispatch<React.SetStateAction<string>>;
      }
    | undefined
  >;
  onPaste?: (e: React.ClipboardEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onClick?: (e?: React.MouseEvent) => void;
  readOnly?: boolean;
}) => {
  const [value, setValue] = useState(props.value);

  const updateValue = () => {
    setValue(props.value);
  };

  if (props.inputRef) {
    props.inputRef.current = {
      updateValue: updateValue,
    };
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value, props.open]);
  return (
    <input
      ref={props.onRef}
      style={props.style}
      className={props.className}
      placeholder={props.placeholder}
      autoComplete={'off'}
      value={value}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      disabled={props.disabled}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      onPaste={props.onPaste}
      onClick={(e) => {
        e.currentTarget.focus();
        if (props.onClick) props.onClick(e);
      }}
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
  open: boolean;
  targetResultArr: Array<string | undefined>;
  resultArr: Array<string | undefined>;
  onChange: (value: string, index: number) => void;
  disabledLeft?: boolean;
  disabledRight?: boolean;
  activeIndex?: number;
  onRef: React.MutableRefObject<{
    inputRef: HTMLInputElement | null;
    inputRefs: (HTMLInputElement | null)[];
  }>;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  onClick?: (e?: React.MouseEvent) => void;
}
const Result = (props: ResultProps) => {
  const {
    jssStyle,
    type,
    inputable,
    focused,
    open,
    targetResultArr,
    resultArr,
    range,
    placeholder,
    onChange,
    onRef,
    disabledLeft,
    disabledRight,
    activeIndex = -1,
    onClick: onClickProps,
  } = props;
  const { locale } = useConfig();

  const { fieldId, separator } = useContext(FormFieldContext);

  const styles = jssStyle?.datePicker?.();
  const { current: context } = useRef<{ inputRefs: Array<HTMLDivElement>; clickIndex: number }>({
    inputRefs: [],
    clickIndex: 0,
  });
  const inputRef = useRef<{
    updateValue?: () => void;
  }>({});

  useEffect(() => {
    if (open) {
      if (context.inputRefs[activeIndex]) {
        context.inputRefs[activeIndex].focus();
      } else {
        context.inputRefs[context.clickIndex]?.focus();
      }
    }
  }, [open, activeIndex]);

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
    const className = classNames(
      styles?.resultText,
      info.target && styles?.placeholder,
      dis && styles?.resultTextDisabled,
      info.index === activeIndex && styles?.resultTextActive,
    );
    const formFieldId = fieldId?.split(separator) || [];
    const inputValue = info.target || info.value || ''
    const displayValue = props.type === 'week' && inputValue ? `${inputValue}${getLocale(locale, 'weekShort')}` : inputValue;
    return (
      <div className={className} id={formFieldId[info.index]}>
        <span className={styles?.resultTextPadding}>
          <Input
            key={info.index}
            onRef={(el) => {
              onRef.current.inputRef = el;
              onRef.current.inputRefs[info.index] = el;
              context.inputRefs[info.index] = el;
            }}
            disabled={dis && info.inputable}
            readOnly={!info.inputable}
            open={!!open}
            inputRef={inputRef}
            value={displayValue}
            placeholder={info.place}
            onChange={(s) => {
              onChange(s, info.index);
            }}
            onMouseDown={() => {
              context.clickIndex = info.index;
            }}
            onBlur={(e) => {
              e.stopPropagation();
              if (e.relatedTarget === context.inputRefs[1 - info.index]) return;
              props.onBlur?.(e);
              if (inputRef.current) inputRef.current.updateValue?.();
              context.clickIndex = 0;
            }}
            onFocus={(e) => {
              context.clickIndex = info.index;
              e.stopPropagation();
              if (focused) return;
              props.onFocus?.(e);
            }}
            onClick={onClickProps}
          />
        </span>
        <div className={styles?.resultTextBg}></div>
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
