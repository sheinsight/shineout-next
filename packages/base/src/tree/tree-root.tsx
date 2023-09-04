import classNames from 'classnames';
import { TreeRootProps } from './tree-root.type';
import { TreeClasses } from './tree.type';
import TreeList from './tree-list';

const Root = (props: TreeRootProps) => {
  const { jssStyle } = props;

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.root);

  // return <div className={rootClass}>Root</div>;
  return <TreeList className={rootClass} expanded></TreeList>;
};

export default Root;
