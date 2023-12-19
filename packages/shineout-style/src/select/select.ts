import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';

export type SelectClasses = {
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
  ellipsis: string;
  multiple: string;
  checkedIcon: string;
  list: string;
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
};
export type SelectClassType = keyof SelectClasses;

const inputBorderToken = {
  lineHeight: token.lineHeightDynamic,
  borderRadius: token.selectBorderRadius,

  fontSize: token.selectFontSize,
  smallFontSize: token.selectSmallFontSize,
  largeFontSize: token.selectLargeFontSize,

  paddingY: token.selectPaddingY,
  smallPaddingY: token.selectSmallPaddingY,
  largePaddingY: token.selectLargePaddingY,

  paddingX: token.selectPaddingX,
  smallPaddingX: token.selectSmallPaddingX,
  largePaddingX: token.selectLargePaddingX,

  borderColor: token.selectBorderColor,
  focusBorderColor: token.selectFocusBorderColor,
  hoverBorderColor: token.selectHoverBorderColor,
  disabledBorderColor: token.selectDisabledBorderColor,
  errorBorderColor: token.selectErrorBorderColor,

  fontColor: token.selectFontColor,
  disabledFontColor: token.selectDisabledFontColor,

  backgroundColor: token.selectBackgroundColor,
  disabledBackgroundColor: token.selectDisabledBackgroundColor,

  focusShadow: token.selectFocusShadow,
  errorFocusShadow: token.selectErrorFocusShadow,

  innerTitlePaddingY: token.inputInnerPaddingY,
  innerTitlePaddingX: token.inputInnerPaddingX,

  smallInnerTitlePaddingY: token.inputInnerSmallPaddingY,
  smallInnerTitlePaddingX: token.inputInnerSmallPaddingX,

  largeInnerTitlePaddingY: token.inputInnerLargePaddingY,
  largeInnerTitlePaddingX: token.inputInnerLargePaddingX,
};

const inputBorder = border('wrapper', inputBorderToken);
const { wrapper, wrapperDisabled, ...resetWrapper } = inputBorder;

