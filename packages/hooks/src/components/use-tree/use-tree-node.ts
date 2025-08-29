import { useState, useEffect } from 'react';
import { BaseTreeNodeProps } from './use-tree-node.type';
import usePersistFn from '../../common/use-persist-fn';

const useTreeNode = <DataItem, Value>(props: BaseTreeNodeProps<DataItem, Value>) => {
  const { id, data, bindNode, childrenKey, loader } = props;
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const get = () => {
    return {
      hasTriggered,
      active,
      expanded,
      fetching,
    };
  };

  const update = usePersistFn((key: string, value: boolean) => {
    switch (key) {
      case 'active':
        if (value !== active) {
          setActive(value);
        }
        break;
      case 'expanded':
        setExpanded(value);
        break;
      case 'fetching':
        if (value !== fetching) {
          setFetching(value);
        }
        break;
      case 'get':
        return get();
    }
  });

  const handleToggle = () => {};

  const handleTriggered = () => {
    setHasTriggered(true);
  };

  const isLeaf = () => {
    const children = data[childrenKey] as DataItem[];
    if (children && children.length > 0) return false;
    if (Array.isArray(children) || children === null) return true;

    if (fetching && !children) return false;
    if (loader && !fetching) return false;

    return true;
  };

  useEffect(() => {
    const { active, expanded: nextExpanded } = bindNode(id, update, data);
    setActive(active);
    setExpanded(nextExpanded);
  }, []);

  return {
    update,
    active,
    expanded,
    fetching,
    isLeaf,
    setFetching,
    setExpanded,
    onToggle: handleToggle,
    onTriggered: handleTriggered,
  };
};
export default useTreeNode;
