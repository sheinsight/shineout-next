import { useTabsPanel, TabsContextProps } from '@sheinx/hooks';
import { TabsPanelProps, TabsPanelWidthContextProps } from './tabs-panel.type';

const TabsPanel = (props: TabsPanelWidthContextProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

const TabsPanelWidthContext = (props: TabsPanelProps) => {
  const { Consumer } = useTabsPanel();
  const { active, id } = props;

  return (
    <Consumer>
      {(value: TabsContextProps) => {
        return <TabsPanel {...props} {...value} isActive={active === id}></TabsPanel>;
      }}
    </Consumer>
  );
};

export default TabsPanelWidthContext;
