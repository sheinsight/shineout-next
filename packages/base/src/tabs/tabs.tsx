import React, { Children, cloneElement, useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTabs } from '@sheinx/hooks';
import { TabsProps, TabsClasses } from './tabs.type';
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
    onChange: onChangeProps,
    ...rest
  } = props;
  const { Provider, active, onChange } = useTabs({ ...rest, onChange: onChangeProps });

  const [panelStyle, setPanelStyle] = useState<React.CSSProperties | undefined>();
  const [collapse, setCollapse] = useState(false);

  const isVertical =
    align === 'vertical-left' ||
    align === 'vertical-right' ||
    position === 'left-top' ||
    position === 'left-bottom' ||
    position === 'right-top' ||
    position === 'right-bottom';

  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeight = useRef<number>(0);
  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const rootClass = classNames(tabsStyle.tabs, {
    [tabsStyle.autoFill]: autoFill,
  });

  const getRootProps = () => {
    return rest;
  };

  const getPosition = () => {
    let realPosition = 'left-top';
    if (align) {
      if (align === 'vertical-left') realPosition = 'left-top';
      if (align === 'vertical-right') realPosition = 'right-top';
      if (align === 'bottom') realPosition = 'bottom-left';
      if (align === 'left') realPosition = 'left-top';
      if (align === 'right') realPosition = 'right-top';
    } else {
      realPosition = position || 'left-top';
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
    setCollapse(!collapse);
  };

  useEffect(() => {
    if (!panelRef.current) return;
    if (collapsible) {
      if (collapse) {
        panelHeight.current = panelRef.current.clientHeight;
        if (autoFill) {
          setPanelStyle({ height: panelRef.current.clientHeight, flex: 1 });
          setTimeout(() => {
            setPanelStyle({ height: 0, flex: 0 });
          }, 10);
        } else {
          setPanelStyle({ height: panelRef.current.clientHeight });
          setTimeout(() => {
            setPanelStyle({ height: 0 });
          }, 10);
        }
      } else {
        if (panelHeight.current === 0) return;
        if (autoFill) {
          setPanelStyle({ height: panelHeight.current, flex: 1 });
          setTimeout(() => {
            setPanelStyle({ height: 'auto', flex: 1 });
          }, 200);
        } else {
          setPanelStyle({ height: panelHeight.current });
          setTimeout(() => {
            setPanelStyle({ height: 'auto' });
          }, 200);
        }
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
        collapsible={collapsible}
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
      value={{ active, shape, isVertical, onChange, onCollapsible: handleCollapsible, lazy }}
    >
      <div {...getRootProps()} className={rootClass} {...getDataProps()}>
        {renderTabs()}
      </div>
    </Provider>
  );
};

Tabs.Panel = TabsPanel;

export default Tabs;
