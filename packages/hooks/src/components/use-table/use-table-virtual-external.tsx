import { usePersistFn } from '../../common/use-persist-fn';
import { useState, useRef, useEffect } from 'react';

interface UseTableVirtualExternalProps {
  disabled?: boolean;
  dataLength: number;
  theadHeight: number;
  tfootHeight: number;
  externalStickyHeader?: boolean;
  virtualScrollContainer: () => HTMLElement | null;
  tableRef?: React.RefObject<HTMLDivElement>;
  getContentHeight: (index: number) => number;
  updateIndexAndTopFromTop: (scrollTop: number) => void;
}

const useTableVirtualExternal = (props: UseTableVirtualExternalProps) => {
  const [headerOffset, setHeaderOffset] = useState(0);
  const externalStickyRef = useRef<HTMLDivElement>(null);
  const tableOffsetRef = useRef<number>(0);

  const handleExternalScroll = usePersistFn(() => {
    if (props.disabled) return;
    const container = props.virtualScrollContainer();
    const tableEl = props.tableRef?.current;
    if (!container || !tableEl) return;

    if (tableOffsetRef.current === 0) {
      if (container === document.documentElement || container === document.body) {
        tableOffsetRef.current = tableEl.getBoundingClientRect().top + window.scrollY;
      } else {
        tableOffsetRef.current =
          tableEl.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      }
    }

    let rawScrollTop: number;
    if (container === document.documentElement || container === document.body) {
      const rect = tableEl.getBoundingClientRect();
      rawScrollTop = -rect.top;
    } else {
      const containerRect = container.getBoundingClientRect();
      const tableRect = tableEl.getBoundingClientRect();
      rawScrollTop = containerRect.top - tableRect.top;
    }
    if (rawScrollTop < 0) rawScrollTop = 0;

    const sumHeight = props.getContentHeight(props.dataLength - 1);
    const viewportHeight = externalStickyRef.current?.clientHeight || container.clientHeight;

    let scrollTop: number;
    let max: number;
    if (props.externalStickyHeader) {
      max = sumHeight - props.tfootHeight - viewportHeight;
      scrollTop = rawScrollTop;
    } else {
      const newHeaderOffset = Math.min(rawScrollTop, props.theadHeight);
      if (newHeaderOffset !== headerOffset) {
        setHeaderOffset(newHeaderOffset);
      }
      max = sumHeight - props.theadHeight - props.tfootHeight - viewportHeight;
      scrollTop = rawScrollTop - props.theadHeight;
      if (scrollTop < 0) scrollTop = 0;
    }
    if (max > 0 && scrollTop > max) {
      scrollTop = max;
    }

    props.updateIndexAndTopFromTop(scrollTop);
  });

  useEffect(() => {
    if (props.disabled) return;
    const container = props.virtualScrollContainer();
    if (!container) return;
    const scrollTarget =
      container === document.documentElement || container === document.body ? window : container;
    scrollTarget.addEventListener('scroll', handleExternalScroll, { passive: true });
    handleExternalScroll();
    return () => {
      scrollTarget.removeEventListener('scroll', handleExternalScroll);
    };
  }, [props.disabled, props.dataLength]);

  return {
    externalStickyRef,
    headerOffset,
    tableOffsetRef,
  };
};

export default useTableVirtualExternal;
