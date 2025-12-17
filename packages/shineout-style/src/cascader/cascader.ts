import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';
import { CascaderClasses } from '@sheinx/base';

export type CascaderClassType = keyof CascaderClasses;

const inputBorderToken = {
  lineHeight: token.lineHeightDynamic,
  borderRadius: token.inputBorderRadius,

  fontSize: token.inputFontSize,
  fontWeight: token.inputFontWeight,
  smallFontSize: token.inputSmallFontSize,
  largeFontSize: token.inputLargeFontSize,

  paddingY: token.selectPaddingY,
  smallPaddingY: token.selectSmallPaddingY,
  largePaddingY: token.selectLargePaddingY,

  paddingX: token.selectPaddingX,
  smallPaddingX: token.selectSmallPaddingX,
  largePaddingX: token.selectLargePaddingX,

  borderColor: token.inputBorderColor,
  borderWidth: token.inputBorderWidth,
  focusBorderColor: token.inputFocusBorderColor,
  hoverBorderColor: token.inputHoverBorderColor,
  disabledBorderColor: token.inputDisabledBorderColor,
  errorBorderColor: token.inputErrorBorderColor,
  errorHoverBorderColor: token.inputErrorHoverBorderColor,
  errorFocusBorderColor: token.inputErrorFocusBorderColor,

  fontColor: token.inputFontColor,
  disabledFontColor: token.inputDisabledFontColor,

  backgroundColor: token.inputBackgroundColor,
  hoverBackgroundColor: token.inputHoverBackgroundColor,
  focusBackgroundColor: token.inputFocusBackgroundColor,
  disabledBackgroundColor: token.inputDisabledBackgroundColor,
  errorBackgroundColor: token.inputErrorBackgroundColor,
  errorFocusBackgroundColor: token.inputErrorFocusBackgroundColor,
  errorHoverBackgroundColor: token.inputErrorHoverBackgroundColor,

  focusShadow: token.inputFocusShadow,
  errorFocusShadow: token.inputErrorFocusShadow,

  innerTitlePaddingY: token.inputInnerPaddingY,
  innerTitlePaddingX: token.inputInnerPaddingX,

  smallInnerTitlePaddingY: token.inputInnerSmallPaddingY,
  smallInnerTitlePaddingX: token.inputInnerSmallPaddingX,

  largeInnerTitlePaddingY: token.inputInnerLargePaddingY,
  largeInnerTitlePaddingX: token.inputInnerLargePaddingX,
};

const inputBorder = border('wrapper', inputBorderToken);
const { wrapper, wrapperDisabled, ...resetWrapper } = inputBorder;

