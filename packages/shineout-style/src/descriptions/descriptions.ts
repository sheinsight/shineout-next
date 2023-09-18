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
  header: {},
  title: {},
  extra: {},
  body: {},
  table: {},
  row: {},
  label: {},
  value: {},
};

export default descriptionsStyle;
