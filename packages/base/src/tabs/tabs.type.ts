// import React from 'react';
import { CommonType } from '../common/type';
import { BaseTabsProps, TabsShapeType } from '@sheinx/hooks';

export interface TabsClasses {
  tabs: string;
  tab: string;
  panel: string;
  header: string;
  vertical: string;
  verticalLeft: string;
  verticalRight: string;
}

export type TabsAlignType = 'left' | 'right' | 'bottom' | 'vertical-left' | 'vertical-right';

export interface TabsProps extends BaseTabsProps, Pick<CommonType, 'className' | 'style'> {
  jssStyle: {
    tabs: TabsClasses;
  };
  shape?: TabsShapeType;
  children?: React.ReactNode;
  align?: TabsAlignType;
  autoFill?: boolean;
  onChange?: (key: string | number) => void;
}
