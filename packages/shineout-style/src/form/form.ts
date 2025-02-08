import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { FormClasses } from '@sheinx/base';

const form: JsStyles<keyof FormClasses> = {
  rootClass: {},
  wrapper: {
    // display: 'block',
  },
  wrapperInline: {
    '& [data-soui-input-border]': {
      width: 'auto',
    },
    '& > [data-soui-input-border]': {
      marginRight: token.formItemMarginXEnd,
    },
    '& > button[type="submit"], & > button[type="reset"]': {
      verticalAlign: 'top',
    }
  },
};

export default form;
