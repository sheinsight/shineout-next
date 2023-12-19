import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

const zoomOut = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
const zoomIn = 'cubic-bezier(0.08, 0.82, 0.17, 1)';

export type ModalClasses = {
  wrapper: string;
  wrapperShow: string;
  wrapperHide: string;
  wrapperFullScreen: string;
  wrapperMoveable: string;
  wrapperAnimation: string;
  wrapperZoom: string;
  wrapperIsMask: string;
  wrapperHideMask: string;

  mask: string;
  panel: string;
  top: string;
  topLeft: string;
  topRight: string;
  header: string;
  headerIcon: string;
  headerTitle: string;
  headerClose: string;
  body: string;
  footer: string;
  resizeX: string;
  resizeY: string;
  resizeXY: string;
};
export type ModalClassType = keyof ModalClasses;
const modalIndex = 1050;

const animationStyle = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  '@keyframes fadeOut': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
  '@keyframes topIn': {
    from: {
      transform: 'translate(0, -100px)',
    },
    to: {
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes topOut': {
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: 'translate(0, -100px)',
    },
  },
  // 0% - 10% scale(1) for getBoundingClientRect
  '@keyframes zoomIn': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0,
    },
    '10%': {
      transform: 'scale(1)',
      opacity: 0,
    },
    '10.001%': {
      transform: 'scale(.2)',
      opacity: 0,
    },
    '10.002%': {
      transform: 'scale(.2)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  '@keyframes zoomOut': {
    '0%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(.2)',
    },
  },
};

const modalStyle: JsStyles<ModalClassType> = {
  ...animationStyle,
  wrapper: {
    position: 'fixed',
    zIndex: modalIndex,
    top: 0,
    left: 0,
    overflow: 'auto',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    lineHeight: token.lineHeightDynamic,
  },
  wrapperIsMask: {
    background: token.modalMaskBackground,
  },
  wrapperHideMask: {
    '&$wrapper': {
      background: 'transparent',
      pointerEvents: 'none',
    },
  },
  wrapperMoveable: {
    '& $header': {
      cursor: 'move',
    },
  },
  wrapperFullScreen: {
    '& $panel': {
      top: 0,
      height: '100vh',
      width: '100vw',
    },
  },
  wrapperZoom: {
    transform: 'none',
  },
  wrapperAnimation: {
    '&$wrapperShow': {
      animation: `$fadeIn .3s ${zoomIn}`,
      '&:not($wrapperZoom) $mask': {
        animation: `$topIn .3s ${zoomIn}`,
      },
      '&$wrapperZoom $panel': {
        animation: `$zoomIn .3s ${zoomIn}`,
      },
    },
    '&$wrapperHide': {
      animation: `$fadeOut .3s ${zoomOut}`,
      '&:not($wrapperZoom) $mask': {
        animation: `$topOut .3s ${zoomOut}`,
      },
      '&$wrapperZoom $panel': {
        animation: `$zoomOut .3s ${zoomOut}`,
      },
    },
  },
  wrapperShow: {
    opacity: 1,
  },
  wrapperHide: {
    opacity: 0,
    '&:not($wrapperAnimation)': {
      display: 'none',
    },
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%',
  },
  panel: {
    pointerEvents: 'all',
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    textAlign: 'left',
    minWidth: 0,
    background: '#fff',
    borderRadius: token.modalPanelRadius,
    padding: `${token.modalPanelPaddingY} ${token.modalPanelPaddingX}`,
    fontSize: token.modalPanelFontSize,
    boxSizing: 'border-box',
    boxShadow: token.modalPanelShadow,
  },
  top: {
    flex: '1',
    minHeight: '1px',
    display: 'flex',
  },
  topLeft: {},
  topRight: {
    flex: '1',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    marginBottom: token.modalPanelGap,
  },
  headerIcon: {
    '$wrapper &': {
      marginRight: token.modalHeaderIconMarginEnd,
      marginTop: token.modalHeaderIconMarginTop,
      width: token.modalHeaderIconSize,
      height: token.modalHeaderIconSize,
      display: 'block',
      alignItems: 'center',
    },
  },
  headerTitle: {
    flex: '1',
    minWidth: 0,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: token.modalHeaderFontSize,
  },
  headerClose: {
    marginLeft: token.modalHeaderCloseMarginStart,
    marginTop: token.modalHeaderCloseTop,
    width: token.modalHeaderCloseSize,
    height: token.modalHeaderCloseSize,
    cursor: 'pointer',
    display: 'block',
  },
  body: {
    flex: '1 1 auto',
    minHeight: '1px',
    overflow: 'auto',
  },
  footer: {
    width: '100%',
    textAlign: 'right',
    marginTop: token.modalPanelGap,
  },
  resizeX: {
    cursor: 'e-resize',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '6px',
    right: '-4px',
    zIndex: 11,
    background: 'transparent',
    touchAction: 'none',
  },
  resizeY: {
    cursor: 's-resize',
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    bottom: '-4px',
    zIndex: 11,
    background: 'transparent',
    touchAction: 'none',
  },
  resizeXY: {
    cursor: 'se-resize',
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '10px',
    height: '10px',
    zIndex: 12,
    background: 'transparent',
    touchAction: 'none',
  },
};

export default modalStyle;
