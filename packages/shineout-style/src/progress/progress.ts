import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { ProgressClasses } from '@sheinx/base';

export type ProgressClassType = keyof ProgressClasses;

const progressStyle: JsStyles<ProgressClassType> = {
  wrapper: {
    fontSize: token.progressFontSize,
    color: token.progressFontColor,
    lineHeight: token.lineHeightDynamic,
  },
  wrapperSuccess: {},
  wrapperInfo: {},
  wrapperWarning: {},
  wrapperDanger: {},
  line: {
    display: 'flex',
    alignItems: 'center',
    '& $icon': {
      width: token.progressLineIconSize,
      height: token.progressLineIconSize,
      marginLeft: token.progressLineGap,
    },
  },
  lineDefault: {},
  linePop: {
    position: 'relative',
    paddingTop: '38px',
  },
  lineInner: { fontSize: token.progressLineInnerFontSize },
  lineInnerRight: {},
  lineBg: {
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    '$lineDefault &': {
      height: token.progressLineHeight,
      borderRadius: token.progressLineHeight,
    },
    '$lineInner &': {
      height: token.progressLineInnerHeight,
      borderRadius: token.progressLineInnerHeight,
    },
    background: token.progressBackground,
  },
  lineFront: {
    position: 'relative',
    transition: 'width 0.32s linear',
    left: 0,
    top: 0,
    height: '100%',
    boxSizing: 'border-box',
    borderRadius: 'inherit',
    '$wrapperSuccess &': { backgroundColor: token.progressSuccessFrontBackgroundColor },
    '$wrapperWarning &': { backgroundColor: token.progressWarningFrontBackgroundColor },
    '$wrapperInfo &': { backgroundColor: token.progressInfoFrontBackgroundColor },
    '$wrapperDanger &': { backgroundColor: token.progressDangerFrontBackgroundColor },

    '$lineInner &': {
      display: 'flex',
      alignItems: 'center',
      '$wrapperSuccess&': { backgroundColor: token.progressLineInnerSuccessFrontBackgroundColor },
      '$wrapperWarning&': { backgroundColor: token.progressLineInnerWarningFrontBackgroundColor },
      '$wrapperInfo&': { backgroundColor: token.progressLineInnerInfoFrontBackgroundColor },
      '$wrapperDanger&': { backgroundColor: token.progressLineInnerDangerFrontBackgroundColor },
    },
  },

  content: {
    '$lineDefault &': {
      marginLeft: token.progressLineGap,
    },
    '$lineInner &': {
      marginLeft: 'auto',
      padding: `0 ${token.progressLineInnerPaddingX}`,
      fontWeight: token.progressLineFontWeight,
    },
    '$wrapperSuccess &': { color: token.progressSuccessInnerFontColor },
    '$wrapperWarning &': { color: token.progressWarningInnerFontColor },
    '$wrapperInfo &': { color: token.progressInfoInnerFontColor },
    '$wrapperDanger &': { color: token.progressDangerInnerFontColor },

    '$lineInnerRight &&': {
      // marginLeft: token.progressLineInnerPaddingX,
      position: 'absolute',
      left: '100%',
      color: token.progressLineInnerRightFontColor,
    },
  },
  linePopWrapper: {
    display: 'inline-block',
    position: 'absolute',
    transition: 'all 0.32s linear',
    top: 0,
    background: token.progressLineBackgroundColor,
    padding: '3px 8px',
    borderRadius: '2px',
    color: token.progressLinePopFontColor,
    boxShadow:
      '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)',
  },
  linePopValue: {},
  linePopArrow: {
    background: token.progressLineBackgroundColor,
    position: 'absolute',
    display: 'block',
    width: '6px',
    height: '6px',
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%,50%) rotate(45deg)',
  },
  icon: {
    '$wrapperSuccess &': { color: token.progressSuccessFrontBackgroundColor },
    '$wrapperWarning &': { color: token.progressWarningFrontBackgroundColor },
    '$wrapperInfo &': { color: token.progressInfoFrontBackgroundColor },
    '$wrapperDanger &': { color: token.progressDangerFrontBackgroundColor },
    lineHeight: 1,
  },

  circle: {
    position: 'relative',
    display: 'inline-block',
    '& $content, & $icon': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    '& $icon': {
      width: '31.25%',
      height: '31.25%',
    },
    fontWeight: token.progressCircleFontWeight,
    '&$wrapperSuccess $content': { color: token.progressCircleSuccessFontColor },
    '&$wrapperWarning $content': { color: token.progressCircleWarningFontColor },
    '&$wrapperInfo $content': { color: token.progressCircleInfoFontColor },
    '&$wrapperDanger $content': { color: token.progressCircleDangerFontColor },
  },
  circleBg: {
    stroke: token.progressBackground,
  },
  circleFront: {
    transition:
      'stroke-dashoffset .32s ease 0s,stroke-dasharray .32s ease 0s,stroke .32s,stroke-width .06s ease .32s',
    '$wrapperSuccess &': { stroke: token.progressSuccessFrontBackgroundColor },
    '$wrapperWarning &': { stroke: token.progressWarningFrontBackgroundColor },
    '$wrapperInfo &': { stroke: token.progressInfoFrontBackgroundColor },
    '$wrapperDanger &': { stroke: token.progressDangerFrontBackgroundColor },
  },
};

export default progressStyle;
