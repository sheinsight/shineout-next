import { CommonType } from '../common/type';
import { JssStyleType } from './steps.type';

export interface StepProps extends Pick<CommonType, 'className' | 'style' | 'size'> {
  jssStyle?: JssStyleType;
  /**
   * @description  wait: 等待中，process: 进行中，finish: 已完成，error: 出错
   */
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>, index: number, id: any) => void;
}
