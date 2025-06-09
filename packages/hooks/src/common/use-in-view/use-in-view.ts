import { useEffect, useRef, useState } from 'react';
import { isScrollable } from '../../utils/dom';

type ElementType = HTMLElement;

interface UseInViewOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean; // 是否只触发一次
}

const useInView = <T extends ElementType>(options: UseInViewOptions = {}) => {
  const elementRef = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [wasInView, setWasInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof window === 'undefined' || !window.IntersectionObserver){
      setIsInView(true);
      setWasInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView) {
          setWasInView(true);
          // 如果设置了 once 选项，且元素已经出现过，则取消观察
          if (options.once) {
            observer.disconnect();
          }
        }
      },
      {
        root: options.root && isScrollable(options.root) ? options.root : null,
        rootMargin: options.rootMargin || '0px',
        threshold: options.threshold || 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.root, options.rootMargin, options.threshold, options.once]);

  return { ref: elementRef, isInView, wasInView };
};

export default useInView;

// 使用示例
// const Example = () => {
//   const { ref, isInView } = useInView({
//     threshold: 0.5,
//     rootMargin: '50px',
//     once: true
//   });

//   return (
//     <div ref={ref}>
//       {isInView ? '元素在视窗中' : '元素不在视窗中'}
//     </div>
//   );
// };
