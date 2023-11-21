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
  placeholder: string;
  pickerWrapper: string;
  clearable: string;
  clearIcon: string;
  ellipsis: string;
  multiple: string;
  checkedIcon: string;
  list: string;
  tag: string;
  virtualList: string;
  option: string;
  optionInner: string;
  optionHover: string;
  optionActive: string;
  optionDisabled: string;
  optionGroup: string;
  optionGroupTitle: string;
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
    width: token.selectWidth,
    ...wrapper,
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
  },
  resultTextWrapper: {
    display: 'flex',
    flex: '1',
    minWidth: 0,
    textAlign: 'left',
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
  compressedWrapper: {},
  placeholder: {
    color: token.selectPlaceholderColor,
  },
  pickerWrapper: {
    position: 'absolute',
    backgroundColor: token.selectPanelBackgroundColor,
    boxShadow: token.selectPanelShadow,
    borderRadius: token.selectPanelRadius,
  },
  clearable: {},
  clearIcon: {
    cursor: 'pointer',
    width: token.selectFontSize,
    paddingLeft: token.selectClearPadding,
    lineHeight: 0,
    color: token.selectClearColor,
    verticalAlign: 'middle',
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  multiple: {
    '& $optionInner': {
      paddingRight: token.selectOptionInnerPaddingRight,
    },
    '& $resultTextWrapper': {
      flexWrap: 'wrap',
      paddingTop: 1,
      paddingBottom: 1,
    },
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
    '& $placeholder': {
      marginTop: 1,
      marginBottom: 1,
    },
  },
  checkedIcon: {
    right: 8,
    top: 9,
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
    marginRight: 4,
    marginTop: 1,
    marginBottom: 1,
    textWrap: 'nowrap',
  },
  virtualList: {
    margin: 0,
    padding: 0,
  },
  option: {
    listStyle: 'none',
    fontSize: token.selectFontSize,
    lineHeight: token.lineHeightDynamic,
    padding: `${token.selectOptionPaddingY} ${token.selectOptionPaddingX}`,
    // not disabled
    '&:not($optionDisabled)': {
      cursor: 'pointer',
    },
    // hover
    '&:hover': {
      '& $optionInner': {
        backgroundColor: token.selectOptionHoverBackgroundColor,
      },
    },
  },
  optionInner: {
    position: 'relative',
    padding: `${token.selectOptionInnerPaddingY} ${token.selectOptionInnerPaddingX}`,
    borderRadius: token.selectOptionInnerBorderRadius,
  },
  optionHover: {},
  optionActive: {
    color: token.selectOptionActiveColor,
    backgroundColor: token.selectOptionActiveBackgroundColor,
  },
  optionDisabled: {
    color: token.selectOptionDisabledColor,
    backgroundColor: token.selectOptionDisabledBackgroundColor,
  },
  optionGroup: {},
  optionGroupTitle: {},
};

export default selectStyle;
