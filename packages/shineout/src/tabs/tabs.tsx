import { useMemo } from 'react';
import { Tabs as UnStyleTabs } from '@sheinx/base';
import { useTabsStyle, useButtonStyle } from '@sheinx/shineout-style';
import { TabsProps } from './tabs.type';

export default (props: TabsProps) => {
  const tabsStyle = useTabsStyle();
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(
    () => ({ tabs: tabsStyle, button: buttonStyle }),
    [tabsStyle, buttonStyle],
  );

  return <UnStyleTabs jssStyle={jssStyle} {...props} />;
};
