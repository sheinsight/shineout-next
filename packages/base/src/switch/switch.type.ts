import React from 'react';
import { BaseCheckProps } from '@sheinx/hooks';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type SwitchSemanticKey = 'root' | 'indicator' | 'content';

export interface SwitchClasses {
  rootClass: string;
  /**
   * 最外层class
   */
  wrapper: string;
  wrapperSmall: string;
  wrapperLarge: string;
  indicator: string;
  content: string;
  wrapperChecked: string;
  wrapperDisabled: string;
  loading: string;
  textPadding: string;
}

export interface SwitchProps
  extends Omit<BaseCheckProps, 'defaultChecked'>,
    Pick<CommonType, 'style' | 'className' | 'size'> {
  jssStyle?: {
    switch?: () => SwitchClasses;
  };
  /**
   * @en Semantic DOM classNames for internal nodes.
   * @cn 语义化 DOM 类名，用于定制内部节点样式。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<SwitchSemanticKey>;
  /**
   * @en Semantic DOM styles for internal nodes.
   * @cn 语义化 DOM 行内样式，用于定制内部节点样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<SwitchSemanticKey>;
  /**
   * @en Content with checked and unchecked
   * @cn 选中和未选中时的内容
   */
  content?: [React.ReactNode, React.ReactNode];
  /**
   * @en Loading
   * @cn 加载中
   * @default false
   */
  loading?: boolean;
  /**
   * @en Set while no checked
   * @cn Checked 未设置的情况下， checked = value
   */
  value?: boolean;
  /**
   * @en Default value,same type as value
   * @cn 默认值 和 value 类型相同
   */
  defaultValue?: boolean;
  /**
   * @en Change callback, Checked means selected status
   * @cn 改变回调,Checked 表示选中状态
   */
  onChange?: (value: boolean) => void;
  beforeChange?: (value: boolean) => boolean | undefined;
}
