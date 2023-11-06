import { CommonType } from '../common/type';
import { JssStyleType, StepsStatusType } from './steps.type';
import { StepsContextProps } from './steps-context.type';

export interface BaseStepProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: JssStyleType;
  /**
   * @description  wait: 等待中，process: 进行中，finish: 已完成，error: 出错
   */
  id?: any;
  status?: StepsStatusType;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  disabled?: boolean | ((index: number) => boolean);
  description?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>, index: number, id: any) => void;
}

export interface StepProps extends Omit<StepsContextProps, 'current'>, BaseStepProps {
  index?: number;
  current?: number;
}
