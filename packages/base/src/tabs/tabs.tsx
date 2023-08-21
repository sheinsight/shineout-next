import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { useTabs } from '@sheinx/hooks';
import { TabsProps, TabsClasses } from './tabs.type';
import { TabData } from './tab.type';
import { TabsPanelProps } from './tabs-panel.type';
import TabsPanel from './tabs-panel';
import TabsHeader from './tabs-header';

const Tabs = (props: TabsProps) => {
  const { jssStyle, align, children, shape = 'card', position, lazy = true, ...rest } = props;
  const { Provider, active, onChange } = useTabs(rest);

  const isVertical = align === 'vertical-left' || align === 'vertical-right';
  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const rootClass = classNames(tabsStyle.tabs, {
    // [tabsStyle[shape]]: shape,
  });

  const getDataProps = () => {
    const positionProps = [];
    if (position) {
      positionProps.push(position);
    } else {
      if (align === 'vertical-left') positionProps.push('left-top');
      if (align === 'vertical-right') positionProps.push('right-top');
      if (align === 'bottom') positionProps.push('bottom-left');
    }

    return {
      'data-soui-position': positionProps.join(' '),
      'data-soui-shape': shape,
    };
  };

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
    return (
      <TabsHeader tabs={tabs} jssStyle={jssStyle} position={position} align={align}></TabsHeader>
    );
  };

  return (
    <Provider value={{ active, shape, isVertical, onChange, lazy }}>
      <div className={rootClass} {...getDataProps()}>
        {align !== 'vertical-right' && align !== 'bottom' && renderHeader()}
        {renderContent()}
        {(align === 'vertical-right' || align === 'bottom') && renderHeader()}
      </div>
    </Provider>
  );
};

Tabs.Panel = TabsPanel;

export default Tabs;
