import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { useTree } from '@sheinx/hooks';
import RootTree from './tree-root';

const Tree = (props: TreeProps) => {
  const { jssStyle, childrenKey = 'children', data, keygen } = props;

  useTree({ data, childrenKey, keygen });

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree);
  return (
    <div className={rootClass}>
      <RootTree jssStyle={jssStyle}></RootTree>
    </div>
  );
};

export default Tree;
