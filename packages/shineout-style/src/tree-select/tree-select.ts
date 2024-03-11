import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';

export type TreeSelectClasses = {
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
  multipleCompressedWrapper: string;
  multipleResultWrapper: string;
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
  moreIcon: string;
  list: string;
  tree: string;
  treeOption: string;
  tag: string;
  space: string;
  inputMirror: string;
  moreWrapper: string;
  virtualList: string;
  option: string;
  optionInner: string;
  optionHover: string;
  optionActive: string;
  optionDisabled: string;
  optionGroup: string;
  optionGroupTitle: string;
  header: string;
  customHeader: string;
  columnsTitle: string;
  columns: string;
  columnsOption: string;
  columnsRadio: string;
  columnsCheckbox: string;
  empty: string;
};
export type TreeSelectClassType = keyof TreeSelectClasses;

const inputBorderToken = {
  lineHeight: token.lineHeightDynamic,
  borderRadius: token.treeSelectBorderRadius,

  fontSize: token.treeSelectFontSize,
  smallFontSize: token.treeSelectSmallFontSize,
  largeFontSize: token.treeSelectLargeFontSize,

  paddingY: token.treeSelectPaddingY,
  smallPaddingY: token.treeSelectSmallPaddingY,
  largePaddingY: token.treeSelectLargePaddingY,

  paddingX: token.treeSelectPaddingX,
  smallPaddingX: token.treeSelectSmallPaddingX,
  largePaddingX: token.treeSelectLargePaddingX,

  borderColor: token.treeSelectBorderColor,
  focusBorderColor: token.treeSelectFocusBorderColor,
  hoverBorderColor: token.treeSelectHoverBorderColor,
  disabledBorderColor: token.treeSelectDisabledBorderColor,
  errorBorderColor: token.treeSelectErrorBorderColor,

  fontColor: token.treeSelectFontColor,
  disabledFontColor: token.treeSelectDisabledFontColor,

  backgroundColor: token.treeSelectBackgroundColor,
  disabledBackgroundColor: token.treeSelectDisabledBackgroundColor,

  focusShadow: token.treeSelectFocusShadow,
  errorFocusShadow: token.treeSelectErrorFocusShadow,

  innerTitlePaddingY: token.inputInnerPaddingY,
  innerTitlePaddingX: token.inputInnerPaddingX,

  smallInnerTitlePaddingY: token.inputInnerSmallPaddingY,
  smallInnerTitlePaddingX: token.inputInnerSmallPaddingX,

  largeInnerTitlePaddingY: token.inputInnerLargePaddingY,
  largeInnerTitlePaddingX: token.inputInnerLargePaddingX,
};

const inputBorder = border('wrapper', inputBorderToken);
const { wrapper, wrapperDisabled, ...resetWrapper } = inputBorder;

