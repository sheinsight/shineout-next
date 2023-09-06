import React, { useEffect, useRef, useState } from 'react';
import { AnimationListProps } from './animation-list.type';
import { useForkRef } from '@sheinx/hooks';

const getDuration = (duration: AnimationListProps['duration']) => {
  switch (duration) {
    case 'fast':
      return 240;
    case 'slow':
      return 480;
    default:
      return 360;
  }
};
const mm = 20;
const AnimationList = (props: AnimationListProps) => {
  const {
    display = 'block',
    children,
    style,
    onRef,
    show,
    duration,
    type: typePo,
    className: classNamePo,
    animation = true,
    ...forwardProps
  } = props;

  const [innerStyle, setStyle] = useState({
    display: show ? display : 'none',
  });
  const { current: context } = useRef({
    mounted: false,
    height: 0,
    show: show,
    timer: null as any,
  });
  const ref = useRef<HTMLDivElement>(null);
  const forkRef = useForkRef(ref, onRef);
  const durationNum = animation ? getDuration(duration) : 0;
  const type = Array.isArray(typePo) ? typePo : [typePo];

  useEffect(() => {
    context.mounted = true;
    return () => {
      context.mounted = false;
    };
  }, []);

  const getTransition = () => {
    let transition = [];
    if (type.indexOf('fade') >= 0) {
      transition.push(`opacity ${durationNum}ms ease-in-out`);
    }
    if (type.indexOf('scale-y') >= 0) {
      transition.push(`transform ${durationNum}ms ease-in-out`);
    }
    if (type.indexOf('collapse') >= 0) {
      transition.push(`height ${durationNum}ms ease-in-out`);
    }
    return transition.join(' ,');
  };
  const transition = getTransition();

  const getElInfo = (el: HTMLDivElement) => {
    const clone = el.cloneNode(true) as HTMLDivElement;
    clone.style.height = 'auto';
    clone.style.opacity = '0';
    clone.style.display = display;
    clone.style.pointerEvents = 'none';
    if (el.parentNode) {
      el.parentNode!.appendChild(clone);
      const height = clone.offsetHeight;
      const width = clone.offsetWidth;
      el.parentNode!.removeChild(clone);
      return { height, width };
    }
    return { height: 0, width: 0 };
  };

  const beforeEnter = () => {
    const newStyle: React.CSSProperties = {
      display: display,
    };
    setStyle((s) => ({
      ...s,
      ...newStyle,
    }));
    if (type.indexOf('collapse') >= 0) {
      if (!context.height) {
        context.height = getElInfo(ref.current!).height;
      }
      newStyle.height = '0px';
      newStyle.overflow = 'hidden';
    }
    if (type.includes('fade')) {
      newStyle.opacity = '0';
    }
    if (type.includes('scale-y')) {
      newStyle.transform = 'scaleY(0)';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };
  const enter = () => {
    const newStyle: React.CSSProperties = { transition };
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = `${context.height}px`;
    }
    if (type.includes('fade')) {
      newStyle.opacity = '1';
    }
    if (type.includes('scale-y')) {
      newStyle.transform = 'scaleY(1)';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };
  const afterEnter = () => {
    const newStyle: React.CSSProperties = {};
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = 'auto';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };

  const beforeLeave = () => {
    const el = ref.current!;
    const newStyle: React.CSSProperties = {};
    if (type.indexOf('collapse') >= 0) {
      context.height = el.offsetHeight;
      newStyle.height = `${context.height}px`;
    }
    if (type.includes('fade')) {
      newStyle.opacity = '1';
    }
    if (type.includes('scale-y')) {
      newStyle.transform = 'scaleY(1)';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };
  const leave = () => {
    const newStyle: React.CSSProperties = { transition };
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = '0px';
    }
    if (type.includes('fade')) {
      newStyle.opacity = '0';
    }
    if (type.includes('scale-y')) {
      newStyle.transform = 'scaleY(0)';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };
  const afterLeave = () => {
    const newStyle: React.CSSProperties = {};
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = 'auto';
      newStyle.overflow = '';
    }
    if (!context.show) {
      newStyle.display = 'none';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
  };

  const cleanTimer = () => {
    clearTimeout(context.timer);
  };

  // 展开
  const showList = () => {
    if (!ref.current) return;
    context.show = true;
    if (!animation) {
      setStyle((s) => ({ ...s, display }));
      return;
    }
    beforeEnter();
    cleanTimer();
    context.timer = setTimeout(() => {
      enter();
      cleanTimer();
      context.timer = setTimeout(() => {
        afterEnter();
      }, durationNum);
    }, mm);
  };

  // 关闭
  const hideList = () => {
    context.show = false;
    if (!ref.current) return;
    if (!animation) {
      setStyle((s) => ({ ...s, display: 'none' }));
      return;
    }
    beforeLeave();
    cleanTimer();
    context.timer = setTimeout(() => {
      leave();
      cleanTimer();
      context.timer = setTimeout(() => {
        afterLeave();
      }, durationNum);
    }, mm);
  };

  useEffect(() => {
    if (show) {
      showList();
    } else {
      hideList();
    }
  }, [show]);

  return (
    <div
      ref={forkRef}
      className={classNamePo}
      data-sheinx-animation-type={type.join(' ')}
      data-sheinx-animation-duration={duration}
      style={{ ...style, ...innerStyle }}
      {...forwardProps}
    >
      {children}
    </div>
  );
};

export default AnimationList;
