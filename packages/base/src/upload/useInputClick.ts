import { useRef } from 'react';

export const useInputClick = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { current: context } = useRef({ lock: false });
  const inputProps = {
    ref: inputRef,
    type: 'file',
    style: { display: 'none' },
    onClick: (event: React.MouseEvent) => {
      // 阻止程序化触发(inputRef.current.click())的input点击事件冒泡
      event.stopPropagation();
    },
  };
  const wrapperProps = {
    onClick: () => {
      if (context.lock) return;
      if (inputRef.current) {
        context.lock = true;
        inputRef.current.value = '';
        inputRef.current.click();
        setTimeout(() => {
          context.lock = false;
        }, 1000);
      }
    },
  };
  return {
    inputProps,
    wrapperProps,
  };
};
