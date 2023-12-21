import { useRef, createElement } from 'react';
import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeNodeProps } from './tree-node.type';
import TreeContent from './tree-content';
import { useTreeContext } from './tree-context';
import { useTreeNode, ObjectType, util } from '@sheinx/hooks';

const placeElement = document.createElement('div');
const innerPlaceElement = document.createElement('div');
placeElement.appendChild(innerPlaceElement);
const placeInfo = { start: '', target: '' };
let dragLock = false;

const Node = <DataItem,>(props: TreeNodeProps<DataItem>) => {
  const {
    jssStyle,
    id,
    data,
    line,
    index,
    renderItem,
    parentClickExpand,
    doubleClickExpand,
    iconClass,
    leafClass,
    nodeClass,
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
  } = props;

  const element = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  // const dragLock = useRef(false);
  const dragImage = useRef<null | HTMLElement>(null);

  const { getPath } = useTreeContext();
  const {
    active,
    expanded,
    isLeaf,
    fetching,
    setFetching,
    onToggle: handleToggle,
  } = useTreeNode({
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
    isLeaf() && leafClass,
    util.isString(nodeClass) && nodeClass,
    util.isFunc(nodeClass) && nodeClass(data),
    {
      [contentStyle.leaf]: !hasChildren,
    },
  );

  placeElement.className = contentStyle.placement;

  const handleFetch = () => {};

  const handleDragOver = (e: React.DragEvent) => {
    if (!dragLock) return;

    const current = getPath(placeInfo.start);
    const target = getPath(id);

    if (!current || !target) return;

    const currentPathStr = current.path.join('/');
    const targetPathStr = target.path.join('/');

    if (dragSibling && targetPathStr !== currentPathStr) return;

    if (dragHoverExpand && !expanded) {
      handleToggle();
    }
    const hover = element.current as HTMLDivElement;
    const rect = hover.getBoundingClientRect();
    const clientHeight = (e.target as HTMLDivElement).getBoundingClientRect().height || 20;
    const hoverMiddleY = (rect.bottom - rect.top) / 2;
    const hoverClientY = e.clientY - rect.top;

    let position = index;

    innerPlaceElement.style.height = '0px';

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

    setTimeout(() => {
      (element.current as HTMLElement).style.display = 'none';
    }, 0);

    if (onDragStart) onDragStart(e, data);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (element.current as HTMLDivElement).style.display = '';
    if (!dragLock) return;

    dragLock = false;

    if (!placeElement.parentNode) return;
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
      childrenKey,
      iconClass,
      leafClass,
      nodeClass,
      parentClickExpand,
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
      bindNode,
      childrenClass,
      dragSibling,
      dragHoverExpand,
      dragImageStyle,
      dragImageSelector,
      childrenClassName: childrenClass(data),
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
    <div {...getDropProps()} ref={element} className={rootClass}>
      <TreeContent
        jssStyle={jssStyle}
        id={id}
        line={line}
        data={data}
        mode={mode}
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
        onDragOver={handleDragOver}
        onToggle={handleToggle}
      ></TreeContent>
      {hasChildren && createElement(List, getChildrenListProps())}
    </div>
  );
};

export default Node;
