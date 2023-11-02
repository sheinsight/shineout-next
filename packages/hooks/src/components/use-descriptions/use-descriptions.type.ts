import React from 'react';

export interface DescriptionsItemProps {
  key?: React.Key;
  label?: React.ReactNode;
  value?: React.ReactNode;
  span?: number;
  ItemLabelStyle?: React.CSSProperties;
  ItemValueStyle?: React.CSSProperties;
}
export interface BaseDescriptionsProps {
  item?: DescriptionsItemProps[];
  labelStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
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
