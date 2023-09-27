import { UseTimeProps } from './use-time.type';
import useLatestObj from '../../common/use-latest-obj';
import dateUtil from './util';

type TimeType = 'H' | 'h' | 'm' | 's' | 'ampm';
const useTime = (props: UseTimeProps) => {
  const { options, min: mi, max: ma, format, hourStep = 1, minuteStep = 1, secondStep = 1 } = props;

  const min = dateUtil.resetTimeByFormat(mi, format, options);
  const max = dateUtil.resetTimeByFormat(ma, format, options);

  const current = props.value || dateUtil.newDate(undefined, options);

  const getStepIndex = (index: number, step: number) => Math.floor(index / step);

  const time = {
    hour: dateUtil.getDateInfo(current, 'hour', options),
    minute: dateUtil.getDateInfo(current, 'minute', options),
    second: dateUtil.getDateInfo(current, 'second', options),
    apm: '',
  };

  if (format.indexOf('h') >= 0) {
    if (time.hour >= 12) {
      time.hour -= 12;
      time.apm = 'pm';
    } else {
      time.apm = 'am';
    }
  }

  const isDisabled = (date: Date) => {
    const { disabled, disabledTime } = props;
    if (disabledTime) {
      const time = dateUtil.format(date, dateUtil.TIME_FORMAT, options);
      if (typeof disabledTime === 'function') return disabledTime(time);
      return disabledTime === time;
    }
    let isDis = disabled && typeof disabled === 'function' ? disabled(date) : false;
    if (min && dateUtil.compareAsc(date, min) < 0) isDis = true;
    if (max && dateUtil.compareAsc(date, max) > 0) isDis = true;
    return isDis;
  };

  const getTargetDate = (type: TimeType, target: number) => {
    let date = new Date(current.getTime());
    switch (type) {
      case 'H':
        date = dateUtil.changeDate(date, 'hour', target, options);
        break;
      case 'h':
        if (dateUtil.getDateInfo(date, 'hour', options) >= 12) {
          date = dateUtil.changeDate(date, 'hour', target + 12, options);
          break;
        }
        date = dateUtil.changeDate(date, 'hour', target, options);
        break;
      case 'm':
        date = dateUtil.changeDate(date, 'minute', target, options);
        break;
      case 's':
        date = dateUtil.changeDate(date, 'second', target, options);
        break;
      case 'ampm':
        {
          const hours = dateUtil.getDateInfo(date, 'hour', options);
          if (target === 1 && hours < 12) {
            date = dateUtil.changeDate(date, 'hour', hours + 12, options);
          } else if (target === 0 && hours >= 12) {
            date = dateUtil.changeDate(date, 'hour', hours - 12, options);
          }
        }
        break;
      default:
        break;
    }
    return date;
  };

  const handleChange = (date: Date) => {
    if (isDisabled(date)) return;
    props.onChange?.(date);
  };

  const getModeArr = (mode: TimeType, total: number) => {
    let step = 1;
    if (mode === 'H' || mode === 'h') step = hourStep;
    if (mode === 'm') step = minuteStep;
    if (mode === 's') step = secondStep;
    return Array.from({ length: total })
      .map((_, index) => {
        if (index % step !== 0) return null;
        const date = getTargetDate(mode, index);
        let str = index < 10 ? `0${index}` : `${index}`;
        if (mode === 'h' && str === '00') str = '12';
        if (mode === 'ampm') str = index === 0 ? 'am' : 'pm';
        return {
          str,
          date,
          disabled: isDisabled(date),
        };
      })
      .filter((item) => item) as Array<{ str: string; date: Date; disabled: boolean }>;
  };

  const getTimes = () => {
    const res = [];
    if (format.indexOf('H') >= 0) {
      res.push({
        mode: 'H',
        times: getModeArr('H', 24),
        currentIndex: getStepIndex(time.hour, hourStep),
      });
    }
    if (format.indexOf('h') >= 0) {
      res.push({
        mode: 'h',
        times: getModeArr('h', 12),
        currentIndex: getStepIndex(time.hour, hourStep),
      });
    }
    if (format.indexOf('m') >= 0) {
      res.push({
        mode: 'm',
        times: getModeArr('m', 60),
        currentIndex: getStepIndex(time.minute, minuteStep),
      });
    }
    if (format.indexOf('s') >= 0) {
      res.push({
        mode: 's',
        times: getModeArr('s', 60),
        currentIndex: getStepIndex(time.second, secondStep),
      });
    }
    if (/a|A/.test(format)) {
      res.push({
        mode: 'ampm',
        times: getModeArr('ampm', 2),
        currentIndex: time.apm === 'pm' ? 1 : 0,
      });
    }
    return res;
  };

  const func = useLatestObj({
    handleChange,
    isDisabled,
  });
  const times = getTimes();

  return {
    times,
    func,
  };
};

export default useTime;
