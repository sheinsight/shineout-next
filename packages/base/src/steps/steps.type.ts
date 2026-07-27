// import React from 'react';
import { BaseStepProps, StepProps } from './step.type';
import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type StepsStatusType = 'wait' | 'process' | 'finish' | 'error';

/**
 * Steps Semantic DOM key 列表（容器 + 子项统一定义）
 * - root:        Steps 最外层容器
 * - step:        单个步骤的外层容器
 * - tail:        步骤之间的连接线（default / dot 类型）
 * - icon:        图标/数字区域（default / dot 类型）
 * - title:       标题文字
 * - description: 描述文字
 * - content:     内容容器（包裹 title + description）
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type StepsSemanticKey = 'root' | 'step' | 'tail' | 'icon' | 'title' | 'description' | 'content';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface StepsClassNamesInfo {
  /**
   * @cn 步骤条样式类型
   * @en Steps type
   */
  type: 'default' | 'dot' | 'arrow';
  /**
   * @cn 步骤条方向
   * @en Steps direction
   */
  direction: 'horizontal' | 'vertical';
}

export type StepsClasses = {
  rootClass: string;
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
  arrowIcon: string;
  withDescription: string;
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
  /**
   * @en Whether the current step node is disabled
   * @cn 当前步骤节点是否被禁用，支持传入函数进行判断。优先级低于 Step 上的 disabled
   */
  disabled?: boolean | ((index: number, id: any) => boolean);

  /**
   * @en Semantic DOM classNames for internal nodes (root / step / tail / icon / title / description / content).
   *     Accepts a static string or a function receiving a state snapshot.
   * @cn 语义化 DOM 类名，可精准定制内部节点（root / step / tail / icon / title / description / content）。
   *     值可为静态字符串或接收状态快照的函数。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<StepsSemanticKey, StepsClassNamesInfo>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / step / tail / icon / title / description / content).
   * @cn 语义化 DOM 内联样式，可精准定制内部节点（root / step / tail / icon / title / description / content）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<StepsSemanticKey>;
}

export interface StepStyleProps
  extends Pick<
      BaseStepProps,
      'jssStyle' | 'size' | 'status' | 'title' | 'description' | 'renderIcon'
    >,
    Pick<StepProps, 'labelPlacement' | 'direction'> {
  index: number;
  onChange?: (e: React.MouseEvent<HTMLElement>) => void;
  semClass: import('../common/use-semantic').SemanticClassFn<StepsSemanticKey>;
  semStyle: import('../common/use-semantic').SemanticStyleFn<StepsSemanticKey>;
}