const selectStyle: JsStyles<SelectClassType> = {
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
        paddingTop: token.selectSmallOptionInnerPaddingY,
        paddingBottom: token.selectSmallOptionInnerPaddingY,
        paddingLeft: token.selectSmallOptionInnerPaddingX,

        // padding: `${token.selectSmallOptionInnerPaddingY} ${token.selectSmallOptionInnerPaddingX}`,
        fontSize: token.selectSmallFontSize,
      },
      '& $clearIcon': {
        right: token.selectSmallPaddingX,
      },
    },
    '&$wrapperLarge': {
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: token.selectLargePlaceholderMarginY,
        marginBottom: token.selectLargePlaceholderMarginY,
      },
      '& $optionInner': {
        // padding: `${token.selectLargeOptionInnerPaddingY} ${token.selectLargeOptionInnerPaddingX}`,
        paddingTop: token.selectLargeOptionInnerPaddingY,
        paddingBottom: token.selectLargeOptionInnerPaddingY,
        paddingLeft: token.selectLargeOptionInnerPaddingX,
        fontSize: token.selectLargeFontSize,
      },
      '& $clearIcon': {
        right: token.selectLargePaddingX,
      },
    },
  },
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $icon': {
      color: token.selectDisabledFontColor,
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
    paddingRight: `calc(${token.selectSmallFontSize} + ${token.selectClearPadding})`,
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
        color: token.selectPlaceholderColor,
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
    padding: `0 ${token.selectResultTextPaddingX}`,
    left: `calc(-1 * ${token.selectResultTextPaddingX})`,
    right: `calc(-1 * ${token.selectResultTextPaddingX})`,
    top: '0',
    bottom: '0',
    borderRadius: token.selectResultTextBorderRadius,
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
        color: token.selectPlaceholderColor,
      },
    },
  },
  resultTextActive: {
    '& $resultTextPadding': {
      backgroundColor: token.selectResultTextActiveBackgroundColor,
    },
  },
  resultTextDisabled: {
    color: token.selectDisabledFontColor,
    cursor: 'not-allowed',
  },
  compressedWrapper: {
    width: 0,
    overflow: 'hidden',
  },
  controlMouse: {
    '& $optionInner:hover': {
      backgroundColor: token.selectOptionHoverBackgroundColor,
    },
  },
  controlKeyboard: {
    '& $optionHover': {
      '& $optionInner': {
        backgroundColor: token.selectOptionHoverBackgroundColor,
      },
    },
  },
  placeholder: {
    color: token.selectPlaceholderColor,
    lineHeight: token.lineHeightDynamic,
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
  },
  pickerWrapper: {
    position: 'absolute',
    backgroundColor: token.selectPanelBackgroundColor,
    boxShadow: token.selectPanelShadow,
    borderRadius: token.selectPanelRadius,
    transformOrigin: '0 0',
  },
  clearable: {},
  clearIcon: {
    position: 'absolute',
    right: token.selectPaddingX,
    cursor: 'pointer',
    width: token.selectFontSize,
    lineHeight: 0,
    color: token.selectClearColor,
    verticalAlign: 'middle',
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
  },
  multiple: {
    '& $optionInner': {
      paddingRight: token.selectOptionInnerPaddingRight,
    },
    '& $resultTextWrapper': {
      flexWrap: 'wrap',
    },
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
    '& $placeholder': {},
  },
  checkedIcon: {
    right: 8,
    top: `calc(50% - 1em/2)`,
    position: 'absolute',
    display: 'inline-flex',
    width: token.selectFontSize,
    fontSize: token.selectFontSize,
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
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
    textWrap: 'nowrap',
  },
  space: {
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
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
    padding: `${token.selectMorePaddingY} ${token.selectMorePaddingX}`,
  },
  virtualList: {
    margin: 0,
    padding: 0,
  },
  option: {
    listStyle: 'none',
    lineHeight: token.lineHeightDynamic,
    padding: `${token.selectOptionPaddingY} ${token.selectOptionPaddingX}`,
    // not disabled
    '&:not($optionDisabled)': {
      cursor: 'pointer',
    },
    // hover
    // '&:hover': {
    //   '& $optionInner': {
    //     backgroundColor: token.selectOptionHoverBackgroundColor,
    //   },
    // },
  },
  optionInner: {
    position: 'relative',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: token.selectFontSize,
    padding: `${token.selectOptionInnerPaddingY} ${token.selectOptionInnerPaddingX}`,
    borderRadius: token.selectOptionInnerBorderRadius,
  },
  optionHover: {
    // backgroundColor: token.selectOptionHoverBackgroundColor,
    // '& $optionInner:hover': {
    //   backgroundColor: token.selectOptionHoverBackgroundColor,
    // },
  },
  optionActive: {
    color: token.selectOptionActiveColor,
    backgroundColor: token.selectOptionActiveBackgroundColor,
  },
  optionDisabled: {
    color: token.selectOptionDisabledColor,
    backgroundColor: token.selectOptionDisabledBackgroundColor,
  },
  optionGroup: {},
  optionGroupTitle: {
    fontSize: token.selectGroupTitleFontSize,
    padding: `${token.selectGroupTitlePaddingY} ${token.selectGroupTitlePaddingX}`,
    color: token.selectGroupTitleFontColor,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 32,
    padding: token.selectHeaderPadding,
    borderBottom: `1px solid ${token.selectHeaderBorderColor}`,

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
      padding: `0 ${token.selectHeaderPadding}`,
      marginLeft: token.selectColumnOptionMargin,
    },
  },
  columnsOption: {
    // flex: 1,
    paddingLeft: token.selectColumnPadding,
    paddingRight: token.selectColumnPadding,
    lineHeight: 1,
    boxSizing: 'border-box',
    overflow: 'hidden',
    '& $columnsCheckbox': {
      marginRight: 0,
    },
  },
  columnsRadio: {
    width: '100%',
    marginLeft: token.selectColumnOptionMargin,
    '& :last-child': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  columnsCheckbox: {
    width: '100%',
    marginLeft: token.selectColumnOptionMargin,
    '& :last-child': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
};

export default selectStyle;
