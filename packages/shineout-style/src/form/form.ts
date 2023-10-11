import { JsStyles } from '../jss-style';
import CssVar from '../cssvar';

export type FormClass = 'wrapper' | 'wrapperInline';

const form: JsStyles<FormClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperInline: {
    '& [data-soui-type="input"]': {
      width: 'auto',
    },
    '& > [data-soui-type="input"]': {
      marginRight: CssVar.formItemMarginRight,
    },
  },
};

export default form;
