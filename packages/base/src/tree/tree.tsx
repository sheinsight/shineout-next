import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';

const Tree = (props: TreeProps) => {
  const { jssStyle, childrenKey = 'children' } = props;

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);

  const rootClass = classNames(treeStyle.tree);
  console.log(childrenKey);
  return <div className={rootClass}>base</div>;
};

export default Tree;
