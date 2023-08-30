import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { useTree } from '@sheinx/hooks';

const Tree = (props: TreeProps) => {
  const { jssStyle, childrenKey = 'children' } = props;
  useTree({ data: [] });
  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  console.log(childrenKey);
  const rootClass = classNames(treeStyle.tree);
  return <div className={rootClass}>base</div>;
};

export default Tree;
