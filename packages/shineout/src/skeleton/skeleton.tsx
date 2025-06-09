import React from 'react';
import { Skeleton } from '@sheinx/base';
import { useSkeletonStyle } from '@sheinx/shineout-style';
import { SkeletonProps } from './skeleton.type';


const jssStyle = {
    skeleton: useSkeletonStyle
}
export default (props: SkeletonProps) => {
    return (
        <Skeleton
            jssStyle={jssStyle}
            {...props}
        />
  );
}
