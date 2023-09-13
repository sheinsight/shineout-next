import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { KeygenResult, useTree, util } from '@sheinx/hooks';
import RootTree from './tree-root';

const Tree = <DataItem,>(props: TreeProps<DataItem>) => {
  const {
    jssStyle,
    line = true,
    childrenKey = 'children',
    data,
    keygen,
    renderItem,
    dataUpdate = true,
    childrenClass,
    defaultExpandAll,
    defaultExpanded,
    parentClickExpand,
    onChange,
  } = props;

  const { registerUpdate } = useTree({
    data,
    dataUpdate,
    defaultExpandAll,
    defaultExpanded,
    childrenKey: childrenKey as keyof DataItem,
    keygen,
  });

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree, {
    [treeStyle.line]: line,
    [treeStyle.noline]: !line,
  });

  const handleNodeClick = (node: DataItem, id: KeygenResult) => {
    console.log(node, id);
  };

  return (
    <div className={rootClass}>
      <RootTree
        jssStyle={jssStyle}
        data={data}
        line={line}
        keygen={keygen}
        onChange={onChange}
        childrenClass={util.isFunc(childrenClass) ? childrenClass : () => childrenClass}
        registerUpdate={registerUpdate}
        childrenKey={childrenKey as keyof DataItem}
        onNodeClick={handleNodeClick}
        renderItem={renderItem}
        parentClickExpand={parentClickExpand}
      ></RootTree>
    </div>
  );
};

export default Tree;
