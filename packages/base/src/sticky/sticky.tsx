import { usePersistFn, util, useResize, useRender } from '@sheinx/hooks';
import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { StickyProps } from './sticky.type';

const { cssSupport } = util;
const supportSticky = cssSupport('position', 'sticky');
const defaultZIndex = 900;

// const getFirstScrollParent = (el: HTMLElement) => {
//   let parent = el.parentNode as HTMLElement;
//   while (parent) {
//     if (parent === document.body || parent === document.documentElement) {
//       parent = document.body;
//       break;
//     }
//     const { overflowY } = window.getComputedStyle(parent);
//     if (overflowY === 'scroll' || overflowY === 'auto') {
//       break;
//     }
//     parent = parent.parentNode as HTMLElement;
//   }
//   return parent;
// };

const Sticky = (props: StickyProps) => {
  const { children, top, bottom } = props;
  const css = props.css || props.target;
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
    let { scrollContainer } = props;
    if (typeof scrollContainer === 'string') {
      scrollContainer = document.querySelector(scrollContainer) as HTMLElement;
    }
    // 判断是否是dom元素
    if (scrollContainer && (scrollContainer as HTMLElement).nodeType === 1) {
      return scrollContainer as HTMLElement;
    }
    return document.body;
  };

  const updateStyle = usePersistFn(() => {
    if (context.div && !context.isTop && show) {
      const shouldFixed = context.target === document.body;
      const scrollRect = context.target!.getBoundingClientRect();
      const targetRect = elementRef.current!.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const { width, height } = targetRect;
      if (typeof bottom === 'number') {
        const outRootRect = context.target!.getBoundingClientRect();
        const style: React.CSSProperties = {
          position: shouldFixed ? 'fixed' : 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          top: `${scrollRect.bottom - (props.bottom || 0) - outRootRect.top}px`,
          left: `${targetLeft - outRootRect.left}px`,
          transform: 'translateY(-100%)',
        };
        setStyle(style);
      }
    }
  });

  const handlePosition: IntersectionObserverCallback = usePersistFn((entries) => {
    const entry = entries[0];
    const scrollRect = entry.rootBounds;
    const targetRect = entry.boundingClientRect;
    const shouldFixed = context.target === document.body;
    if (!entry.isIntersecting) {
      const targetLeft = targetRect.left;
      const outRootRect = shouldFixed
        ? { top: 0, bottom: 0, left: 0, right: 0 }
        : context.div!.getBoundingClientRect();
      const { width, height } = targetRect;

      if (scrollRect && targetRect.bottom < scrollRect.bottom) {
        // top in
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
    window.removeEventListener('resize', updateStyle);
  };

  const createObserver = () => {
    const target = getTarget();
    if (!context.div && target !== document.body) {
      context.div = document.createElement('div');
      context.div.style.position = 'relative';
    }
    if (target && target !== context.target) {
      forceRender();
      context.target = target;
      cleanEvents();
      if (context.div) {
        // append div
        if (target === document.body) {
          document.body.appendChild(context.div);
        } else {
          target.parentNode!.insertBefore(context.div, target);
        }
        const style = window.getComputedStyle(target);
        if (style.position === 'absolute' || style.position === 'fixed') {
          context.div.style.position = style.position;
          context.div.style.top = style.top;
          context.div.style.left = style.left;
          context.div.style.right = style.right;
          context.div.style.bottom = style.bottom;
        }
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
      window.addEventListener('resize', updateStyle);
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

  const isFixed = style.position === 'fixed';

  return (
    <>
      {isFixed
        ? StickyEl
        : context.target && context.div && createPortal(StickyEl, context.div as HTMLElement)}
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
