import { usePersistFn, util, useResize, useRender } from '@sheinx/hooks';
import { createPortal } from 'react-dom';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StickyProps } from './sticky.type';

const { cssSupport, devUseWarning } = util;
const supportSticky = cssSupport('position', 'sticky');
export const defaultZIndex = 900;
const events = ['scroll', 'pageshow', 'load', 'resize'];

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
  if (props.target) {
    devUseWarning.deprecated('target', 'scrollContainer', 'Sticky');
  }
  const { children, top, bottom } = props;
  // 是否使用css sticky
  const css = (props.css || props.target) && supportSticky;
  const forceUpdate = useRender();
  const { current: context } = useRef({
    target: null as HTMLElement | null,
    div: null as HTMLElement | null,
    position: '',
    targetObserver: null as IntersectionObserver | null,
    parentObserver: null as IntersectionObserver | null,
    fixedObserver: null as IntersectionObserver | null,
  });

  const [style, setStyle] = useState({} as React.CSSProperties);
  const [show, setShow] = useState(false);
  const [parentVisible, setParentVisible] = useState(true);

  const elementRef = useRef(null as HTMLElement | null);

  const getTarget = () => {
    let { scrollContainer } = props;
    if (typeof scrollContainer === 'string') {
      scrollContainer = document.querySelector(scrollContainer) as HTMLElement;
    }
    // 判断是否是dom元素
    if (scrollContainer && (scrollContainer as HTMLElement).nodeType === 1) {
      return scrollContainer as HTMLElement;
    }
    return null;
  };

  // window resize 时需要重新计算底部附着的位置
  const updateStyle = usePersistFn(() => {
    if (context.div && context.position === 'bottom' && show) {
      const scrollRect = context.target!.getBoundingClientRect();
      const targetRect = elementRef.current!.getBoundingClientRect();
      const targetLeft = targetRect.left;
      if (typeof bottom === 'number') {
        const outRootRect = context.target!.getBoundingClientRect();
        const style: React.CSSProperties = {
          position: 'absolute',
          top: `${scrollRect.bottom - (props.bottom || 0) - outRootRect.top}px`,
          left: `${targetLeft - outRootRect.left}px`,
          transform: 'translateY(-100%)',
        };
        setStyle(style);
      }
    }
  });

  // 有滚动容器时的定位
  const handleTargetPosition: IntersectionObserverCallback = usePersistFn((entries) => {
    const entry = entries[0];
    const scrollRect = entry.rootBounds;
    const targetRect = entry.boundingClientRect;

    if (!entry.isIntersecting) {
      const targetLeft = targetRect.left;
      const outRootRect = context.div!.getBoundingClientRect();

      if (scrollRect && targetRect.bottom < scrollRect.bottom) {
        // top in
        context.position = 'top';
        if (typeof top === 'number') {
          setShow(true);
          const style: React.CSSProperties = {
            position: 'absolute',
            top: `${scrollRect.top - outRootRect.top}px`,
            left: `${targetLeft - outRootRect.left}px`,
          };
          setStyle(style);
        }
      } else if (scrollRect) {
        // bottom in
        context.position = 'bottom';
        if (typeof bottom === 'number') {
          setShow(true);
          const style: React.CSSProperties = {
            position: 'absolute',
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
      context.position = '';
    }
  });

  // 父元素是否可见
  const handleParentVisible: IntersectionObserverCallback = usePersistFn((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setParentVisible(true);
    } else {
      setParentVisible(false);
    }
  });

  const setFixedStyle = usePersistFn((s: boolean, m?: 'top' | 'bottom', l: number = 0) => {
    if (s !== show) {
      setShow(s);
    }
    if (s && m) {
      const newStyle: React.CSSProperties = {
        position: 'fixed',
        [m]: m === 'top' ? top : bottom,
        left: l,
      };
      if (!util.shallowEqual(style, newStyle)) {
        setStyle(newStyle);
      }
    }
  });

  // 无滚动容器的时候，body 滚动 resize 计算
  const handleFixedPosition = usePersistFn(() => {
    if (css || context.target) return;
    const element = elementRef.current;
    if (!parentVisible) {
      setFixedStyle(false);
      return;
    }
    if (!element) return;
    const selfRect = element.getBoundingClientRect();
    if (selfRect === null) return;
    // If the element is hidden, the width and height will be 0
    if (selfRect && selfRect.width === 0 && selfRect.height === 0) return;
    const scrollRect = document.body.getBoundingClientRect();
    const { top, bottom } = props;
    if (top !== undefined && Math.ceil(selfRect.top) <= top) {
      setFixedStyle(true, 'top', selfRect.left);
      return;
    } else if (bottom !== undefined && Math.ceil(selfRect.bottom) + bottom > scrollRect.bottom) {
      setFixedStyle(true, 'bottom', selfRect.left);
      return;
    } else {
      setFixedStyle(false);
    }
  });

  // 无滚动容器时内滚场景触发
  const handleFixedInter = usePersistFn((entries) => {
    if (!parentVisible) {
      setFixedStyle(false);
      return;
    }
    const entry = entries[0];
    const scrollRect = entry.rootBounds;
    const targetRect = entry.boundingClientRect;
    if (scrollRect && scrollRect.top === 0 && scrollRect.bottom === 0) {
      return;
    }

    if (!entry.isIntersecting) {
      const targetLeft = targetRect.left;
      const outRootRect = document.body.getBoundingClientRect();

      if (scrollRect && targetRect.bottom < scrollRect.bottom) {
        // top in
        if (typeof top === 'number') {
          setFixedStyle(true, 'top', targetLeft - outRootRect.left);
        }
      } else if (scrollRect) {
        // bottom in
        if (typeof bottom === 'number') {
          setFixedStyle(true, 'bottom', targetLeft - outRootRect.left);
        }
      }
    }
    if (entry.isIntersecting) {
      setFixedStyle(false);
    }
  });

  const elementSize = useResize({ targetRef: elementRef, timer: 10, cb: handleFixedPosition });

  const cancelFixedObserver = () => {
    if (context.fixedObserver) {
      context.fixedObserver.disconnect();
      context.fixedObserver = null;
    }
  };
  const createFixedObserver = () => {
    cancelFixedObserver();
    context.fixedObserver = new IntersectionObserver(handleFixedInter, {
      root: null,
      rootMargin: `${-(top || 0)}px 0px ${-(bottom || 0)}px 0px`,
      threshold: 1.0,
    });
  };

  const cancelObserver = () => {
    if (context.targetObserver) {
      context.targetObserver.disconnect();
      context.targetObserver = null;
    }
  };

  const createObserver = () => {
    if (!context.div) {
      context.div = document.createElement('div');
      context.div.style.position = 'relative';
    }
    if (context.target) {
      if (context.div) {
        // append div
        if (context.target === document.body) {
          document.body.insertBefore(context.div, document.body.firstChild);
        } else {
          context.target.parentNode!.insertBefore(context.div, context.target);
        }
        const style = window.getComputedStyle(context.target);
        if (style.position === 'absolute' || style.position === 'fixed') {
          context.div.style.position = style.position;
          context.div.style.top = style.top;
          context.div.style.left = style.left;
          context.div.style.right = style.right;
          context.div.style.bottom = style.bottom;
        }
      }
      cancelFixedObserver();
      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(handleTargetPosition, {
          root: context.target,
          rootMargin: `${-(top || 0)}px 0px ${-(bottom || 0)}px 0px`,
          threshold: 1.0,
        });
        context.targetObserver = observer;
      }
    }
  };

  const cancelParentObserver = () => {
    if (context.parentObserver) {
      context.parentObserver.disconnect();
      context.parentObserver = null;
    }
  };

  const createParentObserver = () => {
    if (!props.parent) return;
    cancelParentObserver();
    context.parentObserver = new IntersectionObserver(handleParentVisible, {
      root: context.target,
      rootMargin: `${-(top || 0)}px 0px ${-(bottom || 0)}px 0px`,
      threshold: 0,
    });
    context.parentObserver.observe(props.parent);
  };

  // 存在滚动容器时的定位
  const createTargetEvents = () => {
    createObserver();
    window.addEventListener('resize', updateStyle);
  };

  const cancelTargetEvents = () => {
    cancelObserver();
    window.removeEventListener('resize', updateStyle);
    if (context.div) {
      context.div.remove();
      context.div = null;
    }
  };

  const createFixedEvents = () => {
    createFixedObserver();
    events.forEach((event) => {
      window.addEventListener(event, handleFixedPosition);
    });
  };

  const cancelFixedEvents = () => {
    cancelFixedObserver();
    events.forEach((event) => {
      window.removeEventListener(event, handleFixedPosition);
    });
  };

  const handleElementRef = (el: HTMLElement | null) => {
    if (el) {
      elementRef.current = el;
      if (context.targetObserver) {
        if (!el) {
          context.targetObserver.disconnect();
        } else {
          context.targetObserver.observe(el);
        }
      }
      if (context.fixedObserver) {
        if (!el) {
          context.fixedObserver.disconnect();
        } else {
          context.fixedObserver.observe(el);
        }
      }
    }
  };

  useLayoutEffect(() => {
    if (css) return;
    const target = getTarget();
    if (context.target !== target) {
      context.target = target;
      forceUpdate();
    }
    if (context.target) {
      createTargetEvents();
      return cancelTargetEvents;
    } else {
      // fixed 布局
      createFixedEvents();
      return cancelFixedEvents;
    }
  }, [css, top, bottom]);

  useLayoutEffect(() => {
    if (props.parent && !css) {
      // createParentObserver 用到context.target
      createParentObserver();
      context.parentObserver!.observe(props.parent);
    }
    return cancelParentObserver;
  }, [props.parent, css, context.target, top, bottom]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(show);
    };
  }, [show]);

  // 纯css方法 直接使用css
  // js方法
  // 1. 不指定滚动容器 基于document.body 使用fixed + js计算
  // 2. 指定滚动容器 在滚动容器上方插入一个dom占位 基于该dom渲染和定位
  // 3. 使用 intersectionObserver 来判断是否需要sticky
  if (css) {
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
      <div style={{ zIndex: props.style?.zIndex || defaultZIndex, ...style, ...elementSize }}>
        <div className={props.className} style={props.style}>
          {children}
        </div>
      </div>
    ) : null;

  const isFixed = style.position === 'fixed';

  const hideStyle: any = {
    opacity: 0,
    pointerEvents: 'none',
  };

  return (
    <>
      {isFixed
        ? StickyEl
        : context.target && context.div && createPortal(StickyEl, context.div as HTMLElement)}
      <div
        className={props.className}
        style={{
          ...props.style,
          ...(show && parentVisible ? hideStyle : {}),
        }}
        ref={handleElementRef}
        {...util.getDataAttribute({ sticky: show && parentVisible ? 'true' : 'false'})}
      >
        {children}
      </div>
    </>
  );
};

export default Sticky;
