import { useMemo } from 'react';
import { TabsPanel as UnStyleTabsPanel } from '@sheinx/base';
import { useTabsStyle, useButtonStyle } from '@sheinx/shineout-style';
import { TabsPanelProps } from '@sheinx/base';

export default (props: TabsPanelProps) => {
  const tabsStyle = useTabsStyle();
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(
    () => ({ tabs: tabsStyle, button: buttonStyle }),
    [tabsStyle, buttonStyle],
  );

  return <UnStyleTabsPanel jssStyle={jssStyle} {...props} />;
};
