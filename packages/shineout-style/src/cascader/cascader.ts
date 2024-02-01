import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';

export type CascaderClasses = {
  wrapper: string;
  wrapperDisabled: string;
  wrapperSmall: string;
  wrapperLarge: string;
  wrapperFocus: string;
  wrapperError: string;
  wrapperNoBorder: string;
  wrapperUnderline: string;
  wrapperInnerTitle: string;
  wrapperInnerTitleTop: string;
  wrapperInnerTitleBottom: string;
  wrapperPaddingBox: string;
  resultWrapper: string;
  result: string;
  resultAlignRight: string;
  resultAlignLeft: string;
  resultAlignCenter: string;
  resultText: string;
  resultTextActive: string;
  resultTextDisabled: string;
  resultTextWrapper: string;
  resultTextPadding: string;
  compressedWrapper: string;
  controlMouse: string;
  controlKeyboard: string;
  placeholder: string;
  pickerWrapper: string;
  clearable: string;
  clearIcon: string;
  arrowIconOpen: string;
  arrowIcon: string;
  ellipsis: string;
  multiple: string;
  loading: string;
  checkedIcon: string;
  listContent: string;
  list: string;
  tag: string;
  space: string;
  inputMirror: string;
  moreWrapper: string;
  virtualList: string;
  option: string;
  optionCheckbox: string;
  activeOption: string;
  optionIcon: string;
  optionInner: string;
  optionLeaf: string;
  optionHover: string;
  optionActive: string;
  optionDisabled: string;
};
export type CascaderClassType = keyof CascaderClasses;

const inputBorderToken = {
  lineHeight: token.lineHeightDynamic,
  borderRadius: token.cascaderBorderRadius,

  fontSize: token.cascaderFontSize,
  smallFontSize: token.cascaderSmallFontSize,
  largeFontSize: token.cascaderLargeFontSize,

  paddingY: token.cascaderPaddingY,
  smallPaddingY: token.cascaderSmallPaddingY,
  largePaddingY: token.cascaderLargePaddingY,

  paddingX: token.cascaderPaddingX,
  smallPaddingX: token.cascaderSmallPaddingX,
  largePaddingX: token.cascaderLargePaddingX,

  borderColor: token.cascaderBorderColor,
  focusBorderColor: token.cascaderFocusBorderColor,
  hoverBorderColor: token.cascaderHoverBorderColor,
  disabledBorderColor: token.cascaderDisabledBorderColor,
  errorBorderColor: token.cascaderErrorBorderColor,

  fontColor: token.cascaderFontColor,
  disabledFontColor: token.cascaderDisabledFontColor,

  backgroundColor: token.cascaderBackgroundColor,
  disabledBackgroundColor: token.cascaderDisabledBackgroundColor,

  focusShadow: token.cascaderFocusShadow,
  errorFocusShadow: token.cascaderErrorFocusShadow,

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
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    outline: 'none',
    ...wrapper,
    '&$wrapperSmall': {
      '& $tag': {
        height: 18,
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
  },
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $icon': {
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
    overflow: 'hidden',
    '&:hover': {
      '& $clear': { display: 'inline-flex' },
      '& $clear + $icon': { display: 'none' },
    },
  },
  result: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
    paddingRight: `calc(${token.cascaderSmallFontSize} + ${token.cascaderClearPadding})`,
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
    borderRadius: token.cascaderPanelRadius,
    transformOrigin: '0 0',
  },
  clearable: {},
  clearIcon: {
    position: 'absolute',
    right: token.cascaderPaddingX,
    top: `calc(50% - 1em/2)`,
    cursor: 'pointer',
    width: token.cascaderFontSize,
    lineHeight: 0,
    color: token.cascaderClearColor,
    verticalAlign: 'middle',
  },
  arrowIcon: {
    position: 'absolute',
    right: token.cascaderPaddingX,
    top: `calc(50% - 1em/2)`,
    verticalAlign: 'middle',
    width: token.cascaderFontSize,
    lineHeight: 0,
    color: token.cascaderIconColor,
    transition: 'transform 0.3s',
  },
  arrowIconOpen: {
    transform: 'rotate(180deg)',
    color: token.cascaderHoverBorderColor,
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
  loading: {
    padding: 10,
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
  list: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  tag: {
    '&$tag + &$tag': {
      marginLeft: 0,
    },
    maxWidth: '80%',
    marginRight: 4,
    marginTop: token.cascaderPlaceholderMarginY,
    marginBottom: token.cascaderPlaceholderMarginY,
    textWrap: 'nowrap',
  },
  space: {
    marginTop: token.cascaderPlaceholderMarginY,
    marginBottom: token.cascaderPlaceholderMarginY,
  },
  inputMirror: {
    position: 'absolute',
    left: 0,
    top: 0,
    visibility: 'hidden',
  },
  moreWrapper: {
    width: 248,
    height: 72,
    overflow: 'auto',
    padding: `${token.cascaderMorePaddingY} ${token.cascaderMorePaddingX}`,
  },
  virtualList: {
    margin: 0,
    padding: 0,
  },
  option: {
    listStyle: 'none',
    lineHeight: token.lineHeightDynamic,
    padding: `${token.cascaderOptionPaddingY} ${token.cascaderOptionPaddingX}`,
    '&:not($optionDisabled)': {
      cursor: 'pointer',
    },

    '& $optionCheckbox': {
      marginRight: 8,
    },
    // hover
    '&:not($optionDisabled):hover': {
      '& $optionInner': {
        backgroundColor: token.cascaderOptionHoverBackgroundColor,
      },
    },
  },
  activeOption: {
    '& $optionInner': {
      color: token.cascaderOptionActiveColor,
      backgroundColor: token.cascaderOptionActiveBackgroundColor,
    },
  },
  optionCheckbox: {},
  optionInner: {
    position: 'relative',
    whiteSpace: 'nowrap',
    minWidth: 44,
    display: 'flex',
    fontSize: token.cascaderFontSize,
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
    top: 9,
    fontSize: token.cascaderFontSize,
    lineHeight: 0,
    verticalAlign: 'middle',
    '& svg': {
      verticalAlign: 'middle',
      width: 14,
    },
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
  },
};

export default cascaderStyle;
