import { WatermarkClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';

const watermarkStyle: JsStyles<keyof WatermarkClasses> = {
  rootClass: {},
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
};

export default watermarkStyle;
