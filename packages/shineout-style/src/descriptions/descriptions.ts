import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type DescriptionsClass =
  | 'wrapper'
  | 'header'
  | 'title'
  | 'extra'
  | 'body'
  | 'table'
  | 'row'
  | 'label'
  | 'value'
  | 'tableLayoutFixed'
  | 'border'
  | 'small'
  | 'large'
  | 'item'
  | 'labelInline'
  | 'valueInline'
  | 'inlineHorizontal'
  | 'horizontal'
  | 'inlineTable';

const descriptionsStyle: JsStyles<DescriptionsClass> = {
  wrapper: {
    display: 'block',
  },
  small: {
    '& $title': {
      fontSize: token.descriptionsTitleSmallSize,
    },
    '& $table': {
      fontSize: token.descriptionsTableSmallSize,
    },
  },
  large: {
    '& $title': {
      fontSize: token.descriptionsTitleLargeSize,
    },
    '& $table': {
      fontSize: token.descriptionsTableLargeSize,
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
    fontSize: token.descriptionsTableDefaultSize,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    lineHeight: token.lineHeightDynamic,
  },
  row: {},
  label: {
    padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
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
      padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
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
    overflow: 'hidden',
    '& $row:not(:last-child)': {
      borderBottom: `${token.descriptionsBorderBottomSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $label': {
      padding: `${token.descriptionsBorderPaddingLeft} ${token.descriptionsBorderPaddingTop}`,
      backgroundColor: token.descriptionsBackgroundColor,
      borderRight: `${token.descriptionsBorderRightSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $value': {
      padding: `${token.descriptionsBorderPaddingLeft} ${token.descriptionsBorderPaddingTop}`,
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
  },
};

export default descriptionsStyle;
