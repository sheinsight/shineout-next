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
  | 'item'
  | 'labelInline'
  | 'valueInline'
  | 'inlineHorizontal'
  | 'horizontal';

const descriptionsStyle: JsStyles<DescriptionsClass> = {
  wrapper: {
    display: 'block',
    lineHeight: token.lineHeightDynamic,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0 12px 0',
  },
  title: {
    fontSize: token.descriptionsTitleFontSize,
    color: token.descriptionsTitleColor,
    fontWeight: token.descriptionsTitleFontWeight,
    gap: token.descriptionsTitleGap,
    flex: 1,
  },
  extra: {},
  body: {},
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  row: {},
  label: {
    padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    color: token.descriptionsLabelColor,
    whiteSpace: 'nowrap',
  },
  value: {
    padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    color: token.descriptionsValueColor,
  },
  small: {
    fontSize: token.descriptionSmallFontSize,
  },
  item: {
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  labelInline: {
    padding: `0 ${token.descriptionsLabelPaddingRight} 0 0`,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsLabelColor,
  },
  valueInline: {
    padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
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
    '& $labelInline': {
      display: 'inline-block',
      padding: `0 ${token.descriptionsLabelPaddingRight} ${token.descriptionsLabelPaddingBottom} 0`,
    },
    '& $valueInline': {
      display: 'inline-block',
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
    border: `${token.descriptionsBorderFontSize} solid ${token.descriptionsBorderColor}`,
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
    '& $item': {
      padding: `${token.descriptionsInlineBorderPaddingX} ${token.descriptionsInlineBorderPaddingY}`,
      borderRight: `${token.descriptionsBorderRightSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $labelInline': {
      padding: 0,
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
