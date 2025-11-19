import { useRef, useState } from 'react';

import { UseMonthProps } from './use-month.type';
import { DatePickerAreaType } from './use-datepicker-format.type';
import utils from './util';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';
import usePersistFn from '../../common/use-persist-fn';

interface Context {
  cachedYear?: Date;
  cachedMonths: Date[];
  currentStart: string;
  currentEnd: string;
}

const useMonth = (props: UseMonthProps) => {
  const { options } = props;
  const [currentState, setCurrentState] = useState(props.defaultCurrent || new Date());

  const { current: context } = useRef<Context>({
    cachedYear: undefined,
    cachedMonths: [],
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
    return utils.isSameMonth(date, today, options);
  };

  const getMonths = () => {
    if (!current) return context.cachedMonths;
    if (
      context.cachedYear &&
      utils.isSameYear(context.cachedYear, current, options) &&
      context.cachedMonths.length
    ) {
      return context.cachedMonths;
    }

    const startDate = utils.parse(`${startYear}-01`, 'YYYY-MM', options);
    context.cachedYear = current;
    context.cachedMonths = Array.from({ length: 12 }).map((_, index) => {
      return utils.addMonths(startDate, index, options);
    });

    return context.cachedMonths;
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
    if (min && utils.compareMonth(date, min, 0, options) < 0) isDis = true;
    if (max && utils.compareMonth(date, max, 0, options) > 0) isDis = true;
    return isDis;
  };

  const isActive = (date: Date) => {
    if (!props.value) return false;
    return utils.isSameMonth(date, props.value, options);
  };

  const getMonthStr = (date: Date) => {
    return utils.getDateInfo(date, 'month', options) + 1;
  };

  const handleMonthClick = (date: Date, onClose?:boolean) => {
    if (isDisabled(date)) return;
    let newDate = utils.toDate(date);
    props.onChange?.(newDate, onClose);
    setCurrent(newDate);
  };

  const isInRange = (date: Date) => {
    const [start, end] = props.rangeDate || [];
    if (!start || !end) return false;
    const compareStart = dateUtil.compareMonth(date, start, 0, options);
    const compareEnd = dateUtil.compareMonth(date, end, 0, options);
    if (compareStart === 0 && compareEnd === 0) return 'start-end';
    if (compareStart === 0) return 'start';
    if (compareEnd === 0) return 'end';
    if (compareStart > 0 && compareEnd < 0) return 'in';
    return false;
  };

  const func = useLatestObj({
    handleNext,
    handlePrev,
    getMonths,
    isNow,
    isDisabled,
    isActive,
    isInRange,
    handleMonthClick,
    getMonthStr,
  });

  return {
    current,
    currentYear: `${startYear}`,
    func,
  };
};

export default useMonth;
