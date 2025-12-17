import token from '@sheinx/theme';
import { SelectClasses } from '@sheinx/base';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';

export type SelectClassType = keyof SelectClasses;

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

const selectStyle: JsStyles<SelectClassType> = {
  rootClass: {},
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
        marginTop: 1,
        marginBottom: 1,
      },
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    '&$wrapperLarge': {
      '& $placeholder,$ellipsis,$space,input': {
        marginTop: token.selectLargePlaceholderMarginY,
        marginBottom: token.selectLargePlaceholderMarginY,
      },
      '& $arrowIcon': {
        width: token.selectLargeFontSize,
      },
    },
    '&:hover': {
      ...wrapper['&:hover'],
      cursor: 'pointer',
      '&$clearable:not($wrapperEmpty):not($wrapperDisabled)': {
        '& $clearIcon': {
          display: 'block',
        },
        '& $arrowIcon': {
          display: 'none',
        },
      },
    },
    '&:not($wrapperEmpty):not($wrapperOpen)': {
      '& $clearIcon': {
        display: 'none',
      },
    },
  },
  wrapperEmpty: {},
  wrapperOpen: {},
  wrapperDisabled: {
    ...wrapperDisabled,
    '& $arrowIcon': {
      color: token.selectDisabledIconColor,
    },
    '& $placeholder': {
      color: token.selectDisabledPlaceholderColor,
    },
  },
  triggerHover: {
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      left: 0,
      height: 4,
      bottom: -4,
    },
  },
  popover: {},
  ...resetWrapper,
  resultWrapper: {
    display: 'flex',
    flex: 1,
    minWidth: 0,
    maxHeight: 78,
    position: 'relative',
    outline: 'none',
    // overflow: 'hidden',
    overflow: 'auto',
  },
  result: {
    display: 'flex',
    flex: '1',
    height: '100%',
    minWidth: 0,
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
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
      // width: 12,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '&::placeholder': {
        color: token.selectPlaceholderColor,
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
  compressedBoundWrapper: {
    overflow: 'auto',
  },
  controlMouse: {
    '& $optionInner:not($optionDisabled):not($optionActive):hover': {
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
    overflow: 'hidden',
    backgroundColor: token.selectPanelBackgroundColor,
    boxShadow: token.selectPanelShadow,
    borderRadius: token.selectPanelRadius,
    transformOrigin: '0 0',
    border: `1px solid ${token.selectPanelBorder}`,
    cursor: 'initial',

    '& [data-soui-role="scroll"]': {
      overscrollBehavior: 'none',
    },
  },
  pickerSmall: {
    '& $optionInner': {
      paddingTop: token.selectSmallOptionInnerPaddingY,
      paddingBottom: token.selectSmallOptionInnerPaddingY,
      paddingLeft: token.selectSmallOptionInnerPaddingX,
      fontSize: token.selectSmallFontSize,
    },
    '& $optionGroupTitle': {
      padding: `calc(${token.selectFontSize} - 10px) ${token.selectGroupTitlePaddingX} 0 ${token.selectGroupTitlePaddingX}`,
    },
  },
  pickerLarge: {
    '& $optionInner': {
      // padding: `${token.selectLargeOptionInnerPaddingY} ${token.selectLargeOptionInnerPaddingX}`,
      paddingTop: token.selectLargeOptionInnerPaddingY,
      paddingBottom: token.selectLargeOptionInnerPaddingY,
      paddingLeft: token.selectLargeOptionInnerPaddingX,
      fontSize: token.selectLargeFontSize,
    },
    '& $optionGroupTitle': {
      padding: `calc(${token.selectFontSize} + 2px) ${token.selectGroupTitlePaddingX} ${token.selectGroupTitleLargeBottom} ${token.selectGroupTitlePaddingX}`,
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    justifyContent: 'center',
    marginLeft: token.selectIconMarginLeft,
  },
  clearable: {},
  clearIcon: {
    cursor: 'pointer',
    width: token.selectFontSize,
    lineHeight: 0,
    color: token.selectClearColor,
    verticalAlign: 'middle',
    '&:hover': {
      color: token.selectIconColor,
    },
  },
  arrowIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: token.selectFontSize,
    lineHeight: 0,
    color: token.selectIconColor,
    transition: 'transform 0.3s',
  },
  arrowIconOpen: {
    transform: 'rotate(180deg)',
    color: token.selectHoverBorderColor,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    whiteSpace: 'nowrap',
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
  },
  multiple: {
    '& $compressedWrapper': {
      flexWrap: 'nowrap',
    },
    '& $placeholder': {},
    '& $arrowIconOpen': {
      transform: 'none',
    },
  },
  multipleCompressedWrapper: {
    flexWrap: 'nowrap',
  },
  multipleList: {
    '& $optionInner': {
      paddingRight: token.selectOptionInnerPaddingRight,
    },
  },
  loading: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    '& > $loadingSpin': {
      borderColor: token.selectLoadingSpinColor,
      borderTopColor: 'transparent',
    },
  },
  loadingSpin: {},
  checkedIcon: {
    '&[dir=ltr]': { right: 8 },
    '&[dir=rtl]': { left: 8 },
    top: `calc(50% - 1em/2)`,
    position: 'absolute',
    display: 'inline-flex',
    width: token.selectFontSize,
    fontSize: token.selectFontSize,
  },
  moreIcon: {},
  hideTag: {},
  list: {},
  tree: {
    padding: '0 4px',
    overflow: 'auto',
  },
  treeOption: {
    '& $optionDisabled': {
      cursor: 'not-allowed',
      '&:hover:not([data-active="true"])': {
        backgroundColor: `${token.selectOptionDisabledBackgroundColor}`,
      },
    },
  },
  tag: {
    flexShrink: 0,
    '&$tag + &$tag': {
      marginLeft: 0,
    },
    maxWidth: '80%',
    marginRight: token.selectTagMarginRight,
    marginTop: token.selectTagMarginY,
    marginBottom: token.selectTagMarginY,
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
    marginTop: token.selectPlaceholderMarginY,
    marginBottom: token.selectPlaceholderMarginY,
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
    padding: `${token.selectMorePaddingY} ${token.selectMorePaddingX}`,
    '& $tag': {
      maxWidth: 'none',
    },
    '&:hover': {
      '& $clearIcon': {
        display: 'inline-block',
      },
    },
  },
  virtualList: {
    margin: 0,
    padding: 0,
    width: '100%',
  },
  dynamicList: {
    '& $optionInner': {
      textWrap: 'wrap',
    },
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
    height: '100%',
    color: token.selectOptionFontColor,
    fontSize: token.selectFontSize,
    lineHeight: token.lineHeightDynamic,
    background: token.selectOptionBackgroundColor,
    padding: `${token.selectOptionInnerPaddingY} ${token.selectOptionInnerPaddingX}`,
    borderRadius: token.selectOptionInnerBorderRadius,
    // hover
    '&:not($optionDisabled):not($optionActive):hover': {
      color: token.selectOptionHoverFontColor,
    },
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
    '&>div': {
      color: token.selectOptionActiveColor,
    },
  },
  optionDisabled: {
    cursor: 'not-allowed',
    color: token.selectOptionDisabledColor,
    backgroundColor: token.selectOptionDisabledBackgroundColor,
    '&>div': {
      cursor: 'not-allowed',
      color: token.selectOptionDisabledColor,
      backgroundColor: token.selectOptionDisabledBackgroundColor,
    },
  },
  optionGroup: {},
  optionGroupTitle: {
    fontSize: token.selectGroupTitleFontSize,
    lineHeight: token.lineHeightDynamic,
    padding: `calc(${token.selectFontSize} - 4px) ${token.selectGroupTitlePaddingX} ${token.selectGroupTitlePaddingBottom} ${token.selectGroupTitlePaddingX}`,
    color: token.selectGroupTitleFontColor,
    fontWeight: token.selectGroupTitleFontWeight,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 32,
    padding: `${token.selectHeaderPaddingY} ${token.selectHeaderPaddingX}`,
    borderBottom: `1px solid ${token.selectHeaderBorderColor}`,
    '& $columnsCheckbox': {
      marginRight: 0,
      marginLeft: 4,
      width: 'auto',
    },
  },
  footer: {},
  columnsTitle: {},
  customHeader: {},
  columns: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${token.selectOptionPaddingX}`,
    '& $optionGroupTitle': {
      padding: `0 ${token.selectHeaderPaddingX}`,
      marginLeft: token.selectColumnOptionMargin,
    },
  },
  columnsOption: {
    paddingLeft: token.selectColumnPadding,
    paddingRight: token.selectColumnPadding,
    lineHeight: 1,
    boxSizing: 'border-box',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& $columnsCheckbox': {
      marginRight: 0,
    },
    '&:not($optionDisabled):hover': {
      background: token.selectOptionHoverBackgroundColor,
      borderRadius: token.selectPanelRadius,
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
    // marginLeft: token.selectColumnOptionMargin,
    marginLeft: 0,
    '& :last-child': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  empty: {
    color: token.selectEmptyFontColor,
  },
};

export default selectStyle;
