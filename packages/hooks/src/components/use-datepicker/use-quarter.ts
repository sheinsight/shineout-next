import { useRef, useState } from 'react';

import { UseMonthProps } from './use-month.type';
import { DatePickerAreaType } from './use-datepicker-format.type';
import utils from './util';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedYear?: Date;
  cachedQuarters: Date[];
  currentStart: string;
  currentEnd: string;
}

const useQuarter = (props: UseMonthProps) => {
  const { options } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());

  const { current: context } = useRef<Context>({
    cachedYear: undefined,
    cachedQuarters: [],
    currentStart: '',
    currentEnd: '',
  });

  const current = props.current === undefined ? currentState : props.current;
  const startYear = utils.getDateInfo(current, 'year', options);

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
    return utils.isSameQuarter(date, today, options);
  };

  const getQuarters = () => {
    if (!current) return context.cachedQuarters;
    if (
      context.cachedYear &&
      utils.isSameYear(context.cachedYear, current, options) &&
      context.cachedQuarters.length
    ) {
      return context.cachedQuarters;
    }

    context.cachedYear = current;
    context.cachedQuarters = Array.from({ length: 4 }).map((_, index) => {
      return utils.parse(`${startYear}-Q${index + 1}`, 'YYYY-[Q]Q', options);
    });

    return context.cachedQuarters;
  };

  const handleNext = usePersistFn(() => {
    const date = utils.addYears(current, 1, options);
    setCurrent(date, 'year');
  });

  const handlePrev = usePersistFn(() => {
    const date = utils.addYears(current, -1, options);
    setCurrent(date, 'year');
  });

  const isDisabled = (date: Date) => {
    const { min, max, disabled } = props;
    let isDis = disabled && typeof disabled === 'function' ? disabled(date) : false;
    if (min && utils.compareQuarter(date, min, 0, options) < 0) isDis = true;
    if (max && utils.compareQuarter(date, max, 0, options) > 0) isDis = true;
    return isDis;
  };

  const isActive = (date: Date) => {
    if (!props.value) return false;
    return utils.isSameQuarter(date, props.value, options);
  };

  const getQuarterStr = (date: Date) => {
    return utils.getDateInfo(date, 'quarter', options);
  };

  const handleQuarterClick = (date: Date, noClose?: boolean) => {
    if (isDisabled(date)) return;
    let newDate = utils.toDate(date);
    props.onChange?.(newDate, noClose);
    setCurrent(newDate);
  };

  const isInRange = (date: Date) => {
    const [start, end] = props.rangeDate || [];
    if (!start || !end) return false;
    const compareStart = dateUtil.compareQuarter(date, start, 0, options);
    const compareEnd = dateUtil.compareQuarter(date, end, 0, options);
    if (compareStart === 0 && compareEnd === 0) return 'start-end';
    if (compareStart === 0) return 'start';
    if (compareEnd === 0) return 'end';
    if (compareStart > 0 && compareEnd < 0) return 'in';
    return false;
  };

  const func = useLatestObj({
    handleNext,
    handlePrev,
    getQuarters,
    isNow,
    isDisabled,
    isActive,
    isInRange,
    handleQuarterClick,
    getQuarterStr,
  });

  return {
    current,
    currentYear: `${startYear}`,
    func,
  };
};

export default useQuarter;
