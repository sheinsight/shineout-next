import { JsStyles } from '../jss-style';
import CssVar from '../cssvar';

type FormClass = 'wrapper' | 'wrapperInline';

const form: JsStyles<FormClass> = {
  wrapper: {
    display: 'block',
  },
  wrapperInline: {
    '& [data-type="so-input"]': {
      width: 'auto',
    },
    '& > [data-type="so-input"]': {
      marginRight: CssVar.formItemMarginRight,
    },
  },
};

export default form;
