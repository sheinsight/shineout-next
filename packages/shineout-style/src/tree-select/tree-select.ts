// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TreeSelectClasses = {
  wrapper: string;
};
export type TreeSelectClassType = keyof TreeSelectClasses;

const treeSelectStyle: JsStyles<TreeSelectClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default treeSelectStyle;
