/**
 * cn - 自定义图标和文案
 *    -- 设置`icon`和`description`属性可以自定义图标和文案
 * en - Custom icon and description
 *    -- Set the `icon` and `description` property to customize the icon and description
 */
import React from 'react';
import { Empty } from 'shineout';
import { customIcon } from './static/icon';

export default () => {
  return <Empty icon={customIcon} description='No network'></Empty>;
};
