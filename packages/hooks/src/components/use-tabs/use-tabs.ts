import { useState } from 'react';
import { Provider } from './context';
import { BaseTabsProps } from './use-tabs.type';

const useTabs = <TabData = any>(props: BaseTabsProps) => {
  const { defaultActive, active = defaultActive, onChange } = props;
  const [activeTabs, setActiveTabs] = useState(active);
  const [tabs, setTabs] = useState<TabData[]>([]);

  const getActive = () => {
    if (props.active === undefined) {
      return activeTabs;
    }
    return active;
  };

  const handleChange = (key: string | number) => {
    setActiveTabs(key);
    onChange?.(key);
  };

  return {
    active: getActive(),
    onChange: handleChange,
    tabs,
    setTabs,
    Provider,
  };
};

export default useTabs;
