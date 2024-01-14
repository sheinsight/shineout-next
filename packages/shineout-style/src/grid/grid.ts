// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type GridClasses = {
  wrapper: string;
};
export type GridClassType = keyof GridClasses;

const gridStyle: JsStyles<GridClassType> = {
  wrapper: {
    display: 'block',
  },
};

export default gridStyle;
