import Tabs from './tabs';

type RefTabs = typeof Tabs;

export interface TabsComponent extends RefTabs {
  displayName: string;
}

const TabsComp: TabsComponent = Tabs as TabsComponent;

TabsComp.displayName = 'ShineoutTabs';

export default TabsComp;
