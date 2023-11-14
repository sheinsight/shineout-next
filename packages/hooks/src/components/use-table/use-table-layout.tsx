import React, { useEffect, useRef, useLayoutEffect } from 'react';
import useLatestObj from '../../common/use-latest-obj';
import usePersistFn from '../../common/use-persist-fn';
import { addResizeObserver } from '../../utils/dom/element';

function setElScrollLeft(target: HTMLElement | null, scrollLeft: number) {
  if (target && target.scrollLeft !== scrollLeft) target.scrollLeft = scrollLeft;
}

const useTableLayout = (props: {
  theadRef: React.RefObject<HTMLElement>;
  tbodyRef: React.RefObject<HTMLElement>;
  tfootRef: React.RefObject<HTMLElement>;
}) => {
  const { theadRef, tbodyRef, tfootRef } = props;
  const { current: context } = useRef({ checkNum: 0 });
  const [isScrollX, setIsScrollX] = React.useState(false);
  const [isScrollY, setIsScrollY] = React.useState(false);
  const [floatLeft, setFloatLeft] = React.useState(false);
  const [floatRight, setFloatRight] = React.useState(false);
  const [scrollBarWidth, setScrollBarWidth] = React.useState(0);
  const [colgroup, setColgroup] = React.useState<number[] | false>(false);

  const checkScroll = usePersistFn(() => {
    const tbody = tbodyRef.current;
    if (!tbody) return;
    if (context.checkNum > 10) {
      // 防止死循环
      setIsScrollY(true);
      return;
    }
    const overHeight = tbody.scrollHeight > tbody.clientHeight;
    const overWidth = tbody.scrollWidth > tbody.clientWidth;

    const newScrollBarWidth = overHeight ? tbody.offsetWidth - tbody.clientWidth : 0;
    if (newScrollBarWidth !== scrollBarWidth) setScrollBarWidth(newScrollBarWidth);

    if (overWidth !== isScrollX) setIsScrollX(overWidth);
    if (overHeight !== isScrollY) setIsScrollY(overHeight);
    context.checkNum += 1;
    setTimeout(() => {
      context.checkNum = 0;
    });
  });

  const resetColGroup = usePersistFn(() => {
    setColgroup(false);
  });

  const getColgroup = usePersistFn(() => {
    if (!tbodyRef.current) return;
    const tr = tbodyRef.current.querySelector('colgroup');
    if (!tr) return;
    const tds = tr.querySelectorAll('col');

    const colgroup: number[] = [];
    for (let i = 0, count = tds.length; i < count; i++) {
      const { width } = tds[i].getBoundingClientRect();
      colgroup.push(width);
    }
    setColgroup(colgroup);
  });

  const checkFloat = usePersistFn(() => {
    const tbody = tbodyRef.current!;
    const max = tbody.scrollWidth - tbody.clientWidth;
    const min = 0;
    const left = tbody.scrollLeft;
    setFloatRight(left !== max);
    setFloatLeft(left !== min);
  });

  const setScrollLeft = usePersistFn((num: number) => {
    const tbody = tbodyRef.current!;
    const max = tbody.scrollWidth - tbody.clientWidth;
    const min = 0;

    const left = Math.min(Math.max(num, min), max);

    setElScrollLeft(theadRef.current!, left);
    setElScrollLeft(tbody, left);
    setElScrollLeft(tfootRef.current!, left);
    checkFloat();
  });

  const handleResize = usePersistFn(() => {
    checkScroll();
    checkFloat();
    getColgroup();
  });

  const func = useLatestObj({
    scrollCheck: checkScroll,
    setScrollLeft,
    resetColGroup,
  });

  useEffect(() => {
    let cancelFunc: () => void | undefined;
    if (tbodyRef.current) {
      cancelFunc = addResizeObserver(tbodyRef.current, handleResize);
    }
    return () => {
      cancelFunc?.();
    };
  }, [tbodyRef.current]);

  useLayoutEffect(() => {
    if (colgroup === false) {
      getColgroup();
    }
  }, [colgroup]);

  return {
    isScrollX,
    isScrollY,
    floatLeft,
    floatRight,
    scrollBarWidth,
    colgroup: colgroup ? colgroup : [],
    func,
  };
};

export default useTableLayout;
