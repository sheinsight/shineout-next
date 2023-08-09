import { CommonType } from '../common/type';

export type TagClasses = '';

export interface BaseTagProps extends Pick<CommonType, 'style' | 'className'> {
  jssStyle: {
    tag?: TagClasses;
  };
}

export type TagProps = BaseTagProps;
