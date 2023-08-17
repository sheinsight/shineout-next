import { TabsContext } from './context';

const useTabsPanel = () => {
  return {
    Consumer: TabsContext.Consumer,
  };
};

export default useTabsPanel;
