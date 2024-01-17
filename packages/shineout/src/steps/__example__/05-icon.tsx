/**
 * cn - 自定义图标
 *    -- 通过`renderIcon`属性可以自定义渲染步骤条节点的图标
 * en - Custom icon
 *    -- Set custom icon by `renderIcon` property
 */
import React from 'react';
import { Steps } from 'shineout';
import { successIcon, warningIcon, iconWait } from './static/icon';

export default () => {
  const renderIcon = (index: number, status: any) => {
    if (status === 'wait') {
      return iconWait;
    }
    if (status === 'finish') {
      return successIcon;
    }
    if (status === 'process') {
      return warningIcon;
    }
    return index + 1;
  };
  return (
    <div>
      <Steps current={1} renderIcon={renderIcon}>
        <Steps.Step title='Step1' />
        <Steps.Step title='Step2' />
        <Steps.Step title='Step3' />
        <Steps.Step title='Step4' />
      </Steps>
    </div>
  );
};
