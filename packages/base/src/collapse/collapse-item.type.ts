import { CommonType } from '../common/type';

export interface CollapseItemClasses {
  /**
   * 最外层class
   */
  wrapper: string;
}

export interface CollapseItemProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    collapseItem: CollapseItemClasses;
  };
}
