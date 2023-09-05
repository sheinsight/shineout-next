import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { useTree } from '@sheinx/hooks';
import RootTree from './tree-root';

const Tree = <DataItem,>(props: TreeProps<DataItem>) => {
  const { jssStyle, childrenKey = 'children', data, keygen, renderItem } = props;

  useTree({ data, childrenKey: childrenKey as keyof DataItem, keygen });

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree);

  return (
    <div className={rootClass}>
      <RootTree jssStyle={jssStyle} data={data} keygen={keygen} renderItem={renderItem}></RootTree>
    </div>
  );
};

export default Tree;
