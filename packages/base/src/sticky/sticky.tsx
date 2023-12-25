import { usePersistFn, util, useResize, useRender } from '@sheinx/hooks';
import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { StickyProps } from './sticky.type';

const { cssSupport } = util;
const supportSticky = cssSupport('position', 'sticky');
const defaultZIndex = 900;

const getFirstScrollParent = (el: HTMLElement) => {
  let parent = el.parentNode as HTMLElement;
  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      parent = document.body;
      break;
    }
    const { overflowY } = window.getComputedStyle(parent);
    if (overflowY === 'scroll' || overflowY === 'auto') {
      break;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

const Sticky = (props: StickyProps) => {
  const { css, children, top, bottom } = props;
  const { current: context } = useRef({
    target: null as HTMLElement | null,
    div: null as HTMLElement | null,
    observer: null as IntersectionObserver | null,
    parentObserver: null as IntersectionObserver | null,
    isTop: false,
  });

  const [style, setStyle] = useState({} as React.CSSProperties);
  const [show, setShow] = useState(false);
  const [parentVisible, setParentVisible] = useState(true);

  const forceRender = useRender();
  const elementRef = useRef(null as HTMLElement | null);
  const elementSize = useResize({ targetRef: elementRef, timer: 0 });

  const getTarget = () => {
    let { target } = props;
    if (typeof props.target === 'string') {
      target = document.querySelector(props.target) as HTMLElement;
    }
    // 判断是否是dom元素
    if (target && (target as HTMLElement).nodeType === 1) {
      return target as HTMLElement;
    }
    return getFirstScrollParent(elementRef.current!);
  };

  const handlePosition: IntersectionObserverCallback = usePersistFn((entries) => {
    const entry = entries[0];
    // console.log(entry);
    const scrollRect = entry.rootBounds;
    const targetRect = entry.boundingClientRect;
    const shouldFixed = context.target === document.body;
    if (!entry.isIntersecting) {
      const targetLeft = entry.target.getBoundingClientRect().left;
      const outRootRect = shouldFixed
        ? { top: 0, bottom: 0, left: 0, right: 0 }
        : context.div!.getBoundingClientRect();
      const { width, height } = targetRect;

      if (scrollRect && targetRect.bottom < scrollRect.bottom) {
        // top in
        // console.log('top in');
        // console.log(scrollRect, outRootRect);
        context.isTop = true;
        if (typeof top === 'number') {
          setShow(true);
          const style: React.CSSProperties = {
            position: shouldFixed ? 'fixed' : 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            top: `${scrollRect.top - outRootRect.top}px`,
            left: `${targetLeft - outRootRect.left}px`,
          };
          setStyle(style);
        }
      } else if (scrollRect) {
        // bottom in
        // console.log('bottom in');
        // console.log(scrollRect, outRootRect);
        context.isTop = false;
        if (typeof bottom === 'number') {
          setShow(true);
          const outRootRect = context.target!.getBoundingClientRect();
          const style: React.CSSProperties = {
            position: shouldFixed ? 'fixed' : 'absolute',
            width: `${width}px`,
            height: `${height}px`,
            top: `${scrollRect.bottom - outRootRect.top}px`,
            left: `${targetLeft - outRootRect.left}px`,
            transform: 'translateY(-100%)',
          };
          setStyle(style);
        }
      }
    }
    if (entry.isIntersecting) {
      setShow(false);
    }
  });

  const handleParentVisible: IntersectionObserverCallback = usePersistFn((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setParentVisible(true);
    } else {
      setParentVisible(false);
      // setStyle({display: 'none'})
    }
  });

  const cleanEvents = () => {
    if (context.observer) {
      context.observer.disconnect();
      context.observer = null;
    }
    if (context.parentObserver) {
      context.parentObserver.disconnect();
      context.parentObserver = null;
    }
  };

  const createObserver = () => {
    const target = getTarget();
    if (!context.div) {
      context.div = document.createElement('div');
      context.div.style.position = 'relative';
    }
    if (target && target !== context.target) {
      forceRender();
      context.target = target;
      cleanEvents();
      if (target === document.body) {
        document.body.appendChild(context.div);
      } else {
        target.parentNode!.insertBefore(context.div, target);
      }
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(handlePosition, {
          root: target,
          rootMargin: `-${top || 0}px 0px -${bottom || 0}px 0px`,
          threshold: 1.0,
        });
        context.observer = observer;

        context.parentObserver = new IntersectionObserver(handleParentVisible, {
          root: target,
          rootMargin: `-${top || 0}px 0px -${bottom || 0}px 0px`,
          threshold: 0,
        });
      }
    }
  };

  const handleElementRef = (el: HTMLElement | null) => {
    if (el) {
      elementRef.current = el;
      if (el && context.observer) {
        context.observer.observe(el);
      }
    }
  };

  useEffect(() => {
    if (!css) {
      createObserver();
    }
    return () => {
      cleanEvents();
      if (context.div) {
        context.div.remove();
        context.div = null;
      }
    };
  }, [css]);

  useEffect(() => {
    if (props.parent && context.parentObserver) {
      context.parentObserver.observe(props.parent);
    }
    return () => {
      if (context.parentObserver) {
        context.parentObserver.disconnect();
      }
    };
  }, [props.parent]);

  // 纯css方法 直接使用css
  // js方法
  // 1. 不指定滚动容器 基于document.body 使用fixed + js计算
  // 2. 指定滚动容器 在滚动容器上方插入一个dom占位 基于该dom渲染和定位
  // 3. 使用 intersectionObserver 来判断是否需要sticky
  if (css && supportSticky) {
    return (
      <div
        className={props.className}
        style={{ zIndex: defaultZIndex, ...props.style, position: 'sticky', top, bottom }}
      >
        {children}
      </div>
    );
  }
  const StickyEl =
    show && parentVisible ? (
      <div style={{ zIndex: defaultZIndex, ...style, ...elementSize }}>
        <div className={props.className} style={props.style}>
          {children}
        </div>
      </div>
    ) : null;
  return (
    <>
      {context.target && context.div && createPortal(StickyEl, context.div as HTMLElement)}
      <div
        className={props.className}
        style={{
          ...props.style,
          opacity: show && parentVisible ? 0 : props.style?.opacity,
        }}
        ref={handleElementRef}
      >
        {children}
      </div>
    </>
  );
};

export default Sticky;
