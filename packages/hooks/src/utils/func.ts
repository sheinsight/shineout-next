// 节流函数
export const throttle = function <T extends any[]>(func: (...args: T) => any, wait?: number) {
  const that: {
    lock?: boolean;
  } = { lock: false };
  if (!wait)
    return (...args: T) => {
      if (that.lock) return;
      that.lock = true;
      func(...args);
      setTimeout(() => {
        that.lock = false;
      }, wait);
    };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = function <T extends (...args: any) => void>(func: T, delay?: number) {
  const that: {
    timer?: NodeJS.Timeout | null;
  } = {};
  const cleanTimer = () => {
    if (that.timer) {
      clearTimeout(that.timer);
      that.timer = null;
    }
  };
  if (!delay) return [func, cleanTimer];
  return [
    ((...args: any) => {
      cleanTimer();
      that.timer = setTimeout(() => {
        func(...args);
      }, delay);
    }) as unknown as T,
    cleanTimer,
  ];
};
