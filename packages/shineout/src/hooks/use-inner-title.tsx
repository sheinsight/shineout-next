import React from 'react';
import { usePersistFn } from '@sheinx/hooks';
import { useInnerTitleStyle } from '@sheinx/shineout-style';
import classNames from 'classnames';

import { InputProps as UiInputProps } from '@sheinx/base';

interface InnerTitleProps {
  innerTitle?: React.ReactNode;
  placeTitle?: React.ReactNode;
  open?: boolean;
  size?: UiInputProps['size'];
}

const useInnerTitle = (props: InnerTitleProps) => {
  const { innerTitle, open, placeTitle, size } = props;
  const jssStyle = useInnerTitleStyle();
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
