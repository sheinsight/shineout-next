import React, { Children, cloneElement, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useTabs, util } from '@sheinx/hooks';
import { TabsClasses, TabsProps } from './tabs.type';
import { TabData } from './tab.type';
import { TabsPanelProps } from './tabs-panel.type';
import TabsPanel from './tabs-panel';
import TabsHeader from './tabs-header';
import Sticky, { type StickyProps } from '../sticky';

const { isEmpty, isObject, isNumber, isNamedComponent, devUseWarning } = util;

const Tabs = (props: TabsProps) => {
  if (props.border) {
    devUseWarning.deprecated('border', 'splitColor', 'Tabs');
  }
  if (props.tabBarExtraContent) {
    devUseWarning.deprecated('tabBarExtraContent', 'extra', 'Tabs');
  }
  if (props.align) {
    devUseWarning.deprecated('align', 'position', 'Tabs');
  }
  // todo: activeBackground 的作用需要再确认（by Tom）
  // if(props.background){
  //   devUseWarning.deprecated('background', 'activeBackground', 'Tabs');
  // }

  const {
    jssStyle,
    align,
    children,
    shape: shapeProps,
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
    defaultActive = 0,
    tabBarStyle,
    color,
    sticky,
    allowNonPanel,
    renderTabsHeader,
    className: tabsClassName,
    ...rest
  } = props;

  const shape = shapeProps && shapeProps !== 'bordered' ? shapeProps : 'card';

  const { Provider, active, onChange, tabs, setTabs } = useTabs<TabData>({
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
  const rootClass = clsx(tabsStyle.rootClass, tabsStyle.tabs, tabsClassName, {
    [tabsStyle.autoFill]: isVertical || autoFill,
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
    return util.getDataAttribute({
      position: getPosition(),
      shape,
    });
  };

  const handleCollapsible = () => {
    const nextCollapse = !collapse;
    setCollapse(nextCollapse);
  };

  useLayoutEffect(() => {
    if (!panelRef.current) return;
    if (collapsible) {
      if (collapse) {
        panelHeight.current = panelRef.current.clientHeight;
        setPanelStyle({ height: panelRef.current.clientHeight });
        setTimeout(() => {
          setPanelStyle({ height: 0, flex: autoFill ? 0 : 'none', overflow: 'hidden' });
        }, 10);
      } else {
        if (panelHeight.current === 0) return;
        setPanelStyle({ height: panelHeight.current, overflow: 'hidden' });
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
          const Child = child as React.ReactElement<TabsPanelProps>;

          if (isNamedComponent(Child.type) && Child.type.displayName === 'ShineoutTabsPanel') {
            return cloneElement<TabsPanelProps>(Child, {
              id: Child.props.id !== undefined ? Child.props.id : index,
              index,
              background: Child.props.background,
            });
          }

          if (allowNonPanel) {
            return Child;
          }

          return null;
        })}
      </div>
    );
  };

  const renderHeader = () => {
    let border = getSplitColor();
    Children.toArray(children).forEach((child, index) => {
      const Child = child as React.ReactElement<TabsPanelProps>;
      if (!Child || !Child.type) return;

      const childBorder = Child.props.splitColor || Child.props.border;
      const { id = index } = Child.props;
      if (active === id && childBorder) {
        border = childBorder;
      }
    });

    const header = (
      <TabsHeader
        tabs={tabs}
        align={align}
        jssStyle={jssStyle}
        position={position}
        hideSplit={hideSplit}
        extra={getExtra()}
        splitColor={border}
        collapsible={collapsible}
        tabBarStyle={tabBarStyle}
        getPosition={getPosition()}
        sticky={!!sticky}
      ></TabsHeader>
    );
    if (!isEmpty(sticky) && !isVertical) {
      const stickyClassName = tabsStyle.sticky;
      let stickyProps: { top?: number | undefined; className: string } = {
        top: 0,
        className: stickyClassName,
      };
      if (isNumber(sticky)) {
        stickyProps.top = sticky;
      }
      if (isObject(sticky)) {
        stickyProps = {
          ...(sticky as StickyProps),
          className: clsx(stickyClassName, (sticky as StickyProps).className),
        };
      }

      if (renderTabsHeader) {
        return renderTabsHeader(<Sticky {...stickyProps}>{header}</Sticky>, props);
      }

      return <Sticky {...stickyProps}>{header}</Sticky>;
    }

    if (renderTabsHeader) {
      return renderTabsHeader(header, props);
    }

    return header;
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

    devUseWarning.warn('Tabs position is invalid, please check it.');

    return (
      <>
        {renderHeader()}
        {renderContent()}
      </>
    );
  };

  return (
    <Provider<TabData>
      value={{
        lazy,
        active,
        shape,
        onChange,
        color,
        tabs,
        setTabs,
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
