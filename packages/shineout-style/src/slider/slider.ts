import token from '@sheinx/theme';
import { SliderClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';

export type SliderClassType = keyof SliderClasses;

const verticalLabelMargin = 4;

const sliderStyle: JsStyles<SliderClassType> = {
  rootClass: {},
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
    height: token.sliderTrackSize,
    borderTop: `${token.sliderScaleMarginY} solid transparent`,
    borderBottom: `${token.sliderScaleMarginY} solid transparent`,
    boxSizing: 'content-box',
    position: 'relative',
    '$vertical &': {
      width: token.sliderTrackSize,
      height: '100%',
      borderLeft: `${token.sliderScaleMarginY} solid transparent`,
      borderRight: `${token.sliderScaleMarginY} solid transparent`,
    },
    '$disabled &': {
      cursor: 'not-allowed',
    }
  },
  trackBackground: {
    borderRadius: `calc(${token.sliderTrackSize} / 2)`,
    height: '100%',
    backgroundColor: token.sliderTrackBackgroundColor,
  },
  trackInner: {
    position: 'absolute',
    borderRadius: `calc(${token.sliderTrackSize} / 2)`,
    top: '0',
    left: '0',
    right: '100%',
    height: '100%',
    backgroundColor: token.sliderTrackActiveBackgroundColor,
    '$vertical &': {
      width: '100%',
      height: 'unset',
      '&[dir=ltr]': { left: 0 },
      '&[dir=rtl]': { right: 0 },
      bottom: '100%',
    },
    '$disabled &': {
      backgroundColor: token.sliderTrackDisabledBackgroundColor,
    },
  },
  indicator: {
    position: 'absolute',
    zIndex: 100,
    '&:hover::after': {
      borderColor: token.sliderIndicatorHoverBoderColor,
    },
    '&:active::after': {
      borderColor: token.sliderIndicatorBorderColor,
    },

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
      top: '50%',
      '&[dir=ltr]': {
        left: 0,
        transform: 'translate(-50%, -50%)',
      },
      '&[dir=rtl]': {
        right: 0,
        transform: 'translate(50%, -50%)',
      },
    },
    '$vertical &': {
      bottom: 0,
      '&[dir=ltr]': {
        left: '50%',
        transform: 'translate(-50%, 50%)',
      },
      '&[dir=rtl]': {
        right: '50%',
        transform: 'translate(50%, 50%)',
      },
    },
  },
  indicatorEnd: {
    '$wrapper:not($vertical) &': {
      top: '50%',
      '&[dir=ltr]': {
        right: 0,
        transform: 'translate(50%, -50%)',
      },
      '&[dir=rtl]': {
        left: 0,
        transform: 'translate(-50%, -50%)',
      },
    },
    '$vertical &': {
      top: 0,
      '&[dir=ltr]': {
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      '&[dir=rtl]': {
        right: '50%',
        transform: 'translate(50%, -50%)',
      },
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
      bottom: '100%',
      '&[dir=ltr]': {
        left: 0,
        transform: 'translate(-50%, -14px)',
      },
      '&[dir=rtl]': {
        right: 0,
        transform: 'translate(50%, -14px)',
      },
    },
    '$vertical &': {
      bottom: 0,
      padding: '1px 4px',
      '&[dir=ltr]': {
        left: '100%',
        transform: 'translate(14px, 50%)',
      },
      '&[dir=rtl]': {
        right: '100%',
        transform: 'translate(-14px, 50%)',
      },
    },
  },
  endValue: {
    '$wrapper:not($vertical) &': {
      bottom: '100%',
      '&[dir=ltr]': {
        right: 0,
        transform: 'translate(50%, -14px)',
      },
      '&[dir=rtl]': {
        left: 0,
        transform: 'translate(-50%, -14px)',
      },
    },
    '$vertical &': {
      top: 0,
      padding: '1px 4px',
      '&[dir=ltr]': {
        left: '100%',
        transform: 'translate(14px, -50%)',
      },
      '&[dir=rtl]': {
        right: '100%',
        transform: 'translate(-14px, -50%)',
      },
    },
  },
  valueHover: {
    backgroundColor: token.tooltipBackgroundColor,
    color: token.tooltipColor,
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
      borderColor: `${token.tooltipBackgroundColor} transparent transparent transparent`,
    },
    '$vertical &': {
      '&::after': {
        top: '50%',
        right: '100%',
        left: 'unset',
        transform: 'translate(0, -50%)',
        borderColor: `transparent ${token.tooltipBackgroundColor} transparent transparent `,
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
      backgroundColor: token.sliderScaleLineBackgroundColor,
    },
    '$wrapper:not($vertical) &': {
      // marginTop: token.sliderScaleMarginY,
      width: 0,
      '&::before': {
        width: '1px',
        height: token.sliderScaleLineSize,
        transform: 'translateX(-50%)',
      },
      // 为了让首尾刻度不超出轨道
      // '&:first-child $label[dir=ltr]': { transform: 'translate(0%)' },
      // '&:first-child $label[dir=rtl]': { transform: 'translate(0%)' },
      // '&:last-child $label[dir=ltr]': { transform: 'translate(-100%)' },
      // '&:last-child $label[dir=rtl]': { transform: 'translate(100%)' },
    },
    '$vertical &': {
      // marginLeft: token.sliderScaleMarginY,
      height: 0,
      '&::before': {
        height: '1px',
        width: token.sliderScaleLineSize,
        transform: 'translateY(-50%)',
      },
      // 为了让首尾刻度不超出轨道
      // '&:first-child $label[dir=ltr]': { transform: `translate(${verticalLabelMargin}px, -100%)` },
      // '&:first-child $label[dir=rtl]': { transform: `translate(-${verticalLabelMargin}px, -100%)` },
      // '&:last-child $label[dir=ltr]': { transform: `translate(${verticalLabelMargin}px, 0)` },
      // '&:last-child $label[dir=rtl]': { transform: `translate(-${verticalLabelMargin}px, 0)` },
    },
  },
  label: {
    position: 'absolute',
    fontSize: token.sliderScaleFontSize,
    userSelect: 'none',
    color: token.sliderScaleFontColor,
    '$wrapper:not($vertical) &': {
      '&[dir=ltr]': { transform: 'translate(-50%)' },
      '&[dir=rtl]': { transform: 'translate(50%)' },
      lineHeight: token.lineHeightDynamic,
    },
    '$vertical &': {
      top: 0,
      lineHeight: 1,

      '&[dir=ltr]': { left: '100%', transform: `translate(${verticalLabelMargin}px, -50%)` },
      '&[dir=rtl]': { right: '100%', transform: `translate(-${verticalLabelMargin}px, -50%)` },
    },
  },
};

export default sliderStyle;
