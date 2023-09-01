import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { useTree } from '@sheinx/hooks';

const Tree = (props: TreeProps) => {
  const { jssStyle, childrenKey = 'children', data, keygen } = props;

  useTree({ data, childrenKey, keygen });

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree);
  return <div className={rootClass}>base</div>;
};

export default Tree;
