import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { TreeRootProps } from './tree-root.type';
import { TreeClasses } from './tree.type';
import TreeList from './tree-list';

const Root = <DataItem, Value extends KeygenResult[]>(props: TreeRootProps<DataItem, Value>) => {
  const { jssStyle, rootStyle = {}, ...rest } = props;
  const treeStyle = jssStyle?.tree() || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.root);
  return (
    <TreeList
      {...rest}
      expanded
      className={rootClass}
      jssStyle={jssStyle}
      style={rootStyle}
    ></TreeList>
  );
};

export default Root;
