import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';
import { DescriptionsClasses } from '@sheinx/base';

export type DescriptionsClassType = keyof DescriptionsClasses;

const descriptionsStyle: JsStyles<DescriptionsClassType> = {
  rootClass: {},
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
    paddingBottom: token.descriptionsTitlePaddingBottom,
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
  row: {
    '$body:not($border) & > td': {
      border: 'none',
    },
  },
  label: {
    paddingRight: token.descriptionsLabelPaddingRight,
    paddingBottom: token.descriptionsLabelPaddingBottom,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsLabelColor,
    whiteSpace: 'nowrap',
    '$wrapper $body:not($border) table &': {
      border: 'none',
    },
  },
  value: {
    paddingRight: token.descriptionsLabelPaddingRight,
    paddingBottom: token.descriptionsLabelPaddingBottom,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsValueColor,
    '$wrapper $body:not($border) table &': {
      border: 'none',
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  cell: {
    textAlign: 'left',
    boxSizing: 'border-box',
    verticalAlign: 'top',
  },
  item: {
    paddingBottom: token.descriptionsLabelPaddingBottom,
  },
  labelInline: {
    paddingRight: token.descriptionsLabelPaddingRight,
    textAlign: 'left',
    boxSizing: 'border-box',
    color: token.descriptionsLabelColor,
    whiteSpace: 'nowrap',
  },
  valueInline: {
    paddingRight: token.descriptionsLabelPaddingRight,
    textAlign: 'left',
    wordBreak: 'break-all',
    boxSizing: 'border-box',
    color: token.descriptionsValueColor,
  },
  horizontal: {
    '& $label': {
      width: '1px',
    },
    '& $value:empty': {
      width: '1px',
    },
  },
  vertical: {
    '& $label': {
      paddingBottom: token.descriptionsVerticalPaddingBottom,
    },
  },
  inlineHorizontal: {
    '& $item': {
      display: 'flex',
    },
    '& $cell': {
      verticalAlign: 'top',
    },
    '& $row': {
      '&>td': {
        '&:not(:last-child)': {
          paddingRight: token.descriptionsCellGap,
        },
      },
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
      borderBottom: `${token.descriptionsBorderDefaultSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $label': {
      padding: `${token.descriptionsBorderPaddingY} ${token.descriptionsBorderPaddingX}`,
      backgroundColor: token.descriptionsBackgroundColor,
      borderRight: `${token.descriptionsBorderDefaultSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $value': {
      padding: `${token.descriptionsBorderPaddingY} ${token.descriptionsBorderPaddingX}`,
      borderRight: `${token.descriptionsBorderDefaultSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $cell': {
      padding: `${token.descriptionsInlineBorderPaddingX} ${token.descriptionsInlineBorderPaddingY}`,
      borderRight: `${token.descriptionsBorderDefaultSize} solid ${token.descriptionsBorderColor}`,
    },
    '& $labelInline': {
      paddingRight: token.descriptionsLabelPaddingRight,
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
    '& $row': {
      '& td:last-child': {
        borderRight: 'none',
      }
    },
  },
};

export default descriptionsStyle;
