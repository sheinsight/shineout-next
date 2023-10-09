import React, { Children, cloneElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTabs } from '@sheinx/hooks';
import { TabsClasses, TabsProps } from './tabs.type';
import { TabData } from './tab.type';
import { TabsPanelProps } from './tabs-panel.type';
import TabsPanel from './tabs-panel';
import TabsHeader from './tabs-header';

const Tabs = (props: TabsProps) => {
  const {
    jssStyle,
    align,
    children,
    shape = 'card',
    position,
    lazy = true,
    autoFill,
    hideSplit,
    collapsible,
    defaultCollapsed = false,
    onChange: onChangeProps,
    extra,
    border,
    splitColor,
    tabBarExtraContent,
    background,
    activeBackground,
    inactiveBackground,
    defaultActive,
    tabBarStyle,
    ...rest
  } = props;
  const { Provider, active, onChange } = useTabs({
    ...rest,
    defaultActive,
    onChange: onChangeProps,
  });

  const [panelStyle, setPanelStyle] = useState<React.CSSProperties | undefined>();
  const [collapse, setCollapse] = useState(defaultCollapsed);

  const isVertical =
    (align === 'vertical-left' ||
      align === 'vertical-right' ||
      position === 'left-top' ||
      position === 'left-bottom' ||
      position === 'right-top' ||
      position === 'right-bottom') &&
    shape !== 'button' &&
    shape !== 'fill';

  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeight = useRef<number>(0);
  const tabsStyle = jssStyle?.tabs?.() || ({} as TabsClasses);
  const rootClass = classNames(tabsStyle.tabs, {
    [tabsStyle.autoFill]: autoFill,
    [tabsStyle.collapsed]: collapse,
  });

  const getRootProps = () => {
    return rest;
  };

  const getExtra = () => {
    return tabBarExtraContent || extra;
  };

  const getSplitColor = () => {
    return splitColor || border;
  };

  const getActiveBackground = () => {
    return activeBackground || background;
  };

  const getPosition = () => {
    let realPosition = 'top-left';
    if (collapsible) {
      return realPosition;
    }
    if (align) {
      if (align === 'vertical-left') realPosition = 'left-top';
      if (align === 'vertical-right') realPosition = 'right-top';
      if (align === 'bottom') realPosition = 'bottom-left';
      if (align === 'left') realPosition = 'left-top';
      if (align === 'right') realPosition = 'right-top';
    } else {
      realPosition = position || 'top-left';
    }

    if (shape === 'button' || shape === 'fill') {
      if (['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(realPosition)) {
        return realPosition;
      } else {
        return 'top-left';
      }
    } else {
      return realPosition;
    }
  };

  const getDataProps = () => {
    return {
      'data-soui-position': getPosition(),
      'data-soui-shape': shape,
    };
  };

  const handleCollapsible = () => {
    const nextCollapse = !collapse;
    setCollapse(nextCollapse);
  };

  useEffect(() => {
    if (!panelRef.current) return;
    if (collapsible) {
      if (collapse) {
        panelHeight.current = panelRef.current.clientHeight;
        setPanelStyle({ height: panelRef.current.clientHeight });
        setTimeout(() => {
          setPanelStyle({ height: 0, flex: autoFill ? 0 : 'none' });
        }, 10);
      } else {
        if (panelHeight.current === 0) return;
        setPanelStyle({ height: panelHeight.current });
        setTimeout(() => {
          setPanelStyle({ height: 'auto' });
        }, 200);
      }
    }
  }, [collapse]);

  const renderContent = () => {
    return (
      <div ref={panelRef} className={tabsStyle.panelWrapper} style={panelStyle}>
        {Children.toArray(children).map((child, index) => {
          const Chlid = child as React.ReactElement<TabsPanelProps>;

          return cloneElement<TabsPanelProps>(Chlid, {
            id: Chlid.props.id !== undefined ? Chlid.props.id : index,
            active,
          });
        })}
      </div>
    );
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
      <TabsHeader
        tabs={tabs}
        align={align}
        jssStyle={jssStyle}
        position={position}
        hideSplit={hideSplit}
        extra={getExtra()}
        splitColor={getSplitColor()}
        collapsible={collapsible}
        tabBarStyle={tabBarStyle}
        getPosition={getPosition()}
      ></TabsHeader>
    );
  };

  const renderTabs = () => {
    const realPosition = getPosition();

    if (['top-left', 'top-right', 'left-top', 'left-bottom'].includes(realPosition)) {
      return (
        <>
          {renderHeader()}
          {renderContent()}
        </>
      );
    }

    if (['bottom-left', 'bottom-right', 'right-top', 'right-bottom'].includes(realPosition)) {
      return (
        <>
          {renderContent()}
          {renderHeader()}
        </>
      );
    }

    console.warn('Tabs position is invalid, please check it.');

    return (
      <>
        {renderHeader()}
        {renderContent()}
      </>
    );
  };

  return (
    <Provider
      value={{
        lazy,
        active,
        shape,
        onChange,
        isVertical,
        inactiveBackground,
        onCollapsible: handleCollapsible,
        activeBackground: getActiveBackground(),
      }}
    >
      <div {...getRootProps()} className={rootClass} {...getDataProps()}>
        {renderTabs()}
      </div>
    </Provider>
  );
};

Tabs.Panel = TabsPanel;

export default Tabs;
