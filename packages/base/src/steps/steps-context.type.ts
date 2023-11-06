import { StepsProps, StepsStatusType } from './steps.type';

export interface StepsContextProps
  extends Pick<
    StepsProps,
    'jssStyle' | 'labelPlacement' | 'current' | 'direction' | 'size' | 'type' | 'onChange'
  > {
  currentStatus?: StepsStatusType;
}
