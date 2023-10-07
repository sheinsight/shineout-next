import { useEffect, useState } from 'react';
import { addResizeObserver } from '../../utils/dom/element';

interface UseResizeProps {
  targetRef: {
    current: HTMLElement | null;
  };
}
export const useResize = (props: UseResizeProps) => {
  const { targetRef } = props;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!targetRef.current) return;
    const el = targetRef.current;
    if (el) {
      setWidth(el.clientWidth);
      setHeight(el.clientHeight);
    }
    const clean = addResizeObserver(
      el,
      (entry: { contentRect: { width: number; height: number } }[]) => {
        const { width, height } = entry[0].contentRect;
        setWidth(width);
        setHeight(height);
      },
      {
        timer: 100,
        direction: false,
      },
    );
    return () => {
      if (clean) clean();
    };
  }, [targetRef.current]);
  return { width, height };
};

export default useResize;
