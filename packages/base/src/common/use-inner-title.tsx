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
  jssStyle: InnerTitleClass;
}

const useInnerTitle = (props: InnerTitleProps) => {
  const { innerTitle, open, placeTitle, size, jssStyle } = props;
  const renderInput = usePersistFn((el: React.ReactElement) => {
    if (!innerTitle) return el;
    return (
      <div
        className={classNames({
          [jssStyle.wrapper]: true,
          [jssStyle.wrapperOpen]: open,
          [jssStyle.wrapperSmall]: size === 'small',
          [jssStyle.wrapperLarge]: size === 'large',
        })}
      >
        <div className={jssStyle.title}>{innerTitle}</div>
        <div className={classNames(jssStyle.title, jssStyle.place)}>{placeTitle || innerTitle}</div>
        <div className={jssStyle.content}>{el}</div>
      </div>
    );
  });
  return renderInput;
};

export default useInnerTitle;
