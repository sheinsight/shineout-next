import { useEffect, useState } from 'react';
import { Provider } from './context';
import { BaseTabsProps } from './use-tabs.type';

const useTabs = (props: BaseTabsProps) => {
  const { defaultActive, active = defaultActive, onChange } = props;
  const [activeTabs, setActiveTabs] = useState(active);

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

  useEffect(() => {
    if (active !== undefined) {
      setActiveTabs(active);
    }
  }, [active]);

  return {
    active: getActive(),
    onChange: handleChange,
    Provider,
  };
};

export default useTabs;
