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
  return (
    <div>
      <Alert jssStyle={{ alert: useAlertStyle }} type='confirmwarning' icon>
        23333
      </Alert>
      <br />
      <Alert jssStyle={{ alert: useAlertStyle }} type='warning' icon>
        23333
      </Alert>
      <br />
      <Alert jssStyle={{ alert: useAlertStyle }} type='danger' icon>
        23333
      </Alert>
      <br />
      <Alert jssStyle={{ alert: useAlertStyle }} type='error' icon>
        23333
      </Alert>
    </div>
  );
};
