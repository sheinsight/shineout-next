import { useRef, createElement } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeSimpleNodeProps } from './tree-node.type';
import TreeContent from './tree-content';
import { useTreeContext } from './tree-context';
import { useTreeNode, ObjectType, util, KeygenResult } from '@sheinx/hooks';
import { useConfig } from '../config';

let placeElement: HTMLDivElement | null = null;
let innerPlaceElement: HTMLDivElement | null = null;
const placeInfo: any = { start: '', target: '' };
let dragLock = false;

const initPlaceElement = () => {
  if (util.isBrowser() && !(placeElement && innerPlaceElement)) {
    placeElement = document.createElement('div');
    innerPlaceElement = document.createElement('div');
    placeElement.appendChild(innerPlaceElement);
  }
};

initPlaceElement();

const Node = <DataItem, Value extends KeygenResult[]>(
  props: TreeSimpleNodeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    id,
    data,
    line,
    isControlled,
    index,
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
    dragSibling,
    dragHoverExpand,
    dragImageSelector,
    dragImageStyle,
    childrenClass,
    bindNode,
    loader,
    onChange,
    onNodeClick,
    onToggle,
    onDrop,
    onDragOver,
    onDragLeave,
    onDragStart,
    onDragEnd,
    listComponent: List,
    actionOnClick,
  } = props;

  initPlaceElement();
  const config = useConfig();

  const element = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const dragImage = useRef<null | HTMLElement>(null);

  const { getPath } = useTreeContext();
  const { active, isLeaf, fetching, setFetching, expanded, setExpanded, onTriggered } = useTreeNode(
    {
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
    },
  );

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

  const handleDragOver = (e: React.DragEvent) => {
    if (!dragLock) return;

    const current = getPath(placeInfo.start);
    const target = getPath(id);

    if (!current || !target) return;

    const currentPathStr = current.path.join('/');
    const targetPathStr = target.path.join('/');

    if (dragSibling && targetPathStr !== currentPathStr) return;

    if (dragHoverExpand && !expanded) {
      onToggle?.(id);
    }
    const hover = element.current as HTMLDivElement;
    const rect = hover.getBoundingClientRect();
    const clientHeight = (e.target as HTMLDivElement).getBoundingClientRect().height || 20;
    const hoverMiddleY = (rect.bottom - rect.top) / 2;
    const hoverClientY = e.clientY - rect.top;

    let position = index;

    if (innerPlaceElement) {
      innerPlaceElement.style.height = '0px';
    }

    if (placeElement && innerPlaceElement) {
      if (hoverClientY < hoverMiddleY + clientHeight * 0.2) {
        hover.parentNode!.insertBefore(placeElement, hover);
        if (hoverClientY > clientHeight * 0.3) {
          if (!dragSibling) {
            position = -1;
            innerPlaceElement.style.height = `${rect.height}px`;
          } else {
            position += 1;
            hover.parentNode!.insertBefore(placeElement, hover.nextElementSibling);
          }
        }
      } else {
        position += 1;
        hover.parentNode!.insertBefore(placeElement, hover.nextElementSibling);
      }
      placeInfo.target = id;
      // @ts-ignore
      placeElement.setAttribute('data-position', position);
    }

    if (onDragOver) onDragOver(e, data);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (dragLock) return;
    dragLock = true;

    e.dataTransfer.effectAllowed = 'copyMove';
    e.dataTransfer.setData('text/plain', id as string);
    placeInfo.start = id;

    const el = document.querySelector(dragImageSelector(data)!) as HTMLDivElement;
    const dragEl = (el || content.current) as HTMLDivElement;
    const rect = dragEl.getBoundingClientRect();
    dragImage.current = dragEl.cloneNode(true) as HTMLDivElement;

    document.body.appendChild(dragImage.current);

    dragImage.current.style.position = 'absolute';
    dragImage.current.style.zIndex = '99999';
    dragImage.current.style.top = '-1000px';
    dragImage.current.style.left = '-1000px';
    dragImage.current.style.width = `${rect.width}px`;
    dragImage.current.style.background = '#fff';
    dragImage.current.style.boxShadow = '0 0 5px 0 rgba(0, 0, 0, 0.1)';

    if (dragImageStyle) {
      Object.keys(dragImageStyle).forEach((k) => {
        const styleKey = k as keyof typeof dragImageStyle;
        (dragImage.current?.style as ObjectType)[styleKey] = dragImageStyle[styleKey];
      });
    }

    e.dataTransfer.setDragImage(dragImage.current, e.clientX - rect.left, e.clientY - rect.top);

    if (onDragStart) onDragStart(e, data);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!dragLock) return;

    dragLock = false;

    if (!placeElement || !placeElement.parentNode) return;
    if (dragImage.current && dragImage.current.parentNode)
      dragImage.current.parentNode.removeChild(dragImage.current);
    const position = parseInt(placeElement.getAttribute('data-position') || '', 10);
    const { target } = placeInfo;

    placeElement.parentNode.removeChild(placeElement);
    if (onDrop && (target !== id || index !== position)) {
      onDrop(id, target, position);
    }

    if (onDragEnd) onDragEnd(e, data);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (onDragLeave) onDragLeave(e, data);
  };

  const getChildrenListProps = () => {
    return {
      id,
      keygen,
      jssStyle,
      renderItem,
      expandIcons,

      iconClass,
      leafClass,
      nodeClass,
      isControlled,
      contentClass,
      parentClickExpand,
      doubleClickExpand,
      expanded,
      line,
      data: children,
      mode,
      index,
      loader,
      inlineNode,
      highlight,
      onDrop,
      onChange,
      onToggle,
      onNodeClick,
      onDragOver,
      onDragLeave,
      onDragStart,
      onDragEnd,

      bindNode,
      childrenClassName: util.isFunc(childrenClass) ? childrenClass?.(data) : childrenClass,
      childrenKey,
      childrenClass,
      dragSibling,
      dragHoverExpand,
      dragImageStyle,
      dragImageSelector,

      actionOnClick,
    };
  };

  const getDropProps = () => {
    const dropEvents = {};

    if (onDrop) {
      Object.assign(dropEvents, {
        draggable: true,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        onDragLeave: handleDragLeave,
      });
    }

    return dropEvents;
  };
  return (
    <div {...getDropProps()} ref={element} className={rootClass} dir={config.direction}>
      <TreeContent
        virtual={false}
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
        onTriggered={onTriggered}
        onDragOver={handleDragOver}
        onToggle={handleToggle}
        actionOnClick={actionOnClick}
      ></TreeContent>
      {hasChildren && createElement(List, getChildrenListProps())}
    </div>
  );
};

export default Node;
