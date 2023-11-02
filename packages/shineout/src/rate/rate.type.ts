import { RateProps as UnStyledRateProps } from '@sheinx/base';

/**
 * @title RateFunction
 * @subTitle (background, front): ReactClass
 */
export interface ArgProps {
  /**
   * @en Unselected element background
   * @cn 未选中元素背景
   * @override ReactElement | string | Array<string | ReactElement>
   */
  background: Exclude<RateProps['background'], undefined>;
  /**
   * @en selected element background
   * @cn 选中元素背景
   * @override ReactElement | string | Array<string | ReactElement>
   */
  front: Exclude<RateProps['background'], undefined>;
}

/**
 * @title Rate
 */
export type RateProps = Omit<UnStyledRateProps, 'jssStyle'>;
