import { TabsPanel as UnStyleTabsPanel } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle, useTabsStyle } from '@sheinx/shineout-style';
import { TabsPanelProps } from './tabs-panel.type';

const jssStyle = {
  tabs: useTabsStyle,
  button: useButtonStyle,
  buttonGroup: useButtonGroupStyle,
};
export default (props: TabsPanelProps) => {
  return <UnStyleTabsPanel jssStyle={jssStyle} {...props} />;
};
