import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { DescriptionsClasses } from '@sheinx/base';

export type DescriptionsClassType = keyof DescriptionsClasses;

const descriptionsStyle: JsStyles<DescriptionsClassType> = {
  wrapper: {
    display: 'block',
  },
  small: {
    '& $title': {
      fontSize: token.descriptionsTitleSmallSize,
    },
    '& $table': {
      fontSize: token.descriptionsFontSmallSize,
    },
  },
  large: {
    '& $title': {
      fontSize: token.descriptionsTitleLargeSize,
    },
    '& $table': {
      fontSize: token.descriptionsFontLargeSize,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 0 ${token.descriptionsTitlePaddingBottom} 0`,
    fontSize: token.descriptionsTitleDefaultSize,
  },
  title: {
    lineHeight: token.lineHeightDynamic,
    color: token.descriptionsTitleColor,
    fontWeight: token.descriptionsTitleFontWeight,
    gap: token.descriptionsTitleGap,
    flex: 1,
  },
  extra: {
    lineHeight: token.lineHeightDynamic,
  },
  body: {
    fontSize: token.descriptionsFontDefaultSize,
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    lineHeight: token.lineHeightDynamic,
  },
  row: {},
  label: {
    padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsLabelColor,
    whiteSpace: 'nowrap',
  },
  value: {
    padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsValueColor,
    '&:last-child': {
      padding: `0 0 ${token.descriptionsLabelPaddingBottom} 0`,
    },
  },
  inlineTable: {
    textAlign: 'left',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  },
  item: {
    paddingBottom: token.descriptionsLabelPaddingBottom,
  },
  labelInline: {
    padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsLabelColor,
    whiteSpace: 'nowrap',
  },
  valueInline: {
    padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsValueColor,
  },
  horizontal: {
    '& $label': {
      width: '1px',
    },
  },
  inlineHorizontal: {
    '& $item': {
      display: 'flex',
      alignItems: 'center',
    },
    '& $inlineTable': {
      verticalAlign: 'middle',
    },
  },
  tableLayoutFixed: {
    '& $table': {
      tableLayout: 'fixed',
    },
    '& $label': {
      width: 'auto',
    },
  },
  border: {
    border: `${token.descriptionsBorderDefaultSize} solid ${token.descriptionsBorderColor}`,
    borderRadius: token.descriptionsBorderRadius,
    '& $row:not(:last-child)': {
      borderBottom: `${token.descriptionsBorderBottomSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $label': {
      padding: `${token.descriptionsBorderPaddingX} ${token.descriptionsBorderPaddingY}`,
      backgroundColor: token.descriptionsBackgroundColor,
      borderRight: `${token.descriptionsBorderRightSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $value': {
      padding: `${token.descriptionsBorderPaddingX} ${token.descriptionsBorderPaddingY}`,
      borderRight: `${token.descriptionsBorderRightSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $inlineTable': {
      padding: `${token.descriptionsInlineBorderPaddingX} ${token.descriptionsInlineBorderPaddingY}`,
      borderRight: `${token.descriptionsBorderRightSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $labelInline': {
      padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
    },
    '& $valueInline': {
      padding: 0,
    },
    '& $label:last-child': {
      borderRight: 'none',
    },
    '& $value:last-child': {
      borderRight: 'none',
    },
    '& $item:last-child': {
      borderRight: 'none',
    },
    '& $item': {
      paddingBottom: 0,
    },
  },
};

export default descriptionsStyle;
