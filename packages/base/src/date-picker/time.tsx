import React, { useEffect, useRef } from 'react';
import { TimeProps } from './time.type';
import { useTimePick, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';

const TimeScroll = (props: {
  mode: string;
  jssStyle: TimeProps['jssStyle'];
  times: {
    str: string;
    date: Date;
    disabled: boolean;
  }[];
  currentIndex: number;
  onChange: (date: Date) => void;
}) => {
  const { mode, jssStyle, times, currentIndex, onChange } = props;
  const styles = jssStyle?.datePicker;
  const elRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef<{ timer: NodeJS.Timer | null }>({ timer: null });

  const scrollToIndex = (index: number) => {
    if (context.timer) clearTimeout(context.timer);
    context.timer = setTimeout(() => {
      const el = elRef.current;
      if (!el) return;
      const lineHeight = (el.childNodes[0] as HTMLDivElement).clientHeight;
      el.scrollTop = lineHeight * index;
    }, 30);
  };

  const changeToIndex = (index: number) => {
    if (!times[index] || times[index].disabled || index === currentIndex) {
      return;
    }
    onChange(times[index].date);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget as HTMLDivElement;
    const lineHeight = (el.childNodes[0] as HTMLDivElement).clientHeight;
    const index = Math.round(el.scrollTop / lineHeight);
    changeToIndex(index);
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div
      key={mode}
      className={styles?.timeList}
      ref={elRef}
      onScroll={(e) => {
        handleScroll(e);
      }}
      onMouseLeave={() => {
        scrollToIndex(currentIndex);
      }}
    >
      {times.map((item, index) => {
        return (
          <div
            onClick={() => {
              changeToIndex(index);
            }}
            className={classNames(
              styles?.timeItem,
              index === currentIndex && styles?.timeItemActive,
              item.disabled && styles?.timeItemDisabled,
            )}
            key={index}
          >
            <span>{item.str}</span>
          </div>
        );
      })}
    </div>
  );
};

const Time = (props: TimeProps) => {
  const styles = props.jssStyle?.datePicker;
  const onChange = usePersistFn((date) => {
    props.onChange(date, true);
    props.setCurrent(date);
  });
  const { func, times } = useTimePick({
    format: props.format,
    options: props.options,
    value: props.value,
    onChange,
    min: props.min,
    max: props.max,
    disabled: props.disabled,
    disabledTime: props.disabledTime,
    hourStep: props.hourStep,
    minuteStep: props.minuteStep,
    secondStep: props.secondStep,
  });

  return (
    <div className={styles?.timePicker}>
      <div className={styles?.timeBase}>
        {times.map((item) => {
          return <div className={styles?.timeBaseItem} key={item.mode} />;
        })}
      </div>
      {times.map((item) => {
        return (
          <TimeScroll
            key={item.mode}
            mode={item.mode}
            jssStyle={props.jssStyle}
            times={item.times}
            currentIndex={item.currentIndex}
            onChange={func.handleChange}
          />
        );
      })}
    </div>
  );
};

export default Time;
