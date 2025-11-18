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

const mm = 30;
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
    onAnimationAfterEnter,
    ...forwardProps
  } = props;

  const [status, setStatus] = useState<
    'enter' | 'beforeEnter' | 'afterEnter' | 'leave' | 'beforeLeave' | 'afterLeave' | undefined
  >(undefined);

  const [innerStyle, setStyle] = useState<React.CSSProperties>({
    display: show ? display : 'none',
  });
  const { current: context } = useRef({
    mounted: false,
    height: 0,
    show: show,
    timer: null as any,
    lastShow: undefined as boolean | undefined,
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
      transition.push(`opacity ${durationNum / 2}ms ease-in-out`);
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
    setStatus('beforeEnter');
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
      newStyle.opacity = 0;
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
      newStyle.opacity = 1;
    }
    setStyle((s) => ({ ...s, ...newStyle }));
    setStatus('enter');
  };
  const afterEnter = () => {
    const newStyle: React.CSSProperties = {};
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = 'auto';
      newStyle.overflow = '';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
    setStatus('afterEnter');
    onAnimationAfterEnter?.();
  };

  const beforeLeave = () => {
    const el = ref.current!;
    const newStyle: React.CSSProperties = { pointerEvents: 'none' };
    if (type.indexOf('collapse') >= 0) {
      context.height = el.offsetHeight;
      newStyle.height = `${context.height}px`;
      newStyle.overflow = 'hidden';
    }
    if (type.includes('fade')) {
      newStyle.opacity = '1';
    }
    if (type.includes('scale-y')) {
      newStyle.transform = 'scaleY(1)';
      newStyle.opacity = 1;
    }
    setStyle((s) => ({ ...s, ...newStyle }));
    setStatus('beforeLeave');
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
      newStyle.opacity = 0;
    }
    setStyle((s) => ({ ...s, ...newStyle }));
    setStatus('leave');
  };
  const afterLeave = () => {
    const newStyle: React.CSSProperties = { pointerEvents: 'initial' };
    if (type.indexOf('collapse') >= 0) {
      newStyle.height = 'auto';
      newStyle.overflow = '';
    }
    if (!context.show) {
      newStyle.display = 'none';
    }
    setStyle((s) => ({ ...s, ...newStyle }));
    setStatus('afterLeave');
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
  };

  useEffect(() => {
    if (status === 'beforeEnter') {
      cleanTimer();
      context.timer = setTimeout(() => {
        enter();
      }, mm);
    }
    if (status === 'enter') {
      cleanTimer();
      context.timer = setTimeout(() => {
        afterEnter();
      }, durationNum + mm);
    }
    if (status === 'beforeLeave') {
      cleanTimer();
      context.timer = setTimeout(() => {
        leave();
      }, mm);
    }
    if (status === 'leave') {
      cleanTimer();
      context.timer = setTimeout(() => {
        afterLeave();
      }, durationNum);
    }
  }, [status]);

  useEffect(() => {
    if (context.lastShow === show) return;
    if (show) {
      showList();
    } else {
      hideList();
    }
    context.lastShow = show;
  }, [show]);

  const wrapperStyle: React.CSSProperties = {
    ...style,
    ...innerStyle,
    transform: `${style?.transform || ''} ${innerStyle?.transform || ''}`.trim(),
  };
  if (!wrapperStyle.transform) {
    delete wrapperStyle.transform;
  }

  return (
    <div
      ref={forkRef}
      className={classNamePo}
      data-sheinx-animation-type={type.join(' ')}
      data-sheinx-animation-duration={duration}
      style={wrapperStyle}
      {...forwardProps}
    >
      {children}
    </div>
  );
};

export default AnimationList;
