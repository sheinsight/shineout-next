import token from '@sheinx/theme';
import { ModalClasses } from '@sheinx/base';

import { JsStyles } from '../jss-style';

const zoomOut = 'cubic-bezier(0.78, 0.14, 0.15, 0.86)';
const zoomIn = 'cubic-bezier(0.08, 0.82, 0.17, 1)';

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

const hoverAfterStyles = {
  content: '""',
  position: 'absolute',
  top: -4,
  right: -4,
  bottom: -4,
  left: -4,
  borderRadius: '50%',
};

const modalStyle: JsStyles<ModalClassType> = {
  rootClass: {},
  ...animationStyle,
  wrapper: {
    position: 'fixed',
    zIndex: modalIndex,
    top: 0,
    left: 0,
    overflow: 'auto',
    wordWrap: 'break-word',
    width: '100%',
    boxSizing: 'border-box',
    height: '100%',
    textAlign: 'center',
    lineHeight: token.lineHeightDynamic,
    '$wrapperAnimation&': {
      overflow: 'hidden',
    },
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
      overflow: 'auto',
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
        marginBottom: 0,
      },
      '& $body': {
        padding: `${token.modalDrawerBodyPaddingY} ${token.modalDrawerBodyPaddingX}`,
        overflow: 'auto',
      },
      '& $bodyWithIcon': {
        paddingLeft: token.modalDrawerBodyPaddingX,
      },
      '& $footer': {
        padding: `${token.modalDrawerFooterPaddingY} ${token.modalDrawerFooterPaddingX}`,
        marginTop: 0,
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
    background: token.modalPanelBackground,
    borderRadius: token.modalPanelRadius,
    padding: `${token.modalPanelPaddingY} ${token.modalPanelPaddingX}`,
    margin: '0 auto',
    fontSize: token.modalPanelFontSize,
    boxSizing: 'border-box',
    boxShadow: token.modalPanelShadow,
    border: `1px solid ${token.modalPanelBorder}`,
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
      lineHeight: token.modalHeaderIconSize,
      display: 'block',
      alignItems: 'center',
    },
  },
  emptyIcon: {
    position: 'absolute',
  },
  headerTitle: {
    flex: '1',
    minWidth: 0,
    textAlign: 'left',
    color: token.modalHeaderFontColor,
    fontWeight: token.modalHeaderFontWeight,
    fontSize: token.modalHeaderFontSize,
    lineHeight: token.lineHeightDynamic,
  },
  headerClose: {
    marginLeft: token.modalHeaderCloseMarginXStart,
    marginTop: token.modalHeaderCloseTop,
    width: token.modalHeaderCloseSize,
    height: token.modalHeaderCloseSize,
    cursor: 'pointer',
    display: 'block',
    color: token.modalHeaderCloseColor,
    position: 'relative',
    zIndex: 0,
    '& svg': {
      zIndex: 1,
      position: 'relative',
    },
    '&:hover': {
      '&:after': {
        ...hoverAfterStyles,
        background: token.modalHeaderCloseBackgroundColor,
      },
    },
    '$wrapperDrawer &:hover': {
      '&:after': {
        ...hoverAfterStyles,
        background: token.modalDrawerCloseBackgroundColor,
      },
    },
  },
  emptyClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    marginTop: 0,
    '$wrapperDrawer &': {
      top: 4,
      right: 4,
    }
  },
  body: {
    flex: '1 1 auto',
    minHeight: 0,
    // overflow: 'auto',
    color: token.modalBodyFontColor,
    fontSize: token.modalBodyFontSize,
    fontWeight: token.modalBodyFontWeight,
    lineHeight: token.lineHeightDynamic,

    '$wrapperFullScreen &': {
      minHeight: 'unset',
    },
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
    '$wrapperDrawerRight &': {
      left: '-4px',
      right: 'auto',
      cursor: 'col-resize',
    },
    '$wrapperDrawerLeft &': {
      cursor: 'col-resize',
    },
  },
  resizeY: {
    cursor: 'row-resize',
    position: 'absolute',
    left: 0,
    right: 0,
    height: '6px',
    bottom: '-4px',
    zIndex: 11,
    background: 'transparent',
    touchAction: 'none',
    '$wrapperDrawerBottom &': {
      top: '-4px',
      bottom: 'auto',
      cursor: 'row-resize',
    },
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
