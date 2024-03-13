import { JsStyles } from '../jss-style';
import token from '@sheinx/theme';
import { FormClasses } from '@sheinx/base';

const form: JsStyles<keyof FormClasses> = {
  wrapper: {
    display: 'block',
  },
  wrapperInline: {
    '& [data-soui-input-border]': {
      width: 'auto',
    },
    '& > [data-soui-input-border]': {
      marginRight: token.formItemMarginXEnd,
    },
  },
};

export default form;
