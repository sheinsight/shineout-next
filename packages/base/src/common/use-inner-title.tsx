import React, { useState } from 'react';
import { usePersistFn, usePrevious } from '@sheinx/hooks';
import clsx from 'clsx';
import { CommonType } from './type';

export interface InnerTitleClasses {
  rootClass: string;
  wrapper: string;
  wrapperOpen: string;
  wrapperSmall: string;
  wrapperLarge: string;
  title: string;
  top: string;
  place: string;
  content: string;
  animation: string;
}

export interface InnerTitleProps {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  open?: boolean;
  size?: CommonType['size'];
  titleClassName?: string;
  jssStyle?: {
    innerTitle?: () => InnerTitleClasses;
  };
}

const useInnerTitle = (props: InnerTitleProps) => {
  const { innerTitle, placeTitle, size, jssStyle } = props;
  const [animation, setAnimation] = useState(false);
  const open = !!props.open;
  const prevOpen = usePrevious(!!open);
  const innerTitleStyle = jssStyle?.innerTitle?.();
  if (props.innerTitle && !open !== !prevOpen && !animation) {
    setAnimation(true);
  }
  const renderInput = usePersistFn((el: React.ReactElement) => {
    if (!innerTitle) return el;

    return (
      <div
        className={clsx(
          innerTitleStyle?.wrapper,
          !!open && innerTitleStyle?.wrapperOpen,
          size === 'small' && innerTitleStyle?.wrapperSmall,
          size === 'large' && innerTitleStyle?.wrapperLarge,
          animation && innerTitleStyle?.animation,
        )}
        onAnimationEnd={() => setAnimation(false)}
        onAnimationIteration={() => setAnimation(false)}
      >
        <div
          className={clsx(innerTitleStyle?.title, innerTitleStyle?.top, props.titleClassName)}
        >
          {innerTitle}
        </div>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={clsx(innerTitleStyle?.place)}
        >
          <div className={clsx(innerTitleStyle?.title, props.titleClassName)}>
            {placeTitle || innerTitle}
          </div>
        </div>
        <div className={innerTitleStyle?.content}>{el}</div>
      </div>
    );
  });
  return renderInput;
};

export default useInnerTitle;
