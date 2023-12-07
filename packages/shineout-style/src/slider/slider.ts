// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SliderClasses = {
  wrapper: string;
  trunck: string;
  trunckInner: string;
  indicator: string;
};
export type SliderClassType = keyof SliderClasses;

const sliderStyle: JsStyles<SliderClassType> = {
  wrapper: {
    display: 'block',
  },
  trunck: {
    borderRadius: '4px',
    height: '6px',
    boxSizing: 'border-box',
    backgroundColor: '#ccc',
    position: 'relative',
  },
  trunckInner: {
    position: 'absolute',
    borderRadius: 'inherit',
    top: 0,
    left: '50%',
    right: '10%',
    height: '100%',
    backgroundColor: 'blue',
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '20px',
    height: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default sliderStyle;
