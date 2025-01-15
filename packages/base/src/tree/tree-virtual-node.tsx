import { useRef } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeVirtualNodeProps } from './tree-node.type';
import TreeContent from './tree-content';
import { useTreeNode, util, KeygenResult } from '@sheinx/hooks';
import { useConfig } from '../config';

let placeElement: HTMLDivElement | null = null;

const Node = <DataItem, Value extends KeygenResult[]>(
  props: TreeVirtualNodeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    id,
    data,
    line,
    isControlled,
    renderItem,
    parentClickExpand,
    doubleClickExpand,
    iconClass,
    leafClass,
    nodeClass,
    contentClass,
    expandIcons,
    keygen,
    mode,
    childrenKey,
    inlineNode,
    highlight,
    dragImageSelector,
    dragImageStyle,
    bindNode,
    loader,
    onChange,
    onNodeClick,
    onToggle,
  } = props;

  const config = useConfig();

  const element = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const { active, isLeaf, fetching, setFetching, expanded, setExpanded } = useTreeNode({
    id,
    data,
    bindNode,
    loader,
    onToggle,
    childrenKey,
    element,
    content: content.current,
    dragImageSelector,
    dragImageStyle,
  });

  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;

  const contentStyle = jssStyle?.tree() || ({} as TreeClasses);

  const rootClass = classNames(
    contentStyle.node,
    isLeaf() && (util.isString(leafClass) ? leafClass : util.isFunc(leafClass) && leafClass(data)),
    util.isString(nodeClass) && nodeClass,
    util.isFunc(nodeClass) && nodeClass(data),
    {
      [contentStyle.leaf]: !hasChildren,
    },
  );

  if (placeElement) {
    placeElement.className = contentStyle.placement;
  }

  const handleFetch = () => {};

  const handleToggle = () => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);
    if (onToggle) onToggle(id, nextExpanded);
  };

  return (
    <div ref={element} className={rootClass} dir={config.direction}>
      <TreeContent
        jssStyle={jssStyle}
        isControlled={isControlled}
        id={id}
        line={line}
        data={data}
        mode={mode}
        contentClass={contentClass}
        active={active}
        fetching={fetching}
        expanded={expanded}
        keygen={keygen}
        bindNode={bindNode}
        bindContent={content}
        childrenKey={childrenKey}
        renderItem={renderItem}
        iconClass={iconClass}
        leafClass={leafClass}
        expandIcons={expandIcons}
        parentClickExpand={parentClickExpand}
        doubleClickExpand={doubleClickExpand}
        loader={loader}
        inlineNode={inlineNode}
        highlight={highlight}
        setFetching={setFetching}
        onChange={onChange}
        onFetch={handleFetch}
        onNodeClick={onNodeClick}
        onToggle={handleToggle}
      ></TreeContent>
    </div>
  );
};

export default Node;
