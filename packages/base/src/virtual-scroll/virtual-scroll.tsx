import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { usePersistFn } from '@sheinx/hooks';
import { VirtualScrollProps, VirtualScrollClasses } from './virtual-scroll.type';

function getElementScrollbarWidth(element: HTMLElement) {
  return element.offsetWidth - element.clientWidth;
}

const VirtualScroll = (props: VirtualScrollProps) => {
  const {
    jssStyle,
    children,
    virtualRef,
    // width,
    height,
    scrollHeight: scrollHeightProp,
    // scrollWidth: scrollWidthProp,
    footer,
    onScroll,
  } = props;

  const [deltaY, setDeltaY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  const wheelEl = useRef<HTMLDivElement>(null);
  const transformEl = useRef<HTMLDivElement>(null);

  const barRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const barMonitorRef = useRef<HTMLDivElement>(null);

  const wheelLocked = useRef(false);
  const preventLocked = useRef(true);

  const scrollHeight = scrollHeightProp || height;
  // const scrollBarWidth = scrollWidthProp || width;
  const shouldScroll = scrollHeight > height;

  const rootStyle = jssStyle?.virtualScroll?.() || ({} as VirtualScrollClasses);
  const rootClass = classNames(rootStyle.scroll, {
    [rootStyle.scrolled]: scrollBarWidth && shouldScroll,
  });

  const styles = {
    paddingRight: scrollBarWidth && shouldScroll ? scrollBarWidth : 0,
  };

  const handlePrevent = usePersistFn((e) => {
    e.preventDefault();
  });

  const handleReset = () => {
    setDeltaY(0);
    setDeltaX(0);
    onScroll(0, 0);
  };

  const handleResize = () => {
    console.log('resize');
  };

  const handleWheel = (e: WheelEvent) => {
    if (!shouldScroll) return;
    if (deltaY === 0 && e.deltaY < 0) {
      return;
    }
    if (deltaY === 0 && e.deltaY > 0) {
      preventLocked.current = true;
    }
    if (deltaY === scrollHeight - height && e.deltaY < 0) {
      preventLocked.current = true;
    }

    let newDeltaY = deltaY + e.deltaY;
    let newDeltaX = deltaX + e.deltaX;

    if (newDeltaY <= 0) newDeltaY = 0;
    else if (newDeltaY >= scrollHeight - height) newDeltaY = scrollHeight - height;

    if (newDeltaX <= 0) newDeltaX = 0;
    else if (newDeltaX >= scrollHeight - height) newDeltaX = scrollHeight - height;

    onScroll(newDeltaX, newDeltaY);
    setDeltaY(newDeltaY);
    setDeltaX(newDeltaX);

    if (barRef.current) {
      barRef.current.scrollTop = newDeltaY;
    }
  };

  const handleBarScroll = (e) => {
    if (wheelLocked.current) return;
    onScroll(deltaX, e.target.scrollTop);
    setDeltaY(e.target.scrollTop);
  };

  const handleBarEnter = () => {
    wheelLocked.current = false;
  };

  useEffect(() => {
    if (transformEl.current) transformEl.current.style.transform = `translate(0,-${deltaY}px)`;
    if (deltaY === 0 || deltaY === scrollHeight - height) {
      preventLocked.current = false;
    }
  }, [deltaY]);

  useEffect(() => {
    if (scrollHeight < height) handleReset();
  }, [scrollHeight]);

  // DOM resize 监听器
  const renderResizeMonitor = () => {
    return (
      <iframe className={rootStyle.iframe} ref={resizeRef} tabIndex={-1} title='scroll'></iframe>
    );
  };

  const renderBarMonitor = () => {
    return (
      <div
        ref={barMonitorRef}
        style={{
          width: '100%',
          height: 1,
          overflow: 'scroll',
          zIndex: -1,
          top: -1,
          position: 'absolute',
        }}
      >
        <div style={{ height: 2, width: 1 }}></div>
      </div>
    );
  };

  const renderFooter = () => {
    return <div className={rootStyle.footer}>{footer}</div>;
  };

  const renderBar = () => {
    return (
      <div
        ref={barRef}
        onScroll={handleBarScroll}
        onMouseEnter={handleBarEnter}
        style={{
          height: '100%',
          overflowY: 'auto',
          position: 'absolute',
          right: 0,
          width: 16,
          zIndex: 1,
        }}
      >
        <div className={rootStyle.bar} style={{ height: scrollHeight }}></div>
      </div>
    );
  };

  useEffect(() => {
    if (virtualRef) {
      if (typeof virtualRef === 'function') {
        virtualRef({ reset: handleReset });
      } else {
        virtualRef.current = {
          reset: handleReset,
        };
      }
    }

    // TODO: 需要做节流处理
    if (resizeRef.current) resizeRef.current.onresize = handleResize;
    const width = getElementScrollbarWidth(barMonitorRef.current);
    if (width > 0) setScrollBarWidth(width);
    if (wheelEl.current) {
      wheelEl.current.addEventListener('wheel', handlePrevent, { passive: false });
    }

    return () => {
      if (resizeRef.current) resizeRef.current.onresize = null;
      if (wheelEl.current) {
        wheelEl.current.removeEventListener('wheel', handlePrevent);
      }
    };
  }, []);

  return (
    <>
      <div ref={wheelEl} className={rootClass} style={styles}>
        {renderResizeMonitor()}
        {renderBarMonitor()}
        {shouldScroll && renderBar()}
        <div ref={containerRef} className={rootStyle.container} onWheel={handleWheel}>
          <div ref={transformEl}>{children}</div>
        </div>
      </div>
      {footer && renderFooter()}
    </>
  );
};

export default VirtualScroll;
