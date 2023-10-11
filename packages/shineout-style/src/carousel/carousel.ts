import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export interface CarouselClasses {
  wrapper?: string;
  animationSlide?: string;
  animationFade?: string;
  animationSlideY?: string;
  directionForward?: string;
  directionBackward?: string;
  directionStop?: string;
  slider?: string;
  item?: string;
  itemCurrent?: string;
  itemPre?: string;
  arrowWrapper?: string;
  arrowHover?: string;
  arrowItem?: string;
  arrowLeft?: string;
  arrowRight?: string;
  indicatorWrapper?: string;
  indicatorCenter?: string;
  indicatorLeft?: string;
  indicatorRight?: string;
  indicatorOuter?: string;
  indicatorTypeCircle?: string;
  indicatorTypeNumber?: string;
  indicatorTypeLine?: string;
  indicatorTypeSlider?: string;
  indicatorArrow?: string;
  indicatorNumber?: string;
  indicator?: string;
  indicatorActive?: string;
}

export type CarouselClassType = keyof CarouselClasses;

const carouselDuration = '0.4s';

const animations = {
  '@keyframes r2c': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes  c2r': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes  l2c': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(0)' },
  },
  '@keyframes  c2l': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-100%)' },
  },
  '@keyframes t2c': {
    '0%': { transform: 'translateY(-100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  '@keyframes c2t': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-100%)' },
  },
  '@keyframes b2c': {
    '0%': { transform: 'translateY(100%)' },
    '100%': { transform: 'translateY(0)' },
  },
  '@keyframes c2b': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(100%)' },
  },
  '@keyframes fade-in': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes fade-out': {
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
};
const carouselStyle: JsStyles<CarouselClassType> = {
  ...animations,
  wrapper: {
    position: 'relative',
    zIndex: 0,
  },
  animationSlide: {},
  animationFade: {},
  animationSlideY: {},
  directionForward: {},
  directionBackward: {},
  directionStop: {},
  slider: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  item: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#e9e9e9',
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },
  itemCurrent: {
    zIndex: 10,
    '$animationSlide$directionForward &': {
      animation: `$r2c ${carouselDuration} ease-in-out`,
    },
    '$animationSlide$directionBackward &': {
      animation: `$l2c ${carouselDuration} ease-in-out`,
    },
    '$animationSlideY$directionForward &': {
      animation: `$b2c ${carouselDuration} ease-in-out`,
    },
    '$animationSlideY$directionBackward &': {
      animation: `$t2c ${carouselDuration} ease-in-out`,
    },
    '$animationFade &': {
      animation: `$fade-in ${carouselDuration} ease-in-out`,
    },
    '$directionStop &': {
      animation: 'none',
    },
  },
  itemPre: {
    zIndex: 9,
    '$animationSlide$directionForward &': {
      animation: `$c2l ${carouselDuration} ease-in-out`,
    },
    '$animationSlide$directionBackward &': {
      animation: `$c2r ${carouselDuration} ease-in-out`,
    },
    '$animationSlideY$directionForward &': {
      animation: `$c2t ${carouselDuration} ease-in-out`,
    },
    '$animationSlideY$directionBackward &': {
      animation: `$c2b ${carouselDuration} ease-in-out`,
    },
    '$animationFade &': {
      animation: `$fade-out ${carouselDuration} ease-in-out`,
    },
  },
  arrowWrapper: {},
  arrowHover: {
    '& $arrowItem': {
      opacity: 0,
    },
    '$wrapper:hover & $arrowItem': {
      opacity: 1,
    },
  },
  arrowItem: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: token.carouselArrowSize,
    height: token.carouselArrowSize,
    borderRadius: token.carouselArrowBorderRadius,
    color: token.carouselArrowFontColor,
    background: token.carouselArrowBackgroundColor,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '& svg': {
      width: token.carouselArrowIconSize,
      height: token.carouselArrowIconSize,
    },
    '&:hover': {
      background: token.carouselArrowHoverBackgroundColor,
    },
  },
  arrowLeft: {
    left: '12px',
    '&::after': {
      transform: 'translateX(35%) rotate(-135deg)',
    },
  },
  arrowRight: {
    right: '12px',
    '&::after': {
      transform: 'translateX(-15%) rotate(45deg)',
    },
  },
  indicatorWrapper: {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorCenter: {
    bottom: '0',
    left: '0',
    right: '0',
    height: token.carouselIndicatorWrapperHeight,
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%)',
  },
  indicatorLeft: {
    left: '0',
    top: '0',
    bottom: '0',
    width: token.carouselIndicatorWrapperHeight,
    flexDirection: 'column',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%)',
  },
  indicatorRight: {
    right: '0',
    top: '0',
    bottom: '0',
    width: token.carouselIndicatorWrapperHeight,
    flexDirection: 'column',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%)',
  },
  indicatorOuter: {
    position: 'static',
    width: '100%',
    height: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorTypeNumber: {
    gap: '8px',
  },
  indicatorTypeCircle: {
    gap: token.carouselIndicatorCircleGap,
    '& $indicator': {
      width: token.carouselIndicatorCircleWidth,
      height: token.carouselIndicatorCircleWidth,
      borderRadius: '50%',
    },
  },
  indicatorTypeLine: {
    gap: token.carouselIndicatorLineGap,
    '& $indicator': {
      width: token.carouselIndicatorLineWidth,
      height: token.carouselIndicatorLineHeight,
      borderRadius: '100px',
    },
    '$indicatorLeft& $indicator, $indicatorRight& $indicator': {
      width: token.carouselIndicatorLineHeight,
      height: token.carouselIndicatorLineWidth,
    },
  },
  indicatorTypeSlider: {},
  indicatorArrow: {
    width: token.carouselIndicatorArrowSize,
    height: token.carouselIndicatorArrowSize,
    cursor: 'pointer',
    color: token.carouselIndicatorArrowColor,
    '&:hover': {
      color: token.carouselIndicatorArrowHoverColor,
    },
    '$indicatorOuter &': {
      color: token.carouselIndicatorOuterArrowColor,
      '&:hover': {
        color: token.carouselIndicatorOuterArrowHoverColor,
      },
    },
    '$indicatorLeft &, $indicatorRight &': {
      transform: 'rotate(90deg)',
    },
  },
  indicatorNumber: {
    fontSize: token.carouselIndicatorNumberFontSize,
    lineHeight: 1,
    color: token.carouselIndicatorNumberColor,
    '$indicatorOuter &': {
      color: token.carouselIndicatorOuterNumberColor,
    },
  },
  indicator: {
    cursor: 'pointer',
    backgroundColor: token.carouselIndicatorBackgroundColor,
    '$indicatorOuter &': {
      backgroundColor: token.carouselIndicatorOuterBackgroundColor,
    },
  },
  indicatorActive: {
    backgroundColor: token.carouselIndicatorActiveBackgroundColor,
    '$indicatorOuter &': {
      backgroundColor: token.carouselIndicatorOuterActiveBackgroundColor,
    },
  },
};

export default carouselStyle;
