import { TabsPanelProps as UnStyleTabsPanelProps } from '@sheinx/base';

/**
 * @title Tabs.Panel
 * @sort 2
 */
export type TabsPanelProps = Omit<
  UnStyleTabsPanelProps,
  | 'jssStyle'
  | 'active'
  | 'shape'
  | 'isVertical'
  | 'lazy'
  | 'inactiveBackground'
  | 'onChange'
  | 'onCollapsible'
  | 'setTabs'
  | 'tabs'
  | 'index'
>;
