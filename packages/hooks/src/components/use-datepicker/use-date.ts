import { useRef, useState } from 'react';

import { UseDateProps } from './use-date.type';
import utils from './util';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedMonth?: Date;
  cachedDays: Date[];
}
const useDate = (props: UseDateProps) => {
  const { options, type } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());
  const { current: context } = useRef<Context>({
    cachedMonth: undefined,
    cachedDays: [],
  });

  const current = props.current === undefined ? currentState : props.current;

  const setCurrent = (date: Date) => {
    if (props.current !== undefined) {
      props.onCurrentChange?.(date);
    } else {
      setCurrentState(date);
    }
    props.onCurrentChange?.(date);
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

  const handleNextYear = usePersistFn(() => {
    const date = utils.addYears(current, 1, options);
    setCurrent(date);
  });

  const handlePrevYear = usePersistFn(() => {
    const date = utils.addYears(current, -1, options);
    setCurrent(date);
  });

  const handleNextMonth = usePersistFn(() => {
    const date = utils.addMonths(current, 1, options);
    setCurrent(date);
  });

  const handlePrevMonth = usePersistFn(() => {
    const date = utils.addMonths(current, -1, options);
    setCurrent(date);
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

  const handleDayClick = (date: Date) => {
    const { min, max } = props;
    if (isDisabled(date)) return;

    // set hour minute second
    const timeDate =
      props.value ||
      (props.defaultTime && utils.cloneTime(date, props.defaultTime, utils.TIME_FORMAT, options));

    let newDate = utils.toDate(date);
    if (timeDate) {
      newDate = utils.setTime(newDate, timeDate, options);
    }
    // only can select day with the same day of min/max
    if (min && utils.compareAsc(newDate, min) < 0) newDate = utils.setTime(newDate, min, options);
    if (max && utils.compareAsc(newDate, max) > 0) newDate = utils.setTime(newDate, max, options);
    props.onChange?.(newDate);
    setCurrent(newDate);
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
