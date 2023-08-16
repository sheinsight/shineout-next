import { useMemo } from 'react';
import { Tabs } from '@sheinx/base';
import { useTabsStyle } from '@sheinx/shineout-style';
import { TabsProps } from './tabs.type';

export default (props: TabsProps) => {
  const {} = props;
  const tabsStyle = useTabsStyle();
  const jssStyle = useMemo(() => ({ tabs: tabsStyle }), [tabsStyle]);

  return (
    <Tabs
      jssStyle={jssStyle}
      // ...
    />
  );
};