const treeSelectStyle: JsStyles<TreeSelectClassType> = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
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
        paddingTop: token.treeSelectSmallOptionInnerPaddingY,
        paddingBottom: token.treeSelectSmallOptionInnerPaddingY,
        paddingLeft: token.treeSelectSmallOptionInnerPaddingX,

        // padding: `${token.treeSelectSmallOptionInnerPaddingY} ${token.treeSelectSmallOptionInnerPaddingX}`,
        fontSize: token.treeSelectSmallFontSize,
      },
      '& $clearIcon': {
        right: token.treeSelectSmallPaddingX,
      },
    },
    '&$wrapperLarge': {
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: token.treeSelectLargePlaceholderMarginY,
        marginBottom: token.treeSelectLargePlaceholderMarginY,
      },
      '& $optionInner': {
        // padding: `${token.treeSelectLargeOptionInnerPaddingY} ${token.treeSelectLargeOptionInnerPaddingX}`,
        paddingTop: token.treeSelectLargeOptionInnerPaddingY,
        paddingBottom: token.treeSelectLargeOptionInnerPaddingY,
        paddingLeft: token.treeSelectLargeOptionInnerPaddingX,
        fontSize: token.treeSelectLargeFontSize,
      },
      '& $clearIcon': {
        right: token.treeSelectLargePaddingX,
      },
    },
  },
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $icon': {
      color: token.treeSelectDisabledFontColor,
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
    paddingRight: `calc(${token.treeSelectSmallFontSize} + ${token.treeSelectClearPadding})`,
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
        color: token.treeSelectPlaceholderColor,
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
    padding: `0 ${token.treeSelectResultTextPaddingX}`,
    left: `calc(-1 * ${token.treeSelectResultTextPaddingX})`,
    right: `calc(-1 * ${token.treeSelectResultTextPaddingX})`,
    top: '0',
    bottom: '0',
    borderRadius: token.treeSelectResultTextBorderRadius,
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
        color: token.treeSelectPlaceholderColor,
      },
    },
  },
  resultTextActive: {
    '& $resultTextPadding': {
      backgroundColor: token.treeSelectResultTextActiveBackgroundColor,
    },
  },
  resultTextDisabled: {
    color: token.treeSelectDisabledFontColor,
    cursor: 'not-allowed',
  },
  compressedWrapper: {
    width: 0,
    overflow: 'hidden',
  },
  controlMouse: {
    '& $optionInner:hover': {
      backgroundColor: token.treeSelectOptionHoverBackgroundColor,
    },
  },
  controlKeyboard: {
    '& $optionHover': {
      '& $optionInner': {
        backgroundColor: token.treeSelectOptionHoverBackgroundColor,
      },
    },
  },
  placeholder: {
    color: token.treeSelectPlaceholderColor,
    lineHeight: token.lineHeightDynamic,
    marginTop: token.treeSelectPlaceholderMarginY,
    marginBottom: token.treeSelectPlaceholderMarginY,
  },
  pickerWrapper: {
    position: 'absolute',
    backgroundColor: token.treeSelectPanelBackgroundColor,
    boxShadow: token.treeSelectPanelShadow,
    borderRadius: token.treeSelectPanelRadius,
    transformOrigin: '0 0',
  },
  clearable: {},
  clearIcon: {
    position: 'absolute',
    right: token.treeSelectPaddingX,
    top: `calc(50% - 1em/2)`,
    cursor: 'pointer',
    width: token.treeSelectFontSize,
    lineHeight: 0,
    color: token.treeSelectClearColor,
    verticalAlign: 'middle',
  },
  arrowIcon: {
    position: 'absolute',
    right: token.treeSelectPaddingX,
    top: `calc(50% - 1em/2)`,
    verticalAlign: 'middle',
    width: token.treeSelectFontSize,
    lineHeight: 0,
    color: token.treeSelectIconColor,
    transition: 'transform 0.3s',
  },
  arrowIconOpen: {
    transform: 'rotate(180deg)',
    color: token.treeSelectHoverBorderColor,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: token.treeSelectPlaceholderMarginY,
    marginBottom: token.treeSelectPlaceholderMarginY,
  },
  multiple: {
    '& $optionInner': {
      paddingRight: token.treeSelectOptionInnerPaddingRight,
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
  multipleResultWrapper: {
    flexWrap: 'wrap',
  },
  loading: {
    padding: 10,
  },
  checkedIcon: {
    right: 8,
    top: `calc(50% - 1em/2)`,
    position: 'absolute',
    display: 'inline-flex',
    width: token.treeSelectFontSize,
    fontSize: token.treeSelectFontSize,
  },
  moreIcon: {
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  tree: {
    padding: 4,
    overflow: 'auto',
  },
  treeOption: {
    '& $optionDisabled': {
      cursor: 'not-allowed',
      '&:hover:not([data-active="true"])': {
        backgroundColor: `${token.treeSelectOptionDisabledBackgroundColor}`,
      },
    },
  },
  tag: {
    '&$tag + &$tag': {
      marginLeft: 0,
    },
    maxWidth: '80%',
    marginRight: 4,
    marginTop: token.treeSelectPlaceholderMarginY,
    marginBottom: token.treeSelectPlaceholderMarginY,
    textWrap: 'nowrap',
  },
  space: {
    marginTop: token.treeSelectPlaceholderMarginY,
    marginBottom: token.treeSelectPlaceholderMarginY,
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
    padding: `${token.treeSelectMorePaddingY} ${token.treeSelectMorePaddingX}`,
  },
  virtualList: {
    margin: 0,
    padding: 0,
  },
  option: {
    listStyle: 'none',
    lineHeight: token.lineHeightDynamic,
    padding: `${token.treeSelectOptionPaddingY} ${token.treeSelectOptionPaddingX}`,
    // not disabled
    '&:not($optionDisabled)': {
      cursor: 'pointer',
    },
    // hover
    // '&:hover': {
    //   '& $optionInner': {
    //     backgroundColor: token.treeSelectOptionHoverBackgroundColor,
    //   },
    // },
  },
  optionInner: {
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: token.treeSelectFontSize,
    padding: `${token.treeSelectOptionInnerPaddingY} ${token.treeSelectOptionInnerPaddingX}`,
    borderRadius: token.treeSelectOptionInnerBorderRadius,
  },
  optionHover: {
    // backgroundColor: token.treeSelectOptionHoverBackgroundColor,
    // '& $optionInner:hover': {
    //   backgroundColor: token.treeSelectOptionHoverBackgroundColor,
    // },
  },
  optionActive: {
    color: token.treeSelectOptionActiveColor,
    backgroundColor: token.treeSelectOptionActiveBackgroundColor,
    '&>div': {
      color: token.treeSelectOptionActiveColor,
    },
  },
  optionDisabled: {
    cursor: 'not-allowed',
    color: token.treeSelectOptionDisabledColor,
    backgroundColor: token.treeSelectOptionDisabledBackgroundColor,
    '&>div': {
      cursor: 'not-allowed',
      color: token.treeSelectOptionDisabledColor,
      backgroundColor: token.treeSelectOptionDisabledBackgroundColor,
    },
  },
  optionGroup: {},
  optionGroupTitle: {
    fontSize: token.treeSelectGroupTitleFontSize,
    padding: `${token.treeSelectGroupTitlePaddingY} ${token.treeSelectGroupTitlePaddingX}`,
    color: token.treeSelectGroupTitleFontColor,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 32,
    padding: token.treeSelectHeaderPadding,
    borderBottom: `1px solid ${token.treeSelectHeaderBorderColor}`,

    '& $columnsCheckbox': {
      marginRight: 0,
      width: 'auto',
    },
  },
  columnsTitle: {},
  customHeader: {},
  columns: {
    display: 'flex',
    alignItems: 'center',
    '& $optionGroupTitle': {
      padding: `0 ${token.treeSelectHeaderPadding}`,
      marginLeft: token.treeSelectColumnOptionMargin,
    },
  },
  columnsOption: {
    // flex: 1,
    paddingLeft: token.treeSelectColumnPadding,
    paddingRight: token.treeSelectColumnPadding,
    lineHeight: 1,
    boxSizing: 'border-box',
    overflow: 'hidden',
    '& $columnsCheckbox': {
      marginRight: 0,
    },
  },
  columnsRadio: {
    width: '100%',
    marginLeft: token.treeSelectColumnOptionMargin,
    '& :last-child': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  columnsCheckbox: {
    width: '100%',
    marginLeft: token.treeSelectColumnOptionMargin,
    '& :last-child': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  empty: {
    color: token.selectPlaceholderColor,
  },
};
export default treeSelectStyle;
