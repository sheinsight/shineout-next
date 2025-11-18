import { useRef, useState } from 'react';

import { UseYearProps } from './use-year.type';
import { DatePickerAreaType } from './use-datepicker-format.type';
import utils from './util';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedYear?: number;
  cachedYears: Date[];
}

const useYear = (props: UseYearProps) => {
  const { options } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());

  const { current: context } = useRef<Context>({
    cachedYear: undefined,
    cachedYears: [],
  });

  const current = props.current === undefined ? currentState : props.current;

  const startYear = utils.getStartYear(current, options);

  const setCurrent = (date: Date, type?: DatePickerAreaType) => {
    if (props.current !== undefined) {
      props.onCurrentChange?.(date, type);
    } else {
      setCurrentState(date);
    }
    props.onCurrentChange?.(date, type);
  };

  const isNow = (date: Date) => {
    const today = utils.newDate(undefined, options);
    return utils.isSameYear(date, today, options);
  };

  const getYears = () => {
    if (!current) return context.cachedYears;
    if (context.cachedYear && context.cachedYear === startYear && context.cachedYears.length) {
      return context.cachedYears;
    }

    const startDate = utils.parse(`${startYear - 1}`, 'YYYY', options);
    context.cachedYear = startYear;
    context.cachedYears = Array.from({ length: 12 }).map((_, index) => {
      return utils.addYears(startDate, index, options);
    });

    return context.cachedYears;
  };

  const handleNext = usePersistFn(() => {
    const date = utils.addYears(current, 10, options);
    setCurrent(date, 'year');
  });

  const handlePrev = usePersistFn(() => {
    const date = utils.addYears(current, -10, options);
    setCurrent(date, 'year');
  });

  const isDisabled = (date: Date) => {
    const { min, max, disabled } = props;
    let isDis = disabled && typeof disabled === 'function' ? disabled(date) : false;
    if (min && utils.compareYear(date, min, 0, options) < 0) isDis = true;
    if (max && utils.compareYear(date, max, 0, options) > 0) isDis = true;
    return isDis;
  };

  const isActive = (date: Date) => {
    if (!props.value) return false;
    return utils.isSameYear(date, props.value, options);
  };

  const getYearStr = (date: Date) => {
    return utils.getDateInfo(date, 'year', options);
  };

  const handleYearClick = (date: Date, noClose?: boolean) => {
    if (isDisabled(date)) return;
    let newDate = utils.toDate(date);
    props.onChange?.(newDate, noClose);
    setCurrent(newDate);
  };

  const isInRange = (date: Date) => {
    const [start, end] = props.rangeDate || [];
    if (!start || !end) return false;
    const compareStart = dateUtil.compareYear(date, start, 0, options);
    const compareEnd = dateUtil.compareYear(date, end, 0, options);
    if (compareStart === 0 && compareEnd === 0) return 'start-end';
    if (compareStart === 0) return 'start';
    if (compareEnd === 0) return 'end';
    if (compareStart > 0 && compareEnd < 0) return 'in';
    return false;
  };

  const func = useLatestObj({
    handleNext,
    handlePrev,
    getYears,
    isNow,
    isDisabled,
    isActive,
    isInRange,
    handleYearClick,
    getYearStr,
  });

  const currentMonth = utils.getDateInfo(current, 'month', options) + 1;

  return {
    current,
    currentStart: startYear,
    currentEnd: startYear + 9,
    currentMonth,
    func,
  };
};

export default useYear;
