// import token from '@sheinx/theme';
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
  | 'item'
  | 'labelInline'
  | 'valueInline'
  | 'inlineHorizontal';

const descriptionsStyle: JsStyles<DescriptionsClass> = {
  wrapper: {
    display: 'block',
  },
  header: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '16px',
    color: 'black',
    fontWeight: '500',
    lineHeight: 1.5715,
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
    padding: '0 4px 12px 0',
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: 1.5715,
    color: 'black',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  value: {
    padding: '0 4px 12px 0',
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: 1.5715,
    color: 'gray',
    fontWeight: '400',
  },
  item: {
    padding: '0 4px 12px 0',
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: 1.5715,
  },
  labelInline: {
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: 1.5715,
    color: 'black',
    fontWeight: '500',
    marginBottom: '2px',
  },
  valueInline: {
    textAlign: 'left',
    boxSizing: 'border-box',
    fontSize: '14px',
    lineHeight: 1.5715,
    color: 'gray',
    fontWeight: '400',
  },
  inlineHorizontal: {
    '& $labelInline': {
      display: 'inline-block',
      marginBottom: 0,
      marginRight: '4px',
    },
    '& $valueInline': {
      display: 'inline-block',
      marginBottom: 0,
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
    border: '1px solid rgb(229,230,235)',
    borderRadius: '4px',
    overflow: 'hidden',
    '& $row:not(:last-child)': {
      borderBottom: '1px solid rgb(229,230,235)',
    },
    '& $label': {
      padding: '7px 20px',
      backgroundColor: 'rgb(247,248,250)',
      borderRight: '1px solid rgb(229,230,235)',
    },
    '& $value': {
      padding: '7px 20px',
      borderRight: '1px solid rgb(229,230,235)',
    },
    '& $item': {
      padding: '12px 20px',
      borderRight: '1px solid rgb(229,230,235)',
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
