import React from 'react';
import { usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { CommonType } from './type';

export interface InnerTitleClasses {
  wrapper: string;
  wrapperOpen: string;
  wrapperSmall: string;
  wrapperLarge: string;
  title: string;
  place: string;
  content: string;
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
  const { innerTitle, open, placeTitle, size, jssStyle } = props;
  const innerTitleStyle = jssStyle?.innerTitle?.();
  const renderInput = usePersistFn((el: React.ReactElement) => {
    if (!innerTitle) return el;
    return (
      <div
        className={classNames(
          innerTitleStyle?.wrapper,
          !!open && innerTitleStyle?.wrapperOpen,
          size === 'small' && innerTitleStyle?.wrapperSmall,
          size === 'large' && innerTitleStyle?.wrapperLarge,
        )}
      >
        <div className={classNames(innerTitleStyle?.title, props.titleClassName)}>{innerTitle}</div>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={open ? { paddingTop: 0, paddingBottom: 0 } : undefined}
          className={classNames(
            innerTitleStyle?.title,
            innerTitleStyle?.place,
            props.titleClassName,
          )}
        >
          {placeTitle || innerTitle}
        </div>
        <div className={innerTitleStyle?.content}>{el}</div>
      </div>
    );
  });
  return renderInput;
};

export default useInnerTitle;
