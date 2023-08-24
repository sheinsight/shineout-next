import Tabs from './tabs';
import Panel from './tabs-panel';

type RefTabs = typeof Tabs;
type RefTabsPabel = typeof Panel;

export interface TabsComponent extends RefTabs {
  displayName: string;
  Panel: RefTabsPabel;
}

export interface TabsPanelComponent extends RefTabsPabel {
  displayName: string;
}

const TabsComp: TabsComponent = Tabs as TabsComponent;
const TabsPanelComp: TabsPanelComponent = Panel as TabsPanelComponent;

TabsComp.displayName = 'ShineoutTabs';
TabsComp.Panel = TabsPanelComp;
TabsPanelComp.displayName = 'ShineoutTabsPanel';

export default TabsComp;
