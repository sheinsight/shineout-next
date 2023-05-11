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
