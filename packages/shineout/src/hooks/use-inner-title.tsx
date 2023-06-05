import React from 'react';
import { usePersistFn } from '@shined/hooks';
import { useInnerTitleStyle } from '@shined/shineout-style';
import classNames from 'classnames';

interface InnerTitleProps {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  open?: boolean;
}

const useInnerTitle = (props: InnerTitleProps) => {
  const { innerTitle, open, placeTitle } = props;
  const jssStyle = useInnerTitleStyle();
  const renderInput = usePersistFn((el: React.ReactElement) => {
    if (!innerTitle) return el;
    return (
      <div
        className={classNames({
          [jssStyle.wrapper]: true,
          [jssStyle.wrapperOpen]: open,
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
