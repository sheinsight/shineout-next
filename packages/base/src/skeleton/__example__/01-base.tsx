/**
* cn - 基本用法
*    --
* en - Basic
*    --
 */
import React from 'react';
import { Skeleton } from '@sheinx/base';
import { useSkeletonStyle } from '@sheinx/shineout-style';

const jssStyle = {
  skeleton: useSkeletonStyle
}

export default () => {
  return (
    <div>
      <Skeleton jssStyle={jssStyle} />
    </div>
  );
};
