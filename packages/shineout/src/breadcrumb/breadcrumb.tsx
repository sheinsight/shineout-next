import React from 'react';
import { Breadcrumb } from '@sheinx/base';
import { useBreadcrumbStyle, usePopoverStyle, useTooltipStyle } from '@sheinx/shineout-style';
import type { BreadcrumbProps, BreadcrumbData } from './breadcrumb.type';

const jssStyle = {
  breadcrumb: useBreadcrumbStyle,
  popover: usePopoverStyle,
  tooltip: useTooltipStyle,
};
export default <Item = BreadcrumbData,>(props: BreadcrumbProps<Item>) => {
  return <Breadcrumb jssStyle={jssStyle} {...props} />;
};
