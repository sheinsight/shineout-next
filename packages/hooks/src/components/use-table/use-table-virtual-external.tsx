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
  scrollHeight: number;
  setScrollHeight: (height: number) => void;
}

const useTableVirtualExternal = (props: UseTableVirtualExternalProps) => {
  const [headerOffset, setHeaderOffset] = useState(0);
  const externalStickyRef = useRef<HTMLDivElement>(null);
  const tableOffsetRef = useRef<number>(0);
  const stickyCompensationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heightSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // 物理可滚动范围：基于当前外层 div 高度（滚动中不变）
    const physicalMax = props.scrollHeight - viewportHeight;

    // 滚动停止后才同步外层 div 高度，防止滚动中 div 变高导致滑块倒退
    if (sumHeight !== props.scrollHeight) {
      if (heightSyncTimer.current) clearTimeout(heightSyncTimer.current);
      heightSyncTimer.current = setTimeout(() => {
        props.setScrollHeight(sumHeight);
      }, 200);
    }

    let scrollTop: number;
    let max: number;
    if (props.externalStickyHeader) {
      max = sumHeight - props.tfootHeight - viewportHeight;
      if (physicalMax > 0 && max > 0) {
        const rate = Math.min(rawScrollTop / physicalMax, 1);
        scrollTop = rate * max;
      } else {
        scrollTop = rawScrollTop;
      }
    } else {
      const newHeaderOffset = Math.min(rawScrollTop, props.theadHeight);
      if (newHeaderOffset !== headerOffset) {
        setHeaderOffset(newHeaderOffset);
      }
      max = sumHeight - props.theadHeight - props.tfootHeight - viewportHeight;
      const adjustedRaw = rawScrollTop - props.theadHeight;
      const physicalMaxBody = physicalMax - props.theadHeight;
      if (physicalMaxBody > 0 && max > 0) {
        const rate = Math.min(Math.max(adjustedRaw, 0) / physicalMaxBody, 1);
        scrollTop = rate * max;
      } else {
        scrollTop = adjustedRaw;
        if (scrollTop < 0) scrollTop = 0;
      }
    }
    if (max > 0 && scrollTop > max) {
      scrollTop = max;
    }

    // 补偿 sticky 失效：滚动停止后设置补偿值，避免滚动中抖动
    if (externalStickyRef.current && props.externalStickyHeader) {
      const stickyDivFullHeight = externalStickyRef.current.offsetHeight;
      const stickyBreakPoint = sumHeight - stickyDivFullHeight;

      if (stickyCompensationTimer.current) {
        clearTimeout(stickyCompensationTimer.current);
      }
      externalStickyRef.current.style.setProperty('--sticky-compensation', '0px');

      if (rawScrollTop > stickyBreakPoint && stickyBreakPoint > 0) {
        const el = externalStickyRef.current;
        stickyCompensationTimer.current = setTimeout(() => {
          const compensation = rawScrollTop - stickyBreakPoint;
          el.style.setProperty('--sticky-compensation', `${compensation}px`);
        }, 150);
      }
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
      if (heightSyncTimer.current) clearTimeout(heightSyncTimer.current);
    };
  }, [props.disabled, props.dataLength]);

  // 动态控制 overflowX：当 table 仅因亚像素舍入比容器宽 1px 时隐藏滚动条，
  // 容器真正变小（如 resize）需要横滚时恢复 auto
  useEffect(() => {
    const stickyEl = externalStickyRef.current;
    if (!stickyEl) return;

    const checkOverflowX = () => {
      const overflow = stickyEl.scrollWidth - stickyEl.clientWidth;
      const next = overflow <= 1 ? 'hidden' : 'auto';
      if (stickyEl.style.overflowX !== next) {
        stickyEl.style.overflowX = next;
      }
    };

    checkOverflowX();

    const ro = new ResizeObserver(checkOverflowX);
    ro.observe(stickyEl);

    const mo = new MutationObserver(checkOverflowX);
    mo.observe(stickyEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [props.disabled]);

  return {
    externalStickyRef,
    headerOffset,
    tableOffsetRef,
  };
};

export default useTableVirtualExternal;
