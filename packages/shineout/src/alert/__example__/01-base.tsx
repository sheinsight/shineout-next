/**
 * cn - 基本用法
 *    -- 提示框基本用法，在页面内用于展示重要提示信息
 * en - Basic
 *    -- The basic usage of Alert, used to display important prompt information in the page
 */
import React from 'react';
import { Alert } from 'shineout';


export default () => {
  return (
    <Alert icon type='info'>
      This is a line of important text for alerting purposes
    </Alert>
  );
};
