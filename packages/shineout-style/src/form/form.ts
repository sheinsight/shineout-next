import { JsStyles } from '../jss-style';
import CssVar from '../cssvar';

export type FormClass = 'wrapper' | 'wrapperInline';

const form: JsStyles<FormClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperInline: {
    '& [data-soui-input-border]': {
      width: 'auto',
    },
    '& > [data-soui-input-border]': {
      marginRight: CssVar.formItemMarginRight,
    },
  },
};

export default form;
