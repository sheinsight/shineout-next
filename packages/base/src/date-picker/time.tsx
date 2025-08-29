import React, { useEffect, useRef } from 'react';
import { TimeProps } from './time.type';
import { usePersistFn, useResize, useTimePick } from '@sheinx/hooks';
import classNames from 'classnames';
import Link from '../link';
import { getLocale, useConfig } from '../config';
import PickerTitle from './pickerTitle';
import Confirm from './confirm';

type TimeType = 'H' | 'h' | 'm' | 's' | 'ampm';

const TimeScroll = (props: {
  mode: TimeType;
  jssStyle: TimeProps['jssStyle'];
  times: {
    str: string;
    date: Date;
    disabled: boolean;
  }[];
  currentIndex: number;
  isEmpty?: boolean;
  onChange: (date: Date) => void;
}) => {
  const { mode, jssStyle, times, currentIndex, onChange } = props;
  const styles = jssStyle?.datePicker?.();
  const elRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef<{
    changeTimer: NodeJS.Timer | null;
    timer: NodeJS.Timer | null;
    controlScroll: boolean;
  }>({
    timer: null,
    changeTimer: null,
    controlScroll: false,
  });
  const { height } = useResize({ targetRef: elRef });

  const scrollToIndex = (index: number, immudiate?: boolean) => {
    if (context.timer) clearTimeout(context.timer);
    context.timer = setTimeout(
      () => {
        const el = elRef.current;
        if (!el) return;
        const lineHeight = (el.childNodes[0] as HTMLDivElement).clientHeight;
        context.controlScroll = true;
        el.scrollTop = lineHeight * index;
      },
      immudiate ? 0 : 30,
    );
  };

  const changeToIndex = (index: number) => {
    if (!times[index] || times[index].disabled || (index === currentIndex && !props.isEmpty)) {
      return;
    }
    onChange(times[index].date);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (context.changeTimer) clearTimeout(context.changeTimer);
    const el = e.currentTarget as HTMLDivElement;
    if (context.controlScroll) {
      context.controlScroll = false;
      return;
    }
    context.changeTimer = setTimeout(() => {
      if (!el) return;
      const lineHeight = (el.childNodes[0] as HTMLDivElement).clientHeight;
      const index = Math.round(el.scrollTop / lineHeight);
      changeToIndex(index);
      scrollToIndex(index);
    }, 50);
  };

  useEffect(() => {
    scrollToIndex(currentIndex, true);
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex, true);
  }, [height]);

  return (
    <div
      key={mode}
      className={styles?.timeList}
      ref={elRef}
      onScroll={(e) => {
        handleScroll(e);
      }}
    >
      {times.map((item, index) => {
        return (
          <div key={index} className={styles?.timeItemBox}>
            <div
              onClick={() => {
                changeToIndex(index);
              }}
              className={classNames(
                styles?.timeItem,
                index === currentIndex && styles?.timeItemActive,
                item.disabled && styles?.timeItemDisabled,
              )}
            >
              <span>{item.str}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Time = (props: TimeProps) => {
  const styles = props.jssStyle?.datePicker?.();
  const { locale, direction } = useConfig();
  const onChange = usePersistFn((date) => {
    props.setCurrent(date, 'time');
    props.onChange(date, true);
  });
  const { func, times } = useTimePick({
    format: props.format,
    options: props.options,
    value: props.value,
    onChange,
    min: props.min,
    max: props.max,
    staticMin: props.staticMin,
    staticMax: props.staticMax,
    disabled: props.disabled,
    disabledTime: props.disabledTime,
    hourStep: props.hourStep,
    minuteStep: props.minuteStep,
    secondStep: props.secondStep,
    position: props.position,
    rangeDate: props.rangeDate,
    defaultTime: props.defaultTime,
  });

  const selNow = () => {
    if (func.isDisabled(new Date())) return;
    onChange(new Date());
  };

  props.registerModeDisabled(props.position, 'time', func.isDisabled);

  const renderFooter = () => {
    const showRight = props.showSelNow;

    if (!showRight) return null;
    return (
      <div
        className={styles?.pickerFooter}
        dir={direction}
        style={{ borderTop: props.needConfirm && props.range ? 'none' : '' }}
      >
        {showRight && (
          <div className={styles?.pickerFooterNow}>
            <Link
              size={'small'}
              type='primary'
              jssStyle={props.jssStyle}
              className={styles?.pickerFooterBtn}
              onClick={selNow}
            >
              {getLocale(locale, 'current')}
            </Link>
          </div>
        )}

        {props.needConfirm && !props.range && (
          <Confirm closeByConfirm={props.closeByConfirm} jssStyle={props.jssStyle} />
        )}
      </div>
    );
  };

  const shouldRenderTimes = times && times.length > 0;

  return (
    <div
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={classNames(styles?.timePicker, styles?.picker)}
      dir={direction}
    >
      {props.showTitle && <PickerTitle position={props.position} jssStyle={props.jssStyle} />}
      {shouldRenderTimes && (
        <div className={styles?.pickerBody}>
          {times.map((item) => {
            return (
              <TimeScroll
                key={item.mode}
                mode={item.mode}
                jssStyle={props.jssStyle}
                times={item.times}
                currentIndex={item.currentIndex}
                isEmpty={props.value === null || props.value === undefined}
                onChange={func.handleChange}
              />
            );
          })}
        </div>
      )}
      {renderFooter()}
    </div>
  );
};

export default Time;
