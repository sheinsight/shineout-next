import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SliderClasses = {
  wrapper: string;
  track: string;
  trackInner: string;
  indicator: string;
  indicatorStart: string;
  indicatorEnd: string;
  scaleWrapper: string;
  scale: string;
  label: string;
  indicatorActive: string;
  startValue: string;
  endValue: string;
  autoHide: string;
  disabled: string;
  vertical: string;
  value: string;
};
export type SliderClassType = keyof SliderClasses;

const sliderStyle: JsStyles<SliderClassType> = {
  wrapper: {
    display: 'block',
    padding: `20px 10px`,
    fontSize: token.sliderFontSize,
    position: 'relative',
    zIndex: 0,
  },
  autoHide: {
    '&:not(:hover)': {
      '& $startValue, & $endValue, & $scaleWrapper': {
        visibility: 'hidden',
      },
    },
  },
  disabled: {},
  vertical: {
    display: 'inline-flex',
    padding: `10px 70px 10px 20px`,
  },
  track: {
    borderRadius: '100px',
    height: token.sliderTrackSize,
    boxSizing: 'border-box',
    backgroundColor: token.sliderTrackBackgroundColor,
    position: 'relative',
    '$vertical &': {
      width: token.sliderTrackSize,
      height: '100%',
    },
  },
  trackInner: {
    position: 'absolute',
    borderRadius: 'inherit',
    top: '0',
    left: '0',
    right: '100%',
    height: '100%',
    backgroundColor: token.sliderTrackActiveBackgroundColor,
    '$vertical &': {
      width: '100%',
      height: 'unset',
      left: 0,
      bottom: '100%',
    },
    '$disabled &': {
      backgroundColor: token.sliderTrackDisabledBackgroundColor,
    },
  },
  indicator: {
    position: 'absolute',
    zIndex: 100,
    width: token.sliderIndicatorSize,
    height: token.sliderIndicatorSize,
    backgroundColor: token.sliderIndicatorBackgroundColor,
    borderRadius: '50%',
    borderWidth: token.sliderIndicatorBorderSize,
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderColor: token.sliderIndicatorBorderColor,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: token.sliderIndicatorActiveBackgroundColor,
    },
    '$disabled &': {
      backgroundColor: token.sliderIndicatorDisabledBackgroundColor,
      borderColor: token.sliderIndicatorDisabledBorderColor,
      cursor: 'not-allowed',
    },
  },
  indicatorActive: {
    zIndex: 101,
    backgroundColor: token.sliderIndicatorActiveBackgroundColor,
  },
  indicatorStart: {
    '$wrapper:not($vertical) &': {
      left: 0,
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '$vertical &': {
      left: '50%',
      top: 0,
      transform: 'translate(-50%, -50%)',
    },
  },
  indicatorEnd: {
    '$wrapper:not($vertical) &': {
      right: 0,
      top: '50%',
      transform: 'translate(50%, -50%)',
    },
    '$vertical &': {
      left: '50%',
      bottom: 0,
      transform: 'translate(-50%, 50%)',
    },
  },
  value: {
    position: 'absolute',
    userSelect: 'none',
    lineHeight: 1,
    zIndex: 100,
    backgroundColor: token.sliderValueBackgroundColor,
    '$indicatorActive  + &': {
      zIndex: 101,
    },
  },
  startValue: {
    '$wrapper:not($vertical) &': {
      left: 0,
      bottom: '100%',
      transform: 'translate(-50%, -10px)',
    },
    '$vertical &': {
      top: 0,
      left: '100%',
      transform: 'translate(10px, -50%)',
      padding: '1px 4px',
    },
  },
  endValue: {
    '$wrapper:not($vertical) &': {
      right: 0,
      bottom: '100%',
      transform: 'translate(50%, -10px)',
    },
    '$vertical &': {
      bottom: 0,
      left: '100%',
      transform: 'translate(10px, 50%)',
      padding: '1px 4px',
    },
  },
  scaleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '$vertical &': {
      flexDirection: 'column',
    },
  },
  scale: {
    position: 'relative',
    '&::before': {
      content: '""',
      display: 'block',
      backgroundColor: '#ccc',
    },
    '$wrapper:not($vertical) &': {
      marginTop: token.sliderScaleMarginY,
      width: 0,
      '&::before': {
        width: '1px',
        height: token.sliderScaleLineSize,
        transform: 'translateX(-50%)',
      },
    },
    '$vertical &': {
      marginLeft: token.sliderScaleMarginY,
      height: 0,
      '&::before': {
        height: '1px',
        width: token.sliderScaleLineSize,
        transform: 'translateY(-50%)',
      },
    },
  },
  label: {
    position: 'absolute',
    fontSize: token.sliderScaleFontSize,
    userSelect: 'none',
    '$wrapper:not($vertical) &': {
      transform: 'translate(-50%)',
      lineHeight: token.lineHeightDynamic,
    },
    '$vertical &': {
      top: 0,
      left: '100%',
      lineHeight: 1,
      transform: 'translate(4px, -50%)',
    },
  },
};

export default sliderStyle;
