/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Descriptions } from '@sheinx/base';
import { useDescriptionsStyle } from '@sheinx/shineout-style';

export default () => {
  const descriptionsStyle = useDescriptionsStyle();
  return (
    <div>
      <Descriptions jssStyle={{ descriptions: descriptionsStyle }} />
    </div>
  );
};
