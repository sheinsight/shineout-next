import { TabsPanel as UnStyleTabsPanel } from '@sheinx/base';
import { useButtonStyle, useTabsStyle } from '@sheinx/shineout-style';
import { TabsPanelProps } from './tabs-panel.type';

const jssStyle = {
  tabs: useTabsStyle,
  button: useButtonStyle,
};
export default (props: TabsPanelProps) => {
  return <UnStyleTabsPanel jssStyle={jssStyle} {...props} />;
};
