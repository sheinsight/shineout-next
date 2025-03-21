import { useRef } from 'react';
import classNames from 'classnames';
// import { util } from '@sheinx/hooks';
import { KeygenResult } from '@sheinx/hooks';
import TreeNode from './tree-node';
import { TreeClasses } from './tree.type';
import { TreeListProps } from './tree-list.type';

const List = <DataItem, Value extends KeygenResult[]>(props: TreeListProps<DataItem, Value>) => {
  const hasExpanded = useRef(false);

  const {
    jssStyle,
    className,
    data,
    mode,
    id = '',
    keygen,
    expanded,
    active,
    line,
    isControlled,
    style,
    onChange,
    renderItem,
    iconClass,
    leafClass,
    nodeClass,
    rootStyle = {},
    contentClass,
    expandIcons,
    childrenKey,
    inlineNode,
    highlight,
    defaultExpandAll,
    loader,
    onNodeClick,
    onToggle,
    onDrop,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDragStart,
    bindNode,
    dragImageSelector,
    dragSibling,
    dragHoverExpand,
    dragImageStyle,
    childrenClass,
    childrenClassName,
    parentClickExpand,
    doubleClickExpand,
    actionOnClick,
  } = props;

  const listClass = jssStyle?.tree() || ({} as TreeClasses);
  const rootClass = classNames(className || listClass.children, childrenClassName);

  const getKey = (data: DataItem, index: number) => {
    if (typeof keygen === 'function') return keygen(data, id as string);
    if (keygen) return data[keygen];
    return id + (id ? ',' : '') + index;
  };

  const empty = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderNode = (node: DataItem, index: number) => {
    const id = getKey(node, index) as KeygenResult;

    return (
      <TreeNode
        jssStyle={jssStyle}
        id={id}
        data={node}
        index={index}
        key={id}
        line={line}
        keygen={keygen}
        listComponent={List}
        defaultExpandAll={defaultExpandAll}
        isControlled={isControlled}
        mode={mode}
        active={active}
        childrenClass={childrenClass}
        childrenKey={childrenKey}
        renderItem={renderItem}
        iconClass={iconClass}
        leafClass={leafClass}
        nodeClass={nodeClass}
        contentClass={contentClass}
        expandIcons={expandIcons}
        bindNode={bindNode}
        loader={loader}
        inlineNode={inlineNode}
        highlight={highlight}
        dragImageSelector={dragImageSelector}
        dragImageStyle={dragImageStyle}
        dragSibling={dragSibling}
        dragHoverExpand={dragHoverExpand}
        parentClickExpand={parentClickExpand}
        doubleClickExpand={doubleClickExpand}
        expanded={expanded}
        onNodeClick={onNodeClick}
        onToggle={onToggle}
        onChange={onChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragLeave={onDragLeave}
        actionOnClick={actionOnClick}
      ></TreeNode>
    );
  };

  if (!expanded && !hasExpanded.current) return null;
  hasExpanded.current = true;
  const newStyle = Object.assign(rootStyle, style, { display: expanded ? 'block' : 'none' });
  return (
    <div onDrop={empty} onDragOver={empty} style={newStyle} className={rootClass}>
      {data.map(renderNode)}
    </div>
  );
};

export default List;
