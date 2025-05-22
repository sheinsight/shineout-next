import { useTreeContext } from './tree-context';
import { useRef } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeVirtualNodeProps } from './tree-node.type';
import TreeVirtualContent from './tree-content';
import { useTreeVirtualNode, util, KeygenResult } from '@sheinx/hooks';
import { useConfig } from '../config';

let placeElement: HTMLDivElement | null = null;

const VirtualNode = <DataItem, Value extends KeygenResult[]>(
  props: TreeVirtualNodeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    id,
    data,
    level,
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
    loader,
    onChange,
    onNodeClick,
    onToggle,
    actionOnClick,
    size,
  } = props;

  const config = useConfig();
  const datum = useTreeContext();

  const element = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const { active, isLeaf, fetching, setFetching, expanded, setExpanded } = useTreeVirtualNode({
    id,
    data,
    datum,
    bindNode: datum.bindVirtualNode,
    loader,
    onToggle,
    childrenKey,
    element,
    content: content.current,
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
    (placeElement as HTMLElement).className = contentStyle.placement;
  }

  const handleFetch = () => {};

  const handleToggle = () => {
    const nextExpanded = !expanded;
    setExpanded(nextExpanded);

    const status = datum.dataFlatStatusMap.get(id);

    datum.dataFlatStatusMap.set(id, {
      active: status?.active || false,
      fetching: status?.fetching || false,
      expanded: nextExpanded,
    });
    if (onToggle) onToggle(id, nextExpanded);
  };

  const indent = size === "large" ? 32 : 24;

  return (
    <div
      ref={element}
      className={rootClass}
      dir={config.direction}
      style={{ paddingLeft: level * indent }}
    >
      <TreeVirtualContent
        virtual
        jssStyle={jssStyle}
        isControlled={isControlled}
        id={id}
        level={level}
        line={line}
        data={data}
        mode={mode}
        contentClass={contentClass}
        active={active}
        fetching={fetching}
        expanded={expanded}
        keygen={keygen}
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
        actionOnClick={actionOnClick}
      ></TreeVirtualContent>
    </div>
  );
};

export default VirtualNode;
