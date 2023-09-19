import classNames from 'classnames';
import { TreeProps, TreeClasses } from './tree.type';
import { KeygenResult, useTree, util } from '@sheinx/hooks';
import RootTree from './tree-root';
import { Provider } from './tree-context';

const Tree = <DataItem,>(props: TreeProps<DataItem>) => {
  const {
    jssStyle,
    line = true,
    childrenKey = 'children',
    data,
    mode,
    keygen,
    expanded,
    expandIcons,
    iconClass,
    leafClass,
    renderItem,
    defaultValue,
    dataUpdate = true,
    childrenClass,
    defaultExpandAll,
    defaultExpanded,
    parentClickExpand,
    doubleClickExpand,
    dragImageSelector,
    // onClick,
    onExpand,
    onChange,
  } = props;

  const { func } = useTree({
    mode,
    data,
    dataUpdate,
    expanded,
    defaultValue,
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

  const getDragImageSelector = (data?: DataItem) => {
    if (util.isFunc(dragImageSelector)) return dragImageSelector(data);
    return dragImageSelector;
  };

  const handleNodeClick = () => {};
  // const handleNodeClick = (node: DataItem, id: KeygenResult) => {};

  const handleToggle = (id: KeygenResult) => {
    let newExpanded;

    if (!expanded && onExpand) {
      onExpand([id]);
      return;
    }

    const expandedArr = expanded!;

    if (expandedArr.indexOf(id) >= 0) {
      newExpanded = expandedArr.filter((e) => e !== id);
    } else {
      newExpanded = [...expandedArr, id];
    }
    if (onExpand) onExpand(newExpanded);
  };

  const onToggle = onExpand ? handleToggle : undefined;

  return (
    <div className={rootClass}>
      <Provider value={func}>
        <RootTree
          jssStyle={jssStyle}
          data={data}
          mode={mode}
          line={line}
          keygen={keygen}
          onChange={onChange}
          iconClass={iconClass}
          leafClass={leafClass}
          expandIcons={expandIcons}
          childrenClass={util.isFunc(childrenClass) ? childrenClass : () => childrenClass}
          bindNode={func.bindNode}
          childrenKey={childrenKey as keyof DataItem}
          onNodeClick={handleNodeClick}
          renderItem={renderItem}
          onToggle={onToggle}
          parentClickExpand={parentClickExpand}
          doubleClickExpand={doubleClickExpand}
          dragImageSelector={getDragImageSelector}
        ></RootTree>
      </Provider>
    </div>
  );
};

export default Tree;
