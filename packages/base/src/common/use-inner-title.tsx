import React from 'react';
import { usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { CommonType } from './type';

export interface InnerTitleClass {
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
  jssStyle?: {
    innerTitle?: InnerTitleClass;
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
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        <div className={jssStyle?.innerTitle?.title}>{innerTitle}</div>
        <div className={classNames(jssStyle?.innerTitle?.title, jssStyle?.innerTitle?.place)}>
          {placeTitle || innerTitle}
        </div>
        <div className={jssStyle?.innerTitle?.content}>{el}</div>
      </div>
    );
  });
  return renderInput;
};

export default useInnerTitle;
