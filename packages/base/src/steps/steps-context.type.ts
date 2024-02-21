import { StepsProps, StepsStatusType } from './steps.type';

export interface StepsContextProps
  extends Pick<
    StepsProps,
    'jssStyle' | 'labelPlacement' | 'current' | 'direction' | 'size' | 'type' | 'onChange'
  > {
  /**
   * @en Current step node status
   * @cn 当前步数节点状态
   */
  currentStatus?: StepsStatusType;
}
