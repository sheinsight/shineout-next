import { useState, useEffect } from 'react';
import { BaseTreeNodeProps } from './use-tree-node.type';
import usePersistFn from '../../common/use-persist-fn';

const useTreeNode = <DataItem>(props: BaseTreeNodeProps<DataItem>) => {
  const { id, data, bindNode, childrenKey, loader, onToggle } = props;
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);

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
    }
  });

  const handleToggle = () => {
    const newExpand = !expanded;
    setExpanded(newExpand);
    if (onToggle) onToggle(id, newExpand);
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
    setFetching,
    onToggle: handleToggle,
  };
};
export default useTreeNode;
