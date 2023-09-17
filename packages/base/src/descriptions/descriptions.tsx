import React from 'react';
import { DescriptionsProps } from './descriptions.type';
import classNames from 'classnames';

const Descriptions = (props: DescriptionsProps) => {
  const { className, jssStyle, style } = props;

  const rootClassName = classNames(className, jssStyle?.descriptions.wrapper);

  return <div className={rootClassName} style={style}></div>;
};

export default Descriptions;
