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
    width: token.selectWidth,
    ...wrapper,
    '&$wrapperSmall': {
      '& $wrapperPaddingBox': {
        paddingTop: 0.5,
        paddingBottom: 0.5,
      },
      '& $placeholder': {
        marginTop: 0,
        marginBottom: 0,
      },
      '& $resultTextWrapper': {
        paddingTop: 0,
        paddingBottom: 0,
        '& > input': {
          marginTop: 0,
          marginBottom: 0,
        },
      },
      '& $tag': {
        // marginTop: 0.5,
        // marginBottom: 0.5,
      },
    },
    '&$wrapperLarge': {},
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
    gap: '4px',
    '& > input': {
      marginTop: 3,
      marginBottom: 3,
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
  placeholder: {
    color: token.selectPlaceholderColor,
    lineHeight: token.lineHeightDynamic,
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
      '& > input': {
        marginTop: 2,
        marginBottom: 2,
      },
    },
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
    '& $placeholder': {},
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
    // marginRight: 4,
    // marginTop: 2,
    // marginBottom: 2,
    textWrap: 'nowrap',
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
  },
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
