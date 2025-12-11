import { useEffect, useRef, useState } from 'react';

import { UseDateProps } from './use-date.type';
import { DatePickerAreaType } from './use-datepicker-format.type';
import utils from './util';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedMonth?: Date;
  cachedDays: Date[];
}
const useDate = (props: UseDateProps) => {
  const { options, position, type } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());
  const { current: context } = useRef<Context>({
    cachedMonth: undefined,
    cachedDays: [],
  });

  const current = props.current === undefined || !props.current ? currentState : props.current;
  const setCurrent = (date: Date, type?: DatePickerAreaType) => {
    if (props.current !== undefined) {
      props.onCurrentChange?.(date, type);
    } else {
      if (date) {
        setCurrentState(date);
      }
    }
    props.onCurrentChange?.(date, type);
  };

  const isToday = (date: Date) => {
    const today = utils.newDate(undefined, options);
    return utils.isSameDay(date, today, options);
  };

  const getDays = () => {
    if (!current) return context.cachedDays;
    const date = utils.clearHMS(current, options);
    if (
      context.cachedMonth &&
      utils.isSameMonth(context.cachedMonth, date, options) &&
      context.cachedDays.length
    ) {
      return context.cachedDays;
    }
    context.cachedDays = utils.getDaysOfMonth(date, options);
    context.cachedMonth = date;

    return context.cachedDays;
  };

  useEffect(() => {
    // 当weekStartsOn从0变为1时，需要清空context.cachedDays, 否则会显示不正确的星期顺序
    context.cachedDays = [];
  }, [options.weekStartsOn]);

  const handleNextYear = usePersistFn(() => {
    const date = utils.addYears(current, 1, options);
    setCurrent(date, 'year');
  });

  const handlePrevYear = usePersistFn(() => {
    const date = utils.addYears(current, -1, options);
    setCurrent(date, 'year');
  });

  const handleNextMonth = usePersistFn(() => {
    const date = utils.addMonths(current, 1, options);
    setCurrent(date, 'month');
  });

  const handlePrevMonth = usePersistFn(() => {
    const date = utils.addMonths(current, -1, options);
    setCurrent(date, 'month');
  });

  const isCurrentMonth = (date: Date) => {
    return utils.isSameMonth(date, current, options);
  };

  const isDisabled = (date: Date) => {
    const { min, max, disabled } = props;
    let isDis = disabled && typeof disabled === 'function' ? disabled(date) : false;

    if (type === 'week') {
      // 选择周
      if (min && utils.compareWeek(date, min, 0, options) < 0) isDis = true;
      if (max && utils.compareWeek(date, max, 0, options) > 0) isDis = true;
    } else if (
      (min && utils.compareDay(date, min, 0, options) < 0) ||
      (max && utils.compareDay(date, max, 0, options) > 0)
    ) {
      isDis = true;
    }

    return isDis;
  };

  const isActive = (date: Date) => {
    if (!props.value) return false;
    if (type === 'week') {
      return utils.isSameWeek(date, props.value, options);
    }
    return utils.isSameDay(date, props.value, options);
  };

  const getDayStr = (date: Date) => {
    return utils.getDateInfo(date, 'date', options);
  };

  const getWeekStr = (date: Date) => {
    return utils.getDateInfo(date, 'week', options);
  };

  const getDateWithTime = (date: Date) => {
    return utils.getDateWithTime(
      date,
      props.value,
      props.defaultTime,
      props.min,
      props.max,
      options,
    );
  };

  const handleDayClick = (date: Date, noClose?: boolean) => {
    if (isDisabled(date)) return;

    let newDate: Date | string = getDateWithTime(date);
    const index = position === 'start' ? 0 : 1;
    if (
      props.allowSingle &&
      props.rangeDate &&
      Array.isArray(props.rangeDate) &&
      props.rangeDate[index] &&
      utils.clearHMS(newDate, options).getTime() ===
        utils.clearHMS(props.rangeDate[index] as Date, options).getTime()
    ) {
      newDate = '';
    }

    props?.onClearInputArr(index);
    props.onChange?.(newDate, noClose);
    if (newDate) {
      setCurrent(newDate as Date);
    }
  };

  const getTimeStr = () => {
    let { format, type } = props;
    if (type !== 'datetime' || !format) return '';
    if (/^[X|x]$/.test(utils.compatibleFmt(format)!)) {
      format = 'HH:mm:ss';
    } else {
      const match = format.match(/[H|h].*/);
      // eslint-disable-next-line
      if (match) format = match[0];
    }

    // 当不存在 props.value 时,根据 format 格式返回默认时间字符串
    if (!props.value) {
      return format
        .replace(/[Hh]+/g, '00')  // HH/hh -> 00
        .replace(/m+/g, '00')     // mm -> 00
        .replace(/s+/g, '00')     // ss -> 00
        .replace(/S+/g, '0')      // SSS -> 0
        .replace(/A/g, 'AM')      // A -> AM
        .replace(/a/g, 'am');     // a -> am
    }

    return dateUtil.format(props.value, format, options);
  };

  const isInRange = (date: Date) => {
    let [start, end] = props.rangeDate || [];
    if (!start || !end) return false;
    if (type === 'week') {
      if (start) {
        start = dateUtil.changeDate(start, 'weekday', 0, options);
      }
      if (end) {
        end = dateUtil.changeDate(end, 'weekday', 6, options);
      }
    }
    const compareStart = dateUtil.compareDay(date, start, 0, options);
    const compareEnd = dateUtil.compareDay(date, end, 0, options);
    if (compareStart === 0 && compareEnd === 0) return 'start-end';
    if (compareStart === 0) return 'start';
    if (compareEnd === 0) return 'end';
    if (compareStart > 0 && compareEnd < 0) return 'in';
    return false;
  };

  const func = useLatestObj({
    handleNextYear,
    handleNextMonth,
    handlePrevYear,
    handlePrevMonth,
    getDays,
    isToday,
    isDisabled,
    isActive,
    isInRange,
    isCurrentMonth,
    handleDayClick,
    getDayStr,
    getWeekStr,
    getTimeStr,
    getDateWithTime,
  });

  const currentYear = utils.getDateInfo(current, 'year', options);
  const currentMonth = utils.getDateInfo(current, 'month', options) + 1;

  return {
    current,
    currentYear,
    currentMonth,
    func,
  };
};

export default useDate;
