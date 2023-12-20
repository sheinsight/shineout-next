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
  wrapperDrawer: string;
  wrapperDrawerLeft: string;
  wrapperDrawerRight: string;
  wrapperDrawerTop: string;
  wrapperDrawerBottom: string;

  mask: string;
  panel: string;
  header: string;
  headerIcon: string;
  headerTitle: string;
  headerClose: string;
  body: string;
  bodyWithIcon: string;
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

  '@keyframes drawerTopIn': {
    from: {
      transform: 'translate(0, -100%)',
    },
    to: {
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes drawerTopOut': {
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: 'translate(0, -100%)',
    },
  },

  '@keyframes drawerBottomIn': {
    from: {
      transform: 'translate(0, 100%)',
    },
    to: {
      transform: 'translate(0, 0)',
    },
  },

  '@keyframes drawerBottomOut': {
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: 'translate(0, 100%)',
    },
  },

  '@keyframes drawerLeftIn': {
    from: {
      transform: 'translate(-100%, 0)',
    },
    to: {
      transform: 'translate(0, 0)',
    },
  },

  '@keyframes drawerLeftOut': {
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: 'translate(-100%, 0)',
    },
  },

  '@keyframes drawerRightIn': {
    from: {
      transform: 'translate(100%, 0)',
    },
    to: {
      transform: 'translate(0, 0)',
    },
  },

  '@keyframes drawerRightOut': {
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: 'translate(100%, 0)',
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
    boxSizing: 'border-box',
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
      '&:not($wrapperZoom):not($wrapperDrawer) $mask': {
        animation: `$topIn .3s ${zoomIn}`,
      },
      '&$wrapperZoom $panel': {
        animation: `$zoomIn .3s ${zoomIn}`,
      },
      '&$wrapperDrawerTop $mask': {
        animation: `$drawerTopIn .3s ${zoomIn}`,
      },
      '&$wrapperDrawerBottom $mask': {
        animation: `$drawerBottomIn .3s ${zoomIn}`,
      },
      '&$wrapperDrawerLeft $mask': {
        animation: `$drawerLeftIn .3s ${zoomIn}`,
      },
      '&$wrapperDrawerRight $mask': {
        animation: `$drawerRightIn .3s ${zoomIn}`,
      },
    },
    '&$wrapperHide': {
      animation: `$fadeOut .3s ${zoomOut}`,
      '&:not($wrapperZoom):not($wrapperDrawer) $mask': {
        animation: `$topOut .3s ${zoomOut}`,
      },
      '&$wrapperZoom $panel': {
        animation: `$zoomOut .3s ${zoomOut}`,
      },
      '&$wrapperDrawerTop $mask': {
        animation: `$drawerTopOut .3s ${zoomOut}`,
      },
      '&$wrapperDrawerBottom $mask': {
        animation: `$drawerBottomOut .3s ${zoomOut}`,
      },
      '&$wrapperDrawerLeft $mask': {
        animation: `$drawerLeftOut .3s ${zoomOut}`,
      },
      '&$wrapperDrawerRight $mask': {
        animation: `$drawerRightOut .3s ${zoomOut}`,
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

  wrapperDrawer: {
    '& $panel': {
      borderRadius: 0,
      position: 'absolute',
      padding: 0,
      '& $header': {
        padding: `${token.modalDrawerTitlePaddingY} ${token.modalDrawerTitlePaddingX}`,
        background: token.modalDrawerTitleBackgroundColor,
      },
      '& $body': {
        padding: `${token.modalDrawerBodyPaddingY} ${token.modalDrawerBodyPaddingX}`,
      },
      '& $bodyWithIcon': {
        paddingLeft: `calc(${token.modalHeaderIconMarginEnd} + ${token.modalHeaderIconSize} + ${token.modalDrawerBodyPaddingX})`,
      },
      '& $footer': {
        padding: `${token.modalDrawerFooterPaddingY} ${token.modalDrawerFooterPaddingX}`,
      },
    },
  },
  wrapperDrawerLeft: {
    '& $panel': {
      left: 0,
      height: '100vh',
    },
  },
  wrapperDrawerRight: {
    '& $panel': {
      right: 0,
      height: '100vh',
    },
  },
  wrapperDrawerTop: {
    '& $panel': {
      top: 0,
      left: 0,
      width: '100vw',
    },
  },
  wrapperDrawerBottom: {
    '& $panel': {
      bottom: 0,
      left: 0,
      width: '100vw',
    },
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
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
    marginLeft: token.modalHeaderCloseMarginXStart,
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
  bodyWithIcon: {
    paddingLeft: `calc(${token.modalHeaderIconMarginEnd} + ${token.modalHeaderIconSize})`,
  },
  footer: {
    width: '100%',
    boxSizing: 'border-box',
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
