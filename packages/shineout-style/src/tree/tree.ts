// import Token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type TreeClass =
  | 'tree'
  | 'root'
  | 'contentWrapper'
  | 'content'
  | 'text'
  | 'list'
  | 'node'
  | 'children';

const treeStyle: JsStyles<TreeClass> = {
  tree: {},
  root: {},
  contentWrapper: {},
  content: {},
  text: {},
  list: {},
  node: {},
  children: {},
};

export default treeStyle;
