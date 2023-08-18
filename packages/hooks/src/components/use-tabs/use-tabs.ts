import { useEffect, useState } from 'react';
import { Provider } from './context';
import { BaseTabsProps } from './use-tabs.type';

const useTabs = (props: BaseTabsProps) => {
  const { active, onChange } = props;
  const [activeTabs, setActiveTabs] = useState(active);

  const getActive = () => {
    if (active === undefined) {
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
