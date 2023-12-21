import React from 'react';
import { Breadcrumb } from '@sheinx/base';
import { useBreadcrumbStyle } from '@sheinx/shineout-style';
import { BreadcrumbProps } from './breadcrumb.type';

const jssStyle = {
  breadcrumb: useBreadcrumbStyle,
};
export default (props: BreadcrumbProps) => {
  return <Breadcrumb jssStyle={jssStyle} {...props} />;
};
