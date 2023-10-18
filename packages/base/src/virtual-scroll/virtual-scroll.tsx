import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { VirtualScrollProps, VirtualScrollClasses } from './virtual-scroll.type';
import Bar from './virtual-bar';

const VirtualScroll = (props: VirtualScrollProps) => {
  const {
    jssStyle,
    children,
    height,
    scrollHeight: scrollHeightProp,
    footer,
    scrollX,
    scrollY,
    onScroll,
  } = props;
  const rootStyle = jssStyle?.virtualScroll?.() || ({} as VirtualScrollClasses);
  const rootClass = classNames(rootStyle.scroll);
  const delta = useRef(0);
  const wheelEl = useRef<HTMLDivElement>(null);
  const transformEl = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLIFrameElement>(null);

  const scrollHeight = scrollHeightProp || height;

  const handleResize = () => {
    console.log('resize');
  };

  const handleWheel = (e: WheelEvent) => {
    delta.current += e.deltaY;
    if (delta.current <= 0) delta.current = 0;
    if (delta.current >= scrollHeight - height) {
      delta.current = scrollHeight - height;
    }
    onScroll(delta.current);
    if (transformEl.current) {
      transformEl.current.style.transform = `translate(0,-${delta.current}px)`;
    }
  };

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
    // if (wheelEl.current) {
    //   wheelEl.current.addEventListener('wheel', handleWheel, { passive: false });
    // }

    // return () => {

    // };
  }, []);

  return (
    <>
      <div ref={wheelEl} className={rootClass} onWheel={handleWheel}>
        {renderResizeMonitor()}
        <div className={rootStyle.container}>
          <div ref={transformEl}>{children}</div>
          {/* <div style={{transform:`translateY(-${delta.current}px)`}} >{children}</div> */}
        </div>
      </div>
      {scrollX && renderBarX()}
      {scrollY && renderBarY()}
      {footer && renderFooter()}
    </>
  );
};

export default VirtualScroll;