const cascaderStyle: JsStyles<CascaderClassType> = {
  rootClass: {},
  wrapperEmpty: {},
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    ...wrapper,

    '&$wrapperInnerTitle': {
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: 0,
        marginBottom: 0,
      },
      '& $tag': {
        marginTop: 0,
        marginBottom: token.selectInnerTitleMarginY,
        paddingTop: 0,
        paddingBottom: 0,
        border: 'none',
      },
      '&$wrapperSmall $tag': {
        marginBottom: 2,
      },
      '&$wrapperLarge $tag': {
        marginBottom: 2,
      },
    },
    '&$wrapperSmall': {
      '& $tag': {
        lineHeight: '16px',
        marginTop: 1,
        marginBottom: 1,
      },
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: 0,
        marginBottom: 0,
      },
      '& $optionInner': {
        paddingTop: token.cascaderSmallOptionInnerPaddingY,
        paddingBottom: token.cascaderSmallOptionInnerPaddingY,
        paddingLeft: token.cascaderSmallOptionInnerPaddingX,

        // padding: `${token.cascaderSmallOptionInnerPaddingY} ${token.cascaderSmallOptionInnerPaddingX}`,
        fontSize: token.cascaderSmallFontSize,
      },
      '& $clearIcon': {
        right: token.cascaderSmallPaddingX,
      },
    },
    '&$wrapperLarge': {
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: token.cascaderLargePlaceholderMarginY,
        marginBottom: token.cascaderLargePlaceholderMarginY,
      },
      '& $arrowIcon': {
        width: token.cascaderLargeFontSize,
      },
      '& $optionInner': {
        // padding: `${token.cascaderLargeOptionInnerPaddingY} ${token.cascaderLargeOptionInnerPaddingX}`,
        paddingTop: token.cascaderLargeOptionInnerPaddingY,
        paddingBottom: token.cascaderLargeOptionInnerPaddingY,
        paddingLeft: token.cascaderLargeOptionInnerPaddingX,
        fontSize: token.cascaderLargeFontSize,
      },
      '& $clearIcon': {
        right: token.cascaderLargePaddingX,
      },
    },
    // hover
    '&:hover': {
      ...wrapper['&:hover'],
      '& $clearIcon': {
        display: 'inline-block',
      },
      '&$clearable:not($wrapperEmpty)': {
        '& :not($compressedIcon)$arrowIcon': {
          display: 'none',
        },
        '& $compressedIcon': {
          display: 'none',
        },
      },
    },
    '&:has($pickerWrapperShow)': {
      borderColor: token.cascaderFocusBorderColor,
    },
    // not wrapperFocus
    '&:not($wrapperFocus)': {
      '& $clearIcon': {
        display: 'none',
      },
    },
  },
  virtual: {
    '& $filterList': {
      overflow: 'hidden',
    },
  },
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $arrowIcon': {
      color: token.cascaderDisabledFontColor,
    },
  },
  ...resetWrapper,
  resultWrapper: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    position: 'relative',
    outline: 'none',
    maxHeight: 78,
    overflow: 'auto',
  },
  result: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
    height: '100%',
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
  },
  resultItem: {
    transition: 'color 0.3s',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // hover
    '&:hover': {
      color: token.cascaderResultItemHoverColor,
    },
    // active
    '&:active': {
      color: token.cascaderResultItemActiveColor,
    },
  },
  resultItemActive: {
    color: token.cascaderResultItemCheckedColor,
  },
  resultTextWrapper: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
    textAlign: 'left',

    '& > input': {
      marginTop: 2,
      marginBottom: 2,
      color: 'inherit',
      padding: 0,
      border: 0,
      outline: 0,
      fontSize: 'inherit',
      lineHeight: token.lineHeightDynamic,
      backgroundColor: 'transparent',
      minWidth: 12,
      maxWidth: '100%',
      // flex: 1,
      width: 12,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '&::placeholder': {
        color: token.cascaderPlaceholderColor,
      },
    },
  },
  multipleResultWrapper: {
    flexWrap: 'wrap',
  },
  resultAlignLeft: {
    '& $resultTextWrapper': {
      textAlign: 'left',
    },
  },
  resultAlignRight: {
    '& $resultTextWrapper': {
      textAlign: 'right',
    },
  },
  resultAlignCenter: {
    '& $resultTextWrapper': {
      textAlign: 'center',
    },
  },
  resultText: {
    lineHeight: token.lineHeightDynamic,
    position: 'relative',
    flex: '1',
    minWidth: 0,
    '&::before': {
      content: '""',
      display: 'inline-block',
    },
  },
  resultTextPadding: {
    position: 'absolute',
    padding: `0 ${token.cascaderResultTextPaddingX}`,
    left: `calc(-1 * ${token.cascaderResultTextPaddingX})`,
    right: `calc(-1 * ${token.cascaderResultTextPaddingX})`,
    top: '0',
    bottom: '0',
    borderRadius: token.cascaderResultTextBorderRadius,
    '& > input': {
      color: 'inherit',
      padding: '0',
      border: '0',
      outline: '0',
      fontSize: 'inherit',
      lineHeight: token.lineHeightDynamic,
      backgroundColor: 'transparent',
      width: '100%',
      '&::placeholder': {
        color: token.cascaderPlaceholderColor,
      },
    },
  },
  resultTextActive: {
    '& $resultTextPadding': {
      backgroundColor: token.cascaderResultTextActiveBackgroundColor,
    },
  },
  resultTextDisabled: {
    color: token.cascaderDisabledFontColor,
    cursor: 'not-allowed',
  },
  compressedWrapper: {
    width: 0,
    overflow: 'hidden',
  },
  compressedBoundWrapper: {
    overflow: 'auto',
  },
  controlMouse: {
    '& $optionInner:hover': {
      backgroundColor: token.cascaderOptionHoverBackgroundColor,
    },
  },
  controlKeyboard: {
    '& $optionHover': {
      '& $optionInner': {
        backgroundColor: token.cascaderOptionHoverBackgroundColor,
      },
    },
  },
  placeholder: {
    color: token.cascaderPlaceholderColor,
    lineHeight: token.lineHeightDynamic,
    marginTop: token.cascaderPlaceholderMarginY,
    marginBottom: token.cascaderPlaceholderMarginY,
  },
  pickerWrapper: {
    position: 'absolute',
    backgroundColor: token.cascaderPanelBackgroundColor,
    boxShadow: token.cascaderPanelShadow,
    border: `1px solid ${token.cascaderPanelBorder}`,
    borderRadius: token.cascaderPanelRadius,
    transformOrigin: '0 0',
    cursor: 'initial',
  },
  pickerWrapperShow: {},
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
  },
  clearable: {},
  clearIcon: {
    cursor: 'pointer',
    width: token.cascaderFontSize,
    lineHeight: 0,
    color: token.cascaderClearColor,
    verticalAlign: 'middle',
    '&:hover': {
      color: token.cascaderClearHoverColor,
    },
  },
  compressedIcon: {},
  arrowIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: token.cascaderFontSize,
    lineHeight: 0,
    color: token.cascaderIconColor,
    transition: 'transform 0.3s',
  },
  arrowIconOpen: {
    color: token.cascaderHoverBorderColor,
    '&:not($compressedIcon)': {
      transform: 'rotate(180deg)',
    },
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: token.cascaderPlaceholderMarginY,
    marginBottom: token.cascaderPlaceholderMarginY,
  },
  multiple: {
    '& $optionInner': {
      paddingRight: token.cascaderOptionInnerPaddingRight,
    },
    '& $resultTextWrapper': {
      flexWrap: 'wrap',
    },
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
    '& $placeholder': {},
  },
  multipleCompressedWrapper: {
    flexWrap: 'nowrap',
  },
  loading: {
    padding: 10,
    color: token.cascaderPlaceholderColor,
    display: 'flex',
    justifyContent: 'center',
  },
  empty: {
    padding: `calc(${token.cascaderOptionPaddingY} + ${token.cascaderOptionInnerPaddingY}) calc(${token.cascaderOptionPaddingX} + ${token.cascaderOptionInnerPaddingX})`,
    color: token.cascaderPlaceholderColor,
  },
  checkedIcon: {
    right: 8,
    top: `calc(50% - 1em/2)`,
    position: 'absolute',
    display: 'inline-flex',
    width: token.cascaderFontSize,
    fontSize: token.cascaderFontSize,
  },
  listContent: {
    display: 'flex',
    '& > $list:not(:last-child)': {
      // 你的样式
      borderRight: `1px solid ${token.cascaderListBorderColor}`,
    },
  },
  filterList: {
    display: 'block',
    overflow: 'auto',
    '& $list': {
      width: '100%',
    },
  },
  hideTag: {},
  list: {
    display: 'inline-block',
  },
  listSimple: {
    overflow: 'auto',
    paddingTop: token.cascaderListPaddingY,
    paddingBottom: token.cascaderListPaddingY,
  },
  tag: {
    flexShrink: 0,
    '&$tag + &$tag': {
      marginLeft: 0,
    },
    maxWidth: '80%',
    marginRight: token.cascaderTagMarginRight,
    marginTop: token.cascaderTagMarginY,
    marginBottom: token.cascaderTagMarginY,
    textWrap: 'nowrap',
    '&$hideTag': {
      marginRight: 0,
    },
  },
  tagOnly: {
    flexShrink: 1,
    minWidth: 42,
  },
  space: {
    marginTop: token.cascaderPlaceholderMarginY,
    marginBottom: token.cascaderPlaceholderMarginY,
  },
  inputPlaceholder: {
    pointerEvents: 'none',
    opacity: 0.5,
    inset: 0,
    position: 'absolute',
    padding: `${token.selectOptionInnerPaddingY} ${token.selectOptionInnerPaddingX}`,
  },
  inputMirror: {
    position: 'absolute',
    left: 0,
    top: 0,
    visibility: 'hidden',
  },
  moreWrapper: {
    width: 'max-content',
    maxWidth: 400,
    maxHeight: 160,
    overflow: 'auto',
    padding: `${token.cascaderMorePaddingY} ${token.cascaderMorePaddingX}`,
    '& $tag': {
      maxWidth: 'none',
    },
  },
  virtualList: {
    margin: 0,
    padding: 0,
  },
  option: {
    listStyle: 'none',
    lineHeight: token.lineHeightDynamic,
    minWidth: 64,
    padding: `${token.cascaderOptionPaddingY} ${token.cascaderOptionPaddingX}`,
    '&:not($optionDisabled):not($activeOption)': {
      cursor: 'pointer',
      '&:hover': {
        '& $optionInner': {
          color: token.cascaderOptionHoverFontColor,
          backgroundColor: token.cascaderOptionHoverBackgroundColor,
        },
      },
      '&:hover $optionInner:active, & $optionInner:active': {
        color: token.cascaderOptionHoverFontColor,
        backgroundColor: `${token.cascaderOptionFocusBackgroundColor}`,
      },
    },

    '& $optionCheckbox': {
      marginRight: 8,
    },
  },
  filterOption: {
    display: 'flex',
    '& $optionInner': {
      width: '100%',
    },
  },
  filterOptionItem: {
    // not disabled
    '&:not($filterDisabledOption):hover': {
      color: token.cascaderOptionItemHoverFontColor,
    },
  },
  filterDisabledOption: {
    color: token.cascaderOptionDisabledColor,
  },
  filterOptionSeparator: {},
  activeOption: {
    '& $optionInner': {
      color: token.cascaderOptionActiveColor,
      backgroundColor: token.cascaderOptionActiveBackgroundColor,
      '& $optionIcon': {
        color: token.cascaderOptionActiveColor,
      },
    },
  },
  optionCheckbox: {},
  optionInner: {
    position: 'relative',
    whiteSpace: 'nowrap',
    minWidth: 44,
    display: 'flex',
    color: token.cascaderOptionFontColor,
    fontSize: token.cascaderFontSize,
    background: token.cascaderOptionBackgroundColor,
    lineHeight: token.lineHeightDynamic,
    padding: `${token.cascaderOptionInnerPaddingY} ${token.cascaderOptionInnerPaddingX}`,
    paddingRight: 30,
    borderRadius: token.cascaderOptionInnerBorderRadius,
  },
  optionLeaf: {
    paddingRight: 8,
  },
  optionIcon: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    fontSize: token.cascaderFontSize,
    color: token.cascaderOptionIconColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      verticalAlign: 'middle',
      width: token.cascaderOptionIconSize,

      '$wrapperLarge &': {
        width: token.cascaderLargeOptionIconSize,
      },
      '$wrapperSmall &': {
        width: token.cascaderSmallOptionIconSize,
      },
    },
  },
  optionSpin: {
    paddingTop: 2,
  },
  optionHover: {},
  optionActive: {
    color: token.cascaderOptionActiveColor,
    backgroundColor: token.cascaderOptionActiveBackgroundColor,
    '&>div': {
      color: token.cascaderOptionActiveColor,
    },
  },
  optionDisabled: {
    cursor: 'not-allowed',
    color: token.cascaderOptionDisabledColor,
    backgroundColor: token.cascaderOptionDisabledBackgroundColor,
    '&>div': {
      cursor: 'not-allowed',
      color: token.cascaderOptionDisabledColor,
      backgroundColor: token.cascaderOptionDisabledBackgroundColor,
    },
    '& $optionIcon': {
      color: token.cascaderOptionDisabledColor,
    },
  },
};

export default cascaderStyle;
