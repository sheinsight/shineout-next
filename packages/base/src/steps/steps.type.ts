// import React from 'react';
import { BaseStepProps, StepProps } from './step.type';
import { CommonType } from '../common/type';

export type StepsStatusType = 'wait' | 'process' | 'finish' | 'error';

export type StepsClasses = {
  steps: string;
  step: string;
  small: string;
  large: string;
  disabled: string;
  content: string;
  title: string;
  horizontalLabel: string;
  verticalLabel: string;
  tail: string;
  description: string;
  vertical: string;
  horizontal: string;
  wait: string;
  process: string;
  finish: string;
  error: string;
  icon: string;
  iconWrapper: string;
  dot: string;
  arrow: string;
  widthDescription: string;
  default: string;
  click: string;
};

export type JssStyleType = {
  steps: () => StepsClasses;
};

export interface StepsProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: JssStyleType;
  /**
   * @en Children
   * @cn 子元素
   */
  children: React.ReactNode;
  /**
   * @en The direction of the steps
   * @cn 步骤条方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @en The type of the steps
   * @cn 节点样式类型
   * @default 'default'
   */
  type?: 'default' | 'dot' | 'arrow';
  /**
   * @en The label placement of the steps
   * @cn 标签描述文字放置的位置
   * @default 'vertical'
   */
  labelPlacement?: 'horizontal' | 'vertical';
  /**
   * @en The status of the current step node
   * @cn 当前步数节点状态
   */
  status?: StepsStatusType;
  /**
   * @en The current step number
   * @cn 当前步数
   * @default 0
   */
  current?: number;
  /**
   * @en Custom node icon
   * @cn 自定义节点图标
   */
  renderIcon?: (index: number, status?: StepsStatusType) => React.ReactNode;
  /**
   * @en Step switch callback, configure this property to make the step bar clickable
   * @cn 步骤切换的回调,配置该属性可让步骤条可点击
   */
  onChange?: (index: number) => void;
}

export interface StepStyleProps
  extends Pick<
      BaseStepProps,
      'jssStyle' | 'size' | 'status' | 'title' | 'description' | 'renderIcon'
    >,
    Pick<StepProps, 'labelPlacement' | 'direction'> {
  index: number;
  onChange?: (e: React.MouseEvent<HTMLElement>) => void;
}
