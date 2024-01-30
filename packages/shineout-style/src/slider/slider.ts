import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SliderClasses = {
  wrapper: string;
  track: string;
  trackInner: string;
  indicator: string;
  indicatorStart: string;
  indicatorEnd: string;
  indicatorHover: string;
  scaleWrapper: string;
  scale: string;
  label: string;
  indicatorActive: string;
  startValue: string;
  valueHover: string;
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
    cursor: 'pointer',
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

    '&::after': {
      content: '""',
      display: 'block',
      width: token.sliderIndicatorSize,
      height: token.sliderIndicatorSize,
      backgroundColor: token.sliderIndicatorBackgroundColor,
      borderRadius: '50%',
      borderWidth: token.sliderIndicatorBorderSize,
      boxSizing: 'border-box',
      borderStyle: 'solid',
      borderColor: token.sliderIndicatorBorderColor,
      cursor: 'pointer',
    },
    '&:hover::after, $indicatorActive&::after': {
      transform: 'scale(1.16666667)',
      boxShadow: token.sliderIndicatorActiveShadow,
    },
    '$disabled &::after': {
      backgroundColor: token.sliderIndicatorDisabledBackgroundColor,
      borderColor: token.sliderIndicatorDisabledBorderColor,
      cursor: 'not-allowed',
    },
    '$disabled &:not($indicatorHover)::after': {
      transform: 'scale(1)',
      boxShadow: 'none',
    },
  },
  indicatorActive: {
    zIndex: 101,
  },
  indicatorHover: {},
  indicatorStart: {
    '$wrapper:not($vertical) &': {
      left: 0,
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '$vertical &': {
      left: '50%',
      bottom: 0,
      transform: 'translate(-50%, 50%)',
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
      top: 0,
      transform: 'translate(-50%, -50%)',
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
      bottom: 0,
      left: '100%',
      transform: 'translate(10px, 50%)',
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
      top: 0,
      left: '100%',
      transform: 'translate(10px, -50%)',
      padding: '1px 4px',
    },
  },
  valueHover: {
    backgroundColor: token.sliderValueHoverBakgroundColor,
    color: token.sliderValueHoverFontColor,
    padding: `${token.sliderValueHoverPaddingY} ${token.sliderValueHoverPaddingX}`,
    lineHeight: token.lineHeightDynamic,
    borderRadius: token.sliderValueHoverRadius,
    opacity: 0,
    transition: 'opacity 0.2s',
    // 下方三角
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '4px',
      borderColor: `${token.sliderValueHoverBakgroundColor} transparent transparent transparent`,
    },
    '$vertical &': {
      '&::after': {
        top: '50%',
        right: '100%',
        left: 'unset',
        transform: 'translate(0, -50%)',
        borderColor: `transparent ${token.sliderValueHoverBakgroundColor} transparent transparent `,
      },
    },
    '$indicator:hover + &, $indicatorActive  + &': {
      opacity: 1,
    },
  },

  scaleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '$vertical &': {
      flexDirection: 'column-reverse',
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
    color: token.sliderScaleFontColor,
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
