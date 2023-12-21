// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type BreadcrumbClasses = {
  wrapper: string;
};
export type BreadcrumbClassType = keyof BreadcrumbClasses;

const breadcrumbStyle: JsStyles<BreadcrumbClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default breadcrumbStyle;
