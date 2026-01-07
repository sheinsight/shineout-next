/**
 * cn - 分段式进度条
 *    -- 设置 `success` 可以用于细化进度展示
 * en - Success Segment
 *    -- Segment progress, can be used to refine progress display
 */
import React from 'react';
import { Progress, Tooltip, Gap } from 'shineout';

export default () => {
  return <Gap style={{ width: 400, flexDirection: 'column' }}>
    <Tooltip tip="30% success in 60%" position='top'>
      <Progress value={60} success={{ value: 30 }} />
    </Tooltip>
    <Tooltip tip="30% success in 60%" position='top'>
      <Progress value={60} success={{ value: 30, color: 'var(--soui-success-6,#00A85F)'}} shape='circle' />
    </Tooltip>
    </Gap>;
};
