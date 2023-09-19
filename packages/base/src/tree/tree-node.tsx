import { useMemo, createElement } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeNodeProps } from './tree-node.type';
import TreeContent from './tree-content';
import { useTreeContext } from './tree-context';
import { useTreeNode } from '@sheinx/hooks';

const Node = <DataItem,>(props: TreeNodeProps<DataItem>) => {
  const {
    jssStyle,
    id,
    data,
    line,
    renderItem,
    parentClickExpand,
    doubleClickExpand,
    iconClass,
    leafClass,
    expandIcons,
    keygen,
    mode,
    childrenKey,
    dragImageSelector,
    childrenClass,
    bindNode,
    onChange,
    onNodeClick,
    onToggle,
    listComponent: List,
  } = props;
  const { getChecked } = useTreeContext();
  const { expanded, getRootProps, isLeaf } = useTreeNode({
    id,
    data,
    bindNode,
    onToggle,
    childrenKey,
    dragImageSelector,
  });

  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;

  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.node, isLeaf() && leafClass, {
    [contentStyle.leaf]: !hasChildren,
  });

  const rootProps = getRootProps();

  const getChildrenListProps = () => {
    return {
      id,
      keygen,
      jssStyle,
      renderItem,
      expandIcons,
      childrenKey,
      iconClass,
      leafClass,
      parentClickExpand,
      expanded,
      line,
      data: children,
      mode,
      onChange,
      onToggle,
      onNodeClick,
      bindNode,
      childrenClass,
      childrenClassName: childrenClass(data),
    };
  };

  const handleFetch = () => {};

  const handleDragOver = () => {};

  const checked = getChecked(id);

  const renderContent = useMemo(() => {
    return (
      <TreeContent
        jssStyle={jssStyle}
        id={id}
        line={line}
        data={data}
        mode={mode}
        keygen={keygen}
        bindNode={bindNode}
        childrenKey={childrenKey}
        renderItem={renderItem}
        iconClass={iconClass}
        leafClass={leafClass}
        expandIcons={expandIcons}
        parentClickExpand={parentClickExpand}
        doubleClickExpand={doubleClickExpand}
        onChange={onChange}
        onFetch={handleFetch}
        onNodeClick={onNodeClick}
        onDragOver={handleDragOver}
        {...rootProps}
      ></TreeContent>
    );
  }, [checked, expanded]);

  return (
    <div className={rootClass}>
      {renderContent}
      {hasChildren && createElement(List, getChildrenListProps())}
    </div>
  );
};

export default Node;
