import classNames from 'classnames';
import { TreeRootProps } from './tree-root.type';
import { TreeClasses } from './tree.type';
import TreeList from './tree-list';

const Root = <DataItem,>(props: TreeRootProps<DataItem>) => {
  const { jssStyle, expanded, ...rest } = props;

  const treeStyle = jssStyle?.tree() || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.root);
  return (
    <TreeList
      {...rest}
      expanded
      expandedProp={expanded}
      className={rootClass}
      jssStyle={jssStyle}
    ></TreeList>
  );
};

export default Root;
