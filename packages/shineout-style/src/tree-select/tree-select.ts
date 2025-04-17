import token, { getTokenName } from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import border from '../input/input-border';
import { TreeSelectClasses } from '@sheinx/base';

export type TreeSelectClassType = keyof TreeSelectClasses;

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

const treeSelectStyle: JsStyles<TreeSelectClassType> = {
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
        paddingTop: 0,
        paddingBottom: 0,
        height: token.lineHeightDynamic,
        border: 'none',
        '&  *': {
          lineHeight: token.lineHeightDynamic,
        },
      },
      '&$wrapperSmall $tag': {
        height: 18,
        marginBottom: 2,
        '&$tag  *': {
          lineHeight: '18px',
        },
      },
    },
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
      '& $arrowIcon': {
        width: token.treeSelectLargeFontSize,
      },
      '& $clearIcon': {
        right: token.treeSelectLargePaddingX,
      },
    },
    '&:hover': {
      cursor: 'pointer',
      '&$clearable:not($wrapperEmpty)': {
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
  treeWrapper: {
    [getTokenName('treeFontColor')]: token.treeSelectOptionFontColor,
    [getTokenName('treeContentHoverFontColor')]: token.treeSelectContentHoverFontColor,
    [getTokenName('treeContentHoverBackgroundColor')]: token.treeSelectContentHoverBackgroundColor,
    [getTokenName('treeContentActiveBackgroundColor')]:
      token.treeSelectContentActiveBackgroundColor,
    [getTokenName('treeContentActiveFontColor')]: token.treeSelectContentActiveFontColor,
    [getTokenName('treeContentDisabledFontColor')]: token.treeSelectContentDisabledFontColor,
    [getTokenName('treeContentDisabledBackgroundColor')]:
      token.treeSelectContentDisabledBackgroundColor,
  },
  wrapperEmpty: {},
  wrapperOpen: {},
  wrapperDisabled: {
    ...wrapperDisabled,
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
    alignItems: 'center',
    lineHeight: token.lineHeightDynamic,
  },
  hideTag: {},
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
    overflow: 'auto',
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
    border: `1px solid ${token.treeSelectPanelBorder}`,
    borderRadius: token.treeSelectPanelRadius,
    transformOrigin: '0 0',
    width: 'max-content',
    maxWidth: '640px',
    cursor: 'initial',

    '& $tree': {
      overscrollBehavior: 'none',
    },
  },
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
    width: token.treeSelectFontSize,
    lineHeight: 0,
    color: token.treeSelectClearColor,
    verticalAlign: 'middle',
    '&:hover svg': {
      color: token.treeSelectClearHoverColor,
    },
  },
  arrowIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: token.treeSelectFontSize,
    lineHeight: 0,
    color: token.treeSelectIconColor,
    transition: 'transform 0.3s',
    '$wrapperDisabled &': {
      color: token.treeSelectIconDisabledColor,
    },
  },
  arrowIconOpen: {
    transform: 'rotate(180deg)',
    color: token.treeSelectHoverBorderColor,
  },
  ellipsis: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
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
    '& $arrowIconOpen': {
      transform: 'none',
    },
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
    // padding: 4,
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
    flexShrink: 0,
    '&$tag + &$tag': {
      marginLeft: 0,
    },
    maxWidth: '80%',
    marginRight: token.treeSelectTagMarginRight,
    marginTop: token.treeSelectTagMarginY,
    marginBottom: token.treeSelectTagMarginY,
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
    marginTop: token.treeSelectPlaceholderMarginY,
    marginBottom: token.treeSelectPlaceholderMarginY,
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
    maxWidth: 400,
    maxHeight: 160,
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
    lineHeight: token.lineHeightDynamic,
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
    // color: token.treeSelectOptionActiveColor,
    // backgroundColor: token.treeSelectOptionActiveBackgroundColor,
    // '&>div': {
    //   color: token.treeSelectOptionActiveColor,
    // },
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
