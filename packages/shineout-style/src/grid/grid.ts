import { JsStyles } from '../jss-style';
import { GridClasses } from '@sheinx/base';

const gridStyle: JsStyles<keyof GridClasses> = {
  rootClass: {},
  wrapper: {
    position: 'relative',
    display: 'inline-block',
    zoom: 1,
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    verticalAlign: 'top',
    textRendering: 'auto',
    boxSizing: 'border-box',
  },
  full: {
    width: '100%',
  },
};

export default gridStyle;
