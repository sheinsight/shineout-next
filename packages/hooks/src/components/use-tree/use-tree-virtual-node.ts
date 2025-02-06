import { useEffect, useState } from 'react';
import { BaseTreeVirtualNodeProps } from './use-tree-node.type';
import usePersistFn from '../../common/use-persist-fn';

const useTreeVirtualNode = <DataItem, Value>(props: BaseTreeVirtualNodeProps<DataItem, Value>) => {
  const { id, data, childrenKey, bindNode, loader, datum } = props;
  const [active, setActive] = useState(datum?.dataFlatStatusMap.get(id)?.active || false);
  const [expanded, setExpanded] = useState(datum?.dataFlatStatusMap.get(id)?.expanded || false);
  const [fetching, setFetching] = useState(datum?.dataFlatStatusMap.get(id)?.fetching || false);

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

  const handleToggle = () => {};

  const handleSetFetchind = (v: boolean) => {
    datum?.dataFlatStatusMap.set(id, {
      active,
      expanded,
      fetching: v,
    });
    setFetching(v);
  };

  const handleSetExpanded = (v: boolean) => {
    datum?.dataFlatStatusMap.set(id, {
      active,
      expanded: v,
      fetching,
    });
    setExpanded(v);
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
    bindNode(id, update, data);
  }, []);

  return {
    update,
    active,
    expanded,
    fetching,
    isLeaf,
    setFetching: handleSetFetchind,
    setExpanded: handleSetExpanded,
    onToggle: handleToggle,
  };
};
export default useTreeVirtualNode;
