import { Tabs as UnStyleTabs } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle, useTabsStyle } from '@sheinx/shineout-style';
import { TabsProps } from './tabs.type';

const jssStyle = {
  tabs: useTabsStyle,
  button: useButtonStyle,
  buttonGroup: useButtonGroupStyle,
};
export default (props: TabsProps) => {
  return <UnStyleTabs jssStyle={jssStyle} {...props} />;
};
