import { CommonType } from '../common/type';
import { JssStyleType, StepsStatusType } from './steps.type';
import { StepsContextProps } from './steps-context.type';

export interface BaseStepProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: JssStyleType;
  /**
   * @description  wait: 等待中，process: 进行中，finish: 已完成，error: 出错
   */
  /**
   * @en The id of the current step node, which can be used for click callback
   * @cn 当前节点id,可用于点击回调
   */
  id?: any;
  /**
   * @en The status of the current step node
   * @cn 节点状态
   */
  status?: StepsStatusType;
  /**
   * @en Custom node icon
   * @cn 自定义节点图标
   */
  renderIcon?: (index: number, status?: StepsStatusType) => React.ReactNode;
  /**
   * @en The title of the current step node
   * @cn 节点标题
   */
  title?: React.ReactNode | ((index: number, status: StepsStatusType) => React.ReactNode);
  /**
   * @en Node class name
   * @cn 节点类名
   */
  className?: string;
  /**
   * @en Whether the current step node is disabled
   * @cn 当前步骤节点是否被禁用，优先级高于 Steps 的 disabled
   */
  disabled?: boolean;
  /**
   * @en The description of the current step node
   * @cn 节点描述
   */
  description?: React.ReactNode;
  /**
   * @en Click callback
   * @cn 点击回调
   */
  onClick?: (e: React.MouseEvent<HTMLElement>, index: number, id: any) => void;
}

export interface StepProps extends Omit<StepsContextProps, 'current' | 'disabled'>, BaseStepProps {
  /**
   * @en The index of the current step node
   * @cn 当前节点索引
   */
  index?: number;
  /**
   * @en Current number of steps
   * @cn 当前步数
   */
  current?: number;
}

export interface StepPropsWidthContext extends Omit<StepProps, 'disabled'> {
  /**
   * @en Whether the current step node is disabled
   * @cn 当前步骤节点是否被禁用
   */
  disabled?: boolean | ((index: number, id?: any) => boolean);
}
