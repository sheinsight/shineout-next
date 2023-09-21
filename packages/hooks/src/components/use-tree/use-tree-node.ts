import { useState, useEffect } from 'react';
import { BaseTreeNodeProps } from './use-tree-node.type';

const useTreeNode = <DataItem>(props: BaseTreeNodeProps<DataItem>) => {
  const { id, data, bindNode, childrenKey, onToggle } = props;
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);

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
    onToggle: handleToggle,
  };
};
export default useTreeNode;
