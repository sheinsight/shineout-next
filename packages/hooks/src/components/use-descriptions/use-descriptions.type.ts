import React, { CSSProperties, ReactNode } from 'react';

export interface DescriptionsItemProps {
  key?: React.Key;
  label?: ReactNode;
  value?: ReactNode;
  span?: number;
  labelStyle?: CSSProperties;
  valueStyle?: CSSProperties;
}
export interface BaseDescriptionsProps {
  item?: DescriptionsItemProps[];
  column?:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
        xxxl?: number;
      };
}
