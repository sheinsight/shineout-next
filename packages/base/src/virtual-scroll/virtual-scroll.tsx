import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { VirtualScrollProps, VirtualScrollClasses } from './virtual-scroll.type';
import Bar from './virtual-bar';

function getElementScrollbarWidth(element: HTMLElement) {
  return element.offsetWidth - element.clientWidth;
}

const VirtualScroll = (props: VirtualScrollProps) => {
  const {
    jssStyle,
    children,
    // width,
    height,
    scrollHeight: scrollHeightProp,
    // scrollWidth: scrollWidthProp,
    footer,
    scrollX,
    scrollY,
    onScroll,
  } = props;

  const rootStyle = jssStyle?.virtualScroll?.() || ({} as VirtualScrollClasses);
  const rootClass = classNames(rootStyle.scroll);

  const [deltaY, setDeltaY] = useState(0);
  const [deltaX, setDeltaX] = useState(0);

  const wheelEl = useRef<HTMLDivElement>(null);
  const transformEl = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLIFrameElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wheelLocked = useRef(false);
  // const preventLocked = useRef(false);

  const scrollHeight = scrollHeightProp || height;
  // const scrollWidth = scrollWidthProp || width;

  // const handlePrevent = (e) => {
  //   if (preventLocked.current) return;
  //   e.preventDefault();
  // };

  const handleResize = () => {
    console.log('resize');
  };

  const handleWheel = (e: WheelEvent) => {
    wheelLocked.current = true;
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
  }, [deltaY]);

  // DOM resize 监听器
  const renderResizeMonitor = () => {
    return (
      <iframe className={rootStyle.iframe} ref={resizeRef} tabIndex={-1} title='scroll'></iframe>
    );
  };

  const renderFooter = () => {
    return <div className={rootStyle.footer}>{footer}</div>;
  };

  // 横向滚动条
  const renderBarX = () => {
    return <Bar direction='x' jssStyle={jssStyle}></Bar>;
  };

  // 纵向滚动条
  const renderBarY = () => {
    return <Bar direction='y' jssStyle={jssStyle}></Bar>;
  };

  useEffect(() => {
    // TODO: 需要做节流处理
    if (resizeRef.current) resizeRef.current.onresize = handleResize;
    const width = getElementScrollbarWidth(barRef.current);
    console.log(width);
  }, []);

  return (
    <>
      <div ref={wheelEl} className={rootClass} onWheel={handleWheel}>
        {renderResizeMonitor()}
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
        <div className={rootStyle.container}>
          <div ref={transformEl}>{children}</div>
        </div>
      </div>
      {scrollX && renderBarX()}
      {scrollY && renderBarY()}
      {footer && renderFooter()}
    </>
  );
};

export default VirtualScroll;
