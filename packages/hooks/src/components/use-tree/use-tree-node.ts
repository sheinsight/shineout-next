import { useState, useEffect } from 'react';
import { BaseTreeNodeProps } from './use-tree-node.type';

const useTreeNode = (props: BaseTreeNodeProps) => {
  const { id, registerUpdate } = props;

  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fetching] = useState(false);

  const update = (key: any, value: boolean) => {
    console.log(key, value);
  };

  const handleToggle = () => {
    setExpanded(!expanded);
    // if (onToggle) onToggle(id, !expanded);
  };

  const getRootProps = () => {
    return {
      expanded,
      onToggle: handleToggle,
    };
  };

  useEffect(() => {
    const { active, expanded } = registerUpdate(id, update);

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
