import { TabsPanel as UnStyleTabsPanel, TabsPanelProps } from '@sheinx/base';
import { useButtonStyle, useTabsStyle } from '@sheinx/shineout-style';

const jssStyle = {
  tabs: useTabsStyle,
  button: useButtonStyle,
};
export default (props: TabsPanelProps) => {
  return <UnStyleTabsPanel jssStyle={jssStyle} {...props} />;
};
