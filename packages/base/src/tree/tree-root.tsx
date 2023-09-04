import classNames from 'classnames';
import { TreeRootProps } from './tree-root.type';
import { TreeClasses } from './tree.type';

const Root = (props: TreeRootProps) => {
  const { jssStyle } = props;

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.root);

  return <div className={rootClass}>Root</div>;
};

export default Root;
