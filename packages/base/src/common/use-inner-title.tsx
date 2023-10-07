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
    innerTitle?: InnerTitleClasses;
  };
}

const useInnerTitle = (props: InnerTitleProps) => {
  const { innerTitle, open, placeTitle, size, jssStyle } = props;
  const renderInput = usePersistFn((el: React.ReactElement) => {
    if (!innerTitle) return el;
    return (
      <div
        className={classNames(
          jssStyle?.innerTitle?.wrapper,
          !!open && jssStyle?.innerTitle?.wrapperOpen,
          size === 'small' && jssStyle?.innerTitle?.wrapperSmall,
          size === 'large' && jssStyle?.innerTitle?.wrapperLarge,
        )}
      >
        <div className={classNames(jssStyle?.innerTitle?.title, props.titleClassName)}>
          {innerTitle}
        </div>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={open ? { paddingTop: 0, paddingBottom: 0 } : undefined}
          className={classNames(
            jssStyle?.innerTitle?.title,
            jssStyle?.innerTitle?.place,
            props.titleClassName,
          )}
        >
          {placeTitle || innerTitle}
        </div>
        <div className={jssStyle?.innerTitle?.content}>{el}</div>
      </div>
    );
  });
  return renderInput;
};

export default useInnerTitle;
