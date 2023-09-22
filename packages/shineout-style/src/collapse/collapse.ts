// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type CollapseClass = 'wrapper' | 'borderLess';

const collapseStyle: JsStyles<CollapseClass> = {
  wrapper: {
    overflow: 'hidden',
    borderRadius: '4px',
    border: '1px solid rgb(201,205,212)',
    lineHeight: '1.5715',
  },
  borderLess: {
    border: 'none',
  },
};

export default collapseStyle;
