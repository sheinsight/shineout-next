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
  | 'value';

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
  },
  extra: {},
  body: {},
  table: {
    width: '100%',
    borderCollapse: 'fixed',
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
};

export default descriptionsStyle;
