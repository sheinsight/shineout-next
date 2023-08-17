import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { useTabs } from '@sheinx/hooks';
import { TabsProps, TabsClasses } from './tabs.type';
import { TabData } from './tab.type';
import { TabsPanelProps } from './tabs-panel.type';
import TabsPanel from './tabs-panel';
import TabsHeader from './tabs-header';

const Tabs = (props: TabsProps) => {
  const { jssStyle, align, children, shape, ...rest } = props;
  const { Provider, active } = useTabs(rest);

  const isVertical = align === 'vertical-left' || align === 'vertical-right';
  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const rootClass = classNames(tabsStyle.tabs, {
    [tabsStyle.vertical]: isVertical,
    [tabsStyle.verticalLeft]: align === 'vertical-left',
    [tabsStyle.verticalRight]: align === 'vertical-right',
  });

  const renderContent = () => {
    return Children.toArray(children).map((child, index) => {
      const Chlid = child as React.ReactElement<TabsPanelProps>;
      return cloneElement<TabsPanelProps>(Chlid, {
        id: Chlid.props.id !== undefined ? Chlid.props.id : index,
        active,
      });
    });
  };

  const renderHeader = () => {
    const tabs: TabData[] = [];

    Children.toArray(children).forEach((child, index) => {
      const Chlid = child as React.ReactElement<TabsPanelProps>;

      tabs.push({
        id: Chlid.props.id !== undefined ? Chlid.props.id : index,
        tab: Chlid.props.tab,
        disabled: Chlid.props.disabled,
        jssStyle,
      });
    });
    return <TabsHeader tabs={tabs} jssStyle={jssStyle}></TabsHeader>;
  };

  return (
    <Provider value={{ active, shape, isVertical }}>
      <div className={rootClass}>
        {align !== 'vertical-right' && align !== 'bottom' && renderHeader()}
        {renderContent()}
        {align === 'vertical-right' && renderHeader()}
      </div>
    </Provider>
  );
};

Tabs.Panel = TabsPanel;

export default Tabs;
