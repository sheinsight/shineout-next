import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
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

const AnimationList = (props: AnimationListProps) => {
  const {
    display = 'block',
    children,
    style,
    jssStyle,
    onRef,
    show: showPo,
    duration,
    type: typePo,
    className: classNamePo,
    animation = true,
    ...forwardProps
  } = props;

  const [show, setShow] = useState(showPo);
  const { current: context } = useRef({ mounted: false, height: 0, show: showPo });
  const ref = useRef<HTMLDivElement>(null);
  const forkRef = useForkRef(ref, onRef);
  const durationNum = animation ? getDuration(duration) : 0;
  const type = Array.isArray(typePo) ? typePo : [typePo];
  const needCollapse = type.indexOf('collapse') >= 0;
  const needTransform = type.indexOf('scale-y') >= 0;

  useEffect(() => {
    context.mounted = true;
    const el = ref.current!;
    if (showPo || !el) {
      return;
    }
    if (needCollapse) {
      context.height = el.offsetHeight;
    }
    el.style.display = 'none';
    if (needCollapse) {
      el.style.overflow = 'hidden';
      el.style.height = '0px';
    }
    return () => {
      context.mounted = false;
    };
  }, []);

  // 展开
  const showList = () => {
    const el = ref.current!;
    if (!el) return;
    context.show = true;
    const es = el.style;
    es.display = display;
    setTimeout(() => {
      if (context.mounted) {
        setShow(true);

        if (needCollapse) {
          es.overflow = 'hidden';
          es.height = `${context.height}px`;

          setTimeout(() => {
            es.height = 'auto';
            es.overflow = '';
          }, durationNum);
        }
      }
    }, 10);
  };

  // 关闭
  const hideList = () => {
    context.show = false;
    setShow(false);
    if (!ref.current) return;
    const element = ref.current;

    if (needCollapse) {
      context.height = element.offsetHeight;
      element.style.height = `${context.height}px`;
      element.style.overflow = 'hidden';

      setTimeout(() => {
        element.style.height = '0px';
      }, 10);
    }
    setTimeout(() => {
      if (!context.show && element) {
        element.style.display = 'none';
      }
    }, durationNum);
  };

  useEffect(() => {
    context.show = true;
    if (showPo) {
      showList();
    } else {
      hideList();
    }
  }, [showPo]);

  let animationName = durationNum ? `animation-${durationNum}` : '';
  if (!needTransform) animationName = `fade-${animationName}`;
  const className = classNames(
    jssStyle[animationName as keyof AnimationListProps['jssStyle']],
    {
      [jssStyle.show]: show,
      [jssStyle.fade]: type.includes('fade'),
      [jssStyle.collapse]: type.includes('collapse'),
      [jssStyle['scale-y']]: type.includes('scale-y'),
    },
    classNamePo,
  );

  return (
    <div ref={forkRef} className={className} data-class={className} style={style} {...forwardProps}>
      {children}
    </div>
  );
};

export default AnimationList;
