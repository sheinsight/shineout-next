/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Alert } from '@sheinx/base';
import { useAlertStyle } from '@sheinx/shineout-style';

export default () => {
  const alertStyle = useAlertStyle();
  return (
    <div>
      <Alert jssStyle={{ alert: alertStyle }} />
    </div>
  );
};
