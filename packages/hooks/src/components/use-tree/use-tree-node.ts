import { useState, useEffect } from 'react';
import { BaseTreeNodeProps } from './use-tree-node.type';

const useTreeNode = <DataItem>(props: BaseTreeNodeProps<DataItem>) => {
  const { id, bindNode, onToggle } = props;

  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching] = useState(false);

  const update = (key: 'active' | 'expanded' | 'fetching', value: boolean) => {
    switch (key) {
      case 'active':
        if (active !== value) setActive(value);
        break;
      case 'expanded':
        if (expanded !== value) setExpanded(value);
        break;
      case 'fetching':
        // if (fetching !== value) setFetching(value);
        break;
    }
  };

  const handleToggle = () => {
    const newExpand = !expanded;
    setExpanded(newExpand);
    if (onToggle) onToggle(id, newExpand);
  };

  const getRootProps = () => {
    return {
      active,
      expanded,
      onToggle: handleToggle,
    };
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
    getRootProps,
  };
};
export default useTreeNode;
