import { TabsContext } from './context';

const useTabsHeader = () => {
  return {
    Consumer: TabsContext.Consumer,
  };
};

export default useTabsHeader;
