/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Breadcrumb } from '@sheinx/base';
import { useBreadcrumbStyle } from '@sheinx/shineout-style';

const jssStyle = {
  breadcrumb: useBreadcrumbStyle,
};

export default () => {
  return (
    <div>
      <Breadcrumb jssStyle={jssStyle} />
    </div>
  );
};
