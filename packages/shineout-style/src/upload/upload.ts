import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export interface UploadClasses {
  wrapper: string;
  wrapperImage: string;
  wrapperDisabled: string;
  wrapperDrop: string;
  dropItem: string;
  handler: string;
  handlerDisabled: string;
  files: string;
  icon: string;
  iconHover: string;
  result: string;
  resultText: string;
  resultTextBody: string;
  resultUploading: string;
  resultSuccess: string;
  resultTextFooter: string;
  resultError: string;
  resultDeleted: string;
  resultClose: string;
  resultStatusIcon: string;
  values: string;
  recycle: string;
  // uploadImage
  imageHandler: string;
  imageHandlerIcon: string;
  imageBg: string;
  imageResult: string;
  imageResultMask: string;
  imageResultMaskOperator: string;
  imageResultLoading: string;
  imageResultMaskInfo: string;
  imageResultMaskShow: string;
  imageResultTopBtn: string;
  imageResultTip: string;
  customImageBtn: string;
  // button
  button: string;
  buttonUploading: string;
  buttonCover: string;
  buttonBg: string;
  buttonBgSpin: string;
}
export type UploadClassType = keyof UploadClasses;

const imageGap = 10;
const uploadStyle: JsStyles<UploadClassType> = {
  wrapper: {
    display: 'block',
  },
  wrapperImage: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: imageGap,
  },
  wrapperDisabled: {
    '& $imageHandler': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  handler: {
    display: 'inline-block',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '$wrapperDrop:not($wrapperDisabled) &': {
      width: '100%',
      borderRadius: token.uploadImageBorderRadius,
      border: `1px dashed ${token.uploadImageHandlerBorderColor}`,
      backgroundColor: token.uploadImageHandlerBackgroundColor,
      color: token.uploadImageHandlerFontColor,
      '&:hover': {
        borderColor: token.uploadImageHandlerHoverBorderColor,
        color: token.uploadImageHandlerHoverFontColor,
      },
    },
  },
  handlerDisabled: {},
  files: {},
  result: {
    display: 'flex',
    alignItems: 'center',
    marginTop: token.uploadResultMarginY,
    gap: token.uploadResultGap,
  },
  icon: {
    width: token.uploadResultIconSize,
    height: token.uploadResultIconSize,
    color: token.uploadResultIconColor,
    display: 'flex',
    alignItems: 'center',
    '$resultError $resultText &': { color: token.uploadResultErrorFontColor },
    '$resultDeleted $resultText &': { color: token.uploadResultDeletedFontColor },
  },
  iconHover: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-5px',
      left: '-5px',
      right: '-5px',
      bottom: '-5px',
      borderRadius: '50%',
      display: 'none',
      backgroundColor: token.uploadResultIconHoverBackgroundColor,
    },
    '& svg': {
      position: 'relative',
    },
    '&:hover': {
      '&::before': { display: 'block' },
    },
  },
  resultError: {},
  resultSuccess: {},
  resultUploading: {},
  resultDeleted: {},
  resultStatusIcon: {
    '$resultSuccess &': {
      color: token.uploadResultSuccessIconColor,
    },
  },
  resultTextFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: token.uploadResultGap,
    color: token.uploadResultUploadingIconColor,
  },
  resultText: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '0',
    flex: 1,
    gap: token.uploadResultGap,
    fontSize: token.uploadResultFontSize,
    color: token.uploadResultFontColor,
    lineHeight: token.lineHeightDynamic,
    padding: `${token.uploadResultPaddingY} ${token.uploadResultPaddingX}`,
    backgroundColor: token.uploadResultBackgroundColor,
    borderRadius: token.uploadResultBorderRadius,
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
  },
  values: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  recycle: {},
  imageHandler: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: token.uploadImageBorderRadius,
    border: `1px dashed ${token.uploadImageHandlerBorderColor}`,
    backgroundColor: token.uploadImageHandlerBackgroundColor,
    color: token.uploadImageHandlerFontColor,
    '$wrapper:not($wrapperDisabled) &:hover': {
      borderColor: token.uploadImageHandlerHoverBorderColor,
      color: token.uploadImageHandlerHoverFontColor,
    },
  },
  imageHandlerIcon: {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      width: 30,
      height: 30,
    },
  },
  imageResult: {
    border: `1px solid ${token.uploadImageHandlerBorderColor}`,
    boxSizing: 'border-box',
    borderRadius: token.uploadImageBorderRadius,
    position: 'relative',
    '$resultError&': {
      borderStyle: 'dashed',
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
  },
  imageResultMaskInfo: {
    lineHeight: token.lineHeightDynamic,
    color: token.uploadImageResultMaskIconColor,
  },
  imageResultTopBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
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
    minWidth: '120px',
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
  wrapperDrop: {},
  dropItem: {
    ':not(wrapperDisabled) &[data-soui-dragover="true"]': {
      '& $handler, & $imageHandler, & $imageResult': {
        borderColor: token.uploadImageHandlerHoverBorderColor,
        borderStyle: 'dashed',
        color: token.uploadImageHandlerHoverFontColor,
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
