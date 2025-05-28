import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { CarouselClasses } from '@sheinx/base';
import { animations } from '../common'

export type CarouselClassType = keyof CarouselClasses;

const carouselDuration = '0.4s';

const carouselStyle: JsStyles<CarouselClassType> = {
  rootClass: {},
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
    '& $indicatorNumber': {
      margin: '8px',
    },
  },
  indicatorRight: {
    right: '0',
    top: '0',
    bottom: '0',
    width: token.carouselIndicatorWrapperHeight,
    flexDirection: 'column',
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.15) 100%)',
    '& $indicatorNumber': {
      margin: '8px',
    },
  },
  indicatorOuter: {
    position: 'static',
    width: '100%',
    height: '38px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorTypeNumber: {},
  indicatorTypeCircle: {
    '& $indicator': {
      '&:not(:first-child)': {
        marginLeft: token.carouselIndicatorCircleGap,
      },
      width: token.carouselIndicatorCircleWidth,
      height: token.carouselIndicatorCircleWidth,
      borderRadius: '50%',
    },
    '&$indicatorLeft, &$indicatorRight': {
      '& $indicator': {
        '&:not(:first-child)': {
          marginTop: token.carouselIndicatorCircleGap,
          marginLeft: 0,
        },
      },
    },
  },
  indicatorTypeLine: {
    '& $indicator': {
      '&:not(:first-child)': {
        marginLeft: token.carouselIndicatorLineGap,
      },
      width: token.carouselIndicatorLineWidth,
      height: token.carouselIndicatorLineHeight,
      borderRadius: '100px',
    },
    '$indicatorLeft& $indicator, $indicatorRight& $indicator': {
      width: token.carouselIndicatorLineHeight,
      height: token.carouselIndicatorLineWidth,
      '&:not(:first-child)': {
        marginTop: token.carouselIndicatorLineGap,
        marginLeft: 0,
      },
    },
  },
  indicatorTypeBar: {
    '& $indicator': {
      position: 'relative',
      borderRadius: '100px',
      '&:first-child': {
        '&:before': {
          borderRadius: '100px 0 0 100px'
        }
      },
      '&:last-child': {
        '&:before': {
          borderRadius: '0 100px 100px 0',
        }
      },
      width: token.carouselIndicatorBarWidth,
      height: token.carouselIndicatorBarHeight,
    },
    '& $indicator:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: token.carouselIndicatorBackgroundColor,
    },
    '$indicatorLeft& $indicator, $indicatorRight& $indicator': {
      width: token.carouselIndicatorBarHeight,
      height: token.carouselIndicatorBarWidth,
      '&:first-child': {
        '&:before': {
          borderRadius: '100px 100px 0 0'
        }
      },
      '&:last-child': {
        '&:before': {
          borderRadius: '0 0 100px 100px',
        }
      },
    },
  },
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
    margin: '0 8px',
    fontSize: token.carouselIndicatorNumberFontSize,
    lineHeight: token.lineHeightDynamic,
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
