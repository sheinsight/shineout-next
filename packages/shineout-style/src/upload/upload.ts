import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { UploadClasses } from '@sheinx/base';

export type UploadClassType = keyof UploadClasses;

const uploadStyle: JsStyles<UploadClassType> = {
  rootClass: {},
  wrapper: {
    display: 'block',
  },
  wrapperImage: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
  wrapperDisabled: {
    '& $imageHandler': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  wrapperDrop: {},
  draggerWrapper: {
    display: 'block',
    width: '100%',
  },
  draggerArea: {
    position: 'relative',
    padding: 16,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: token.uploadImageHandlerBackgroundColor,
    borderRadius: token.uploadImageBorderRadius,
    cursor: 'pointer',
    color: token.uploadImageHandlerFontColor,
    // after
    '&:after': {
      content: '""',
      position: 'absolute',
      top: -1,
      right: -1,
      bottom: -1,
      left: -1,
      borderRadius: token.uploadImageBorderRadius,
      border: `1px dashed ${token.uploadImageHandlerBorderColor}`,
      transition: 'border-color 0.3s',
    },
    // hover
    '&:hover': {
      '&:after': {
        borderColor: token.uploadImageHandlerHoverBorderColor,
      },
    },
  },
  handler: {
    display: 'inline-block',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '$wrapperDrop:not($wrapperDisabled) &': {
      width: '100%',
      height: '100%',
      borderRadius: token.uploadImageBorderRadius,
      border: `1px dashed ${token.uploadImageHandlerBorderColor}`,
      backgroundColor: token.uploadImageHandlerBackgroundColor,
      color: token.uploadImageHandlerFontColor,
      '&:hover, &:hover': {
        borderColor: token.uploadImageHandlerHoverBorderColor,
        color: token.uploadImageHandlerHoverFontColor,
      },
      '&:hover, &:hover svg': {
        borderColor: token.uploadImageHandlerHoverBorderColor,
        color: token.uploadImageHandlerHoverFontColor,
      },
      '$wrapperDisabled &': {
        borderColor: token.uploadImageHandlerDisabledBorderColor,
        backgroundColor: token.uploadImageHandlerDisabledBackgroundColor,
        color: token.uploadImageHandlerDisabledFontColor,
      },
      '& svg': {
        color: token.uploadImageResultBtnRecoverColor,
      },
      '&:active': {
        color: token.uploadImageHandlerActiveFontColor,
        borderColor: token.uploadImageHandlerActiveBorderColor,
      },
      '&:active *': {
        color: token.uploadImageHandlerActiveFontColor,
      },
    },
  },
  result: {
    display: 'flex',
    gap: '8px',
    borderRadius: token.uploadResultBorderRadius,
    padding: `${token.uploadResultPaddingY} ${token.uploadResultPaddingX2} ${token.uploadResultPaddingY} ${token.uploadResultPaddingX1}`,
    '&:hover': {
      backgroundColor: token.uploadResultBackgroundColor,
    },
    '$handler+&, $dropItem+&': {
      marginTop: token.uploadResultMarginY,
    },
  },
  icon: {
    width: token.uploadResultIconSize,
    height: token.lineHeightDynamic,
    color: token.uploadResultIconColor,
    display: 'flex',
    alignItems: 'center',
    '$resultError $resultText &': { color: token.uploadResultErrorFontColor },
    '$resultDeleted $resultText &': { color: token.uploadResultDeletedFontColor },

    '& > svg': {
      width: '100%',
    }
  },
  iconHover: {
    '&:hover': {
      color: token.uploadResultIconHoverColor,
      borderRadius: '50%',
      backgroundColor: token.uploadResultIconHoverBackgroundColor,
    },
  },
  resultError: {},
  resultSuccess: {},
  resultUploading: {},
  resultDeleted: {},
  resultTextFooter: {
    display: 'flex',
    gap: token.uploadResultGap,
    color: token.uploadResultUploadingIconColor,
  },
  resultText: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    wordBreak: 'break-all',
    gap: token.uploadResultGap,
    fontSize: token.uploadResultFontSize,
    color: token.uploadResultFontColor,
    lineHeight: token.lineHeightDynamicMin,
    '$resultError &': { color: token.uploadResultErrorFontColor },
    '$resultDeleted &': {
      textDecoration: 'line-through',
      color: token.uploadResultDeletedFontColor,
    },
  },
  resultTextBody: {
    flex: 1,
    minWidth: '0',
  },
  resultClose: {
    cursor: 'pointer',
    boxSizing: 'content-box',
    padding: '0 4px',
    height: token.lineHeightDynamic,
    '&$icon:not($resultErrorClose)': {
      display: 'none',
      '$result:hover &': {
        display: 'flex',
      },
    },
  },
  resultErrorClose: {
    color: token.uploadResultErrorFontColor,
    '&$iconHover:hover': {
      color: token.uploadResultErrorFontColor,
    }
  },
  resultProgressText: {
    width: '2em',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  imageHandler: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: token.uploadImageBorderRadius,
    border: `1px dashed ${token.uploadImageHandlerBorderColor}`,
    backgroundColor: token.uploadImageHandlerBackgroundColor,
    color: token.uploadImageHandlerFontColor,
    '$wrapper:not($wrapperDisabled) &:hover': {
      borderColor: token.uploadImageHandlerHoverBorderColor,
      color: token.uploadImageHandlerHoverFontColor,
    },
    '$wrapper:not($wrapperDisabled) &:hover svg': {
      color: `${token.uploadImageHandlerHoverFontColor} !important`,
    },
    '$wrapper:not($wrapperDisabled) &:active, $wrapper:not($wrapperDisabled) &:active *': {
      color: `${token.uploadImageHandlerActiveFontColor} !important`,
      borderColor: token.uploadImageHandlerActiveBorderColor,
    },
    '$wrapperDisabled &': {
      borderColor: token.uploadImageHandlerDisabledBorderColor,
      backgroundColor: token.uploadImageHandlerDisabledBackgroundColor,
      color: token.uploadImageHandlerDisabledFontColor,
    },
  },
  imageHandlerIcon: {
    display: 'flex',
    alignItems: 'center',
    color: token.uploadImageHandlerIconColor,
    '& > svg': {
      width: 20,
      height: 20,
    },
    '$wrapperDisabled &': {
      color: token.uploadImageHandlerDisabledFontColor,
    },
  },
  imageResult: {
    border: `1px solid ${token.uploadImageHandlerBorderColor}`,
    boxSizing: 'border-box',
    borderRadius: token.uploadImageBorderRadius,
    position: 'relative',
    '$resultError&': {
      borderStyle: 'dashed',
      borderWidth: '2px',
      borderColor: token.uploadImageHandlerErrorBorderColor,
      color: token.uploadImageHandlerErrorFontColor,
    },
  },
  imageBg: {
    '$wrapper &': {
      position: 'absolute',
      borderRadius: 'inherit',
      zIndex: 0,
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      backgroundSize: 'cover',
      border: 'none',
    },
    '$wrapper $resultDeleted &': {
      filter: 'grayscale(100%)',
      opacity: '0.6',
    },
  },
  imageResultMask: {
    position: 'absolute',
    borderRadius: 'inherit',
    boxSizing: 'border-box',
    zIndex: 0,
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    backgroundColor: token.uploadImageResultMaskBackgroundColor,
    opacity: 0,
    transition: 'opacity 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '$resultError &': { display: 'none' },
    '&:hover': {
      opacity: 1,
    },
  },
  imageResultMaskOperator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    '& $icon': {
      color: token.uploadImageResultMaskIconColor,
      width: token.uploadImageResultMaskIconSize,
      height: token.uploadImageResultMaskIconSize,
      cursor: 'pointer',
    },
  },
  imageResultLoading: {
    boxSizing: 'border-box',
    width: token.uploadImageResultMaskIconSize,
    height: token.uploadImageResultMaskIconSize,
    borderColor: token.uploadImageResultMaskIconColor,
    borderTopColor: 'transparent',
    '$resultText &': {
      borderColor: token.uploadResultUploadingIconColor,
      borderTopColor: 'transparent',
    }
  },
  imageResultMaskInfo: {
    lineHeight: token.lineHeightDynamic,
    color: token.uploadImageResultMaskIconColor,
    fontSize: token.uploadImageResultTipFontSize,
  },
  imageResultTopBtn: {
    position: 'absolute',
    top: 0,
    '&[dir=ltr]': {
      right: 0,
      transform: 'translate(50%, -50%)',
    },
    '&[dir=rtl]': {
      left: 0,
      transform: 'translate(-50%, -50%)',
    },
    color: token.uploadImageResultBtnCloseColor,
    cursor: 'pointer',
    '$resultDeleted &': {
      color: token.uploadImageResultBtnRecoverColor,
    },
  },
  imageResultMaskShow: {
    opacity: 1,
  },
  customImageBtn: {
    '$resultSuccess &': {
      display: 'none',
    },
    '$resultSuccess:hover &': {
      display: 'block',
    },
  },
  imageResultTip: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '2px 8px',
    width: 'max-content',
    maxWidth: '240px',
    zIndex: '1000',
    marginTop: '8px',
    borderRadius: '4px',
    boxShadow: '0 0 0 1px rgba(255,77,80,.1), 0 2px 8px rgba(0,0,0,.15)',
    backgroundColor: token.uploadImageResultTipBackgroundColor,
    fontSize: token.uploadImageResultTipFontSize,
    fontColor: token.uploadImageResultErrorFontColor,
    '&::before': {
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      width: '6px',
      height: '6px',
      border: '1px solid rgba(255,77,80,.1)',
      borderWidth: '1px 0 0 1px',
      background: 'inherit',
      content: '" "',
      transform: 'rotate(45deg) translateY(3px)',
    },
  },
  dropItem: {
    ':not(wrapperDisabled) &[data-soui-dragover="true"]': {
      '& $handler, & $imageHandler, & $imageResult': {
        borderColor: 'transparent !important',
        color: token.uploadImageHandlerHoverFontColor,
        position: 'relative',
      },
      '& $handler *, & $imageHandler *, & $imageResult *': {
        color: token.uploadImageHandlerHoverFontColor,
      },
      '& $handler:after, & $imageHandler:after, & $imageResult:after': {
        content: '" "',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        border: `2px dashed ${token.uploadImageHandlerHoverBorderColor}`,
        borderRadius: token.uploadImageBorderRadius,
      },
    },
  },
  button: {
    position: 'relative',
    overflow: 'hidden',
    '& > span': {
      position: 'relative',
      zIndex: '1',
    },
  },
  buttonUploading: {
    '&&': {
      color: token.buttonSecondaryOutlineFontColor,
    },
  },
  buttonCover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: '#fff',
  },
  buttonBg: {
    overflow: 'hidden',
    zIndex: '2',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    transition: 'right .2s ease-in-out',
    color: '#fff',
    whiteSpace: 'nowrap',
    paddingLeft: 'inherit',
    background: 'inherit',

    '& > span': {
      display: 'flex',
      padding: 'inherit',
      height: '100%',
      position: 'absolute',
      left: 0,
      width: '100%',
      alignItems: 'center',
    },
  },
  buttonBgSpin: {
    display: 'inline-block',
    marginRight: '8px',
  },
};

export default uploadStyle;
