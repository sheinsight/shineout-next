import React, { useEffect, useRef } from 'react';
import { TimeProps } from './time.type';
import { usePersistFn, useResize, useTimePick } from '@sheinx/hooks';
import classNames from 'classnames';
import Button from '../button';
import { getLocale, useConfig } from '@sheinx/base';
import PickerTitle from './pickerTitle';

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
  const { height } = useResize({ targetRef: elRef });

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

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [height]);

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
  const { locale } = useConfig();
  const onChange = usePersistFn((date) => {
    props.setCurrent(date, 'time');
    props.onChange(date, true);
  });

  const selNow = () => {
    onChange(new Date());
  };
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

  props.registerModeDisabled(props.position, 'time', func.isDisabled);

  const renderFooter = () => {
    const showRight = props.showSelNow;

    if (!showRight) return null;
    return (
      <div className={styles?.pickerFooter}>
        {showRight && (
          <div className={styles?.pickerFooterRight}>
            <Button
              size={'small'}
              jssStyle={props.jssStyle}
              className={styles?.pickerFooterBtn}
              onClick={selNow}
            >
              {getLocale(locale, 'current')}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(styles?.timePicker, styles?.picker)}
    >
      {props.showTitle && <PickerTitle position={props.position} jssStyle={props.jssStyle} />}
      <div className={styles?.pickerBody}>
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
      {renderFooter()}
    </div>
  );
};

export default Time;
