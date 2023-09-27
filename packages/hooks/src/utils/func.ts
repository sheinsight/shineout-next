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

// 防抖函数
export const debounce = (handler: any, timer?: number) => {
  const that: {
    timer?: NodeJS.Timeout | null;
  } = {};

  const cleanTimer = () => {
    if (that.timer) {
      clearTimeout(that.timer);
      that.timer = null;
    }
  };

  if (!timer) return [handler, cleanTimer];

  return [
    (...args: any) => {
      cleanTimer();
      that.timer = setTimeout(() => {
        handler(...args);
      }, timer);
    },
    cleanTimer,
  ];
};
