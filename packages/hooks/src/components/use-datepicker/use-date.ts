import { useRef, useState } from 'react';

import { UseDateProps } from './use-date.type';
import utils from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedDate?: Date;
  cachedDays?: Date[];
}
const useDate = (props: UseDateProps) => {
  const { options, type } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());

  const { current: context } = useRef<Context>({
    cachedDate: undefined,
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
    if (!current) return context.cachedDate;
    const date = utils.clearHMS(current, options);
    if (
      context.cachedDate &&
      utils.isSameMonth(context.cachedDate, date, options) &&
      context.cachedDays
    ) {
      return context.cachedDays;
    }
    context.cachedDays = utils.getDaysOfMonth(date, options);
    context.cachedDate = date;

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

  const handleDayClick = usePersistFn((date: Date) => {
    const { min, max } = props;
    if (isDisabled(date)) return;
    let newDate: Date | string = utils.setTime(utils.toDate(date), current, options);
    // only can select day with the same day of min/max
    if (min && utils.compareAsc(newDate, min) < 0) newDate = utils.setTime(newDate, min, options);
    if (max && utils.compareAsc(newDate, max) > 0) newDate = utils.setTime(newDate, max, options);
    setCurrent(newDate);
    props.onChange?.(date);
  });

  return {
    current,
    func: {
      handleNextYear,
      handleNextMonth,
      handlePrevYear,
      handlePrevMonth,
      getDays,
      isToday,
      isDisabled,
      isActive,
      isCurrentMonth,
      handleDayClick,
      getDayStr,
    },
  };
};

export default useDate;
