import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { useTree } from '@sheinx/hooks';
import RootTree from './tree-root';

const Tree = <DataItem,>(props: TreeProps<DataItem>) => {
  const {
    jssStyle,
    line = true,
    childrenKey = 'children',
    data,
    keygen,
    renderItem,
    parentClickExpand,
    onChange,
  } = props;

  const { registerUpdate } = useTree({
    data,
    childrenKey: childrenKey as keyof DataItem,
    keygen,
  });

  const treeStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree, {
    [treeStyle.line]: line,
    [treeStyle.noline]: !line,
  });

  const handleNodeClick = (node, id) => {
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
