import { useState, useEffect } from 'react';
import { KeygenResult } from '@sheinx/hooks';
import { BaseTreeNodeProps } from './use-tree-node.type';

const placeInfo: {
  start: KeygenResult;
  target: KeygenResult;
} = {
  start: '',
  target: '',
};

const useTreeNode = <DataItem>(props: BaseTreeNodeProps<DataItem>) => {
  const { id, data, bindNode, childrenKey, onToggle, onDrop } = props;

  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);
  // const dragImage = useRef<HTMLDivElement>(null);

  let dragLock = false;

  const update = (key: 'active' | 'expanded' | 'fetching', value: boolean) => {
    switch (key) {
      case 'active':
        if (active !== value) setActive(value);
        break;
      case 'expanded':
        if (expanded !== value) setExpanded(value);
        break;
      case 'fetching':
        if (fetching !== value) setFetching(value);
        break;
    }
  };

  const handleToggle = () => {
    const newExpand = !expanded;
    setExpanded(newExpand);
    if (onToggle) onToggle(id, newExpand);
  };

  const handleDragStart = (event: React.DragEvent) => {
    if (dragLock) return;
    dragLock = true;

    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setData('text/plain', id as string);
    placeInfo.start = id;
    // const element = document.querySelector(dragImageSelector(data)!);
    // dragImage.current = 1;
  };

  const handleDragEnd = () => {};

  const getRootProps = () => {
    const dropEvents = {};

    if (onDrop) {
      Object.assign(dropEvents, {
        draggable: true,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
      });
    }

    return {
      ...dropEvents,
      active,
      expanded,
      onToggle: handleToggle,
    };
  };

  const isLeaf = () => {
    const children = data[childrenKey] as DataItem[];
    if (children && children.length > 0) return false;
    if (Array.isArray(children) || children === null) return true;

    if (fetching && !children) return false;
    // if (loader && !fetching) return false

    return true;
  };

  useEffect(() => {
    const { active, expanded } = bindNode(id, update);
    setActive(active);
    setExpanded(expanded);
  }, []);

  return {
    update,
    active,
    expanded,
    fetching,
    isLeaf,
    getRootProps,
  };
};
export default useTreeNode;
