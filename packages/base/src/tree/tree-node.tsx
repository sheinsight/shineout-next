import { createElement } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeNodeProps } from './tree-node.type';
import TreeContent from './tree-content';
import { useTreeNode } from '@sheinx/hooks';

const Node = <DataItem,>(props: TreeNodeProps<DataItem>) => {
  const {
    jssStyle,
    id,
    data,
    line,
    renderItem,
    parentClickExpand,
    keygen,
    childrenKey,
    childrenClass,
    registerUpdate,
    onChange,
    onNodeClick,
    // className,
    listComponent: List,
  } = props;

  const { active, expanded, getRootProps } = useTreeNode({ id, registerUpdate });
  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;

  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.node, {
    [contentStyle.leaf]: !hasChildren,
  });

  const rootProps = getRootProps();

  const getChildrenListProps = () => {
    return {
      id,
      keygen,
      jssStyle,
      renderItem,
      childrenKey,
      parentClickExpand,
      expanded,
      line,
      data: children,
      onChange,
      onNodeClick,
      registerUpdate,
      childrenClass,
      childrenClassName: childrenClass(data),
    };
  };

  const handleFetch = () => {};

  // const handleToggle = () => {};

  const handleDragOver = () => {};

  return (
    <div className={rootClass}>
      <TreeContent
        jssStyle={jssStyle}
        id={id}
        line={line}
        data={data}
        active={active}
        keygen={keygen}
        registerUpdate={registerUpdate}
        childrenKey={childrenKey}
        renderItem={renderItem}
        parentClickExpand={parentClickExpand}
        onChange={onChange}
        onFetch={handleFetch}
        onNodeClick={onNodeClick}
        onDragOver={handleDragOver}
        {...rootProps}
      ></TreeContent>
      {hasChildren && createElement(List, getChildrenListProps())}
    </div>
  );
};

export default Node;
