// import token from '@sheinx/theme';
import {JsStyles} from '../jss-style';

export type EditableAreaClass = 'wrapper' | 'wrapperDisabled';

const editableAreaStyle: JsStyles<EditableAreaClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperDisabled: {},
};

export default editableAreaStyle;
