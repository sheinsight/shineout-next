import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';
import { TabsPanelProps } from './tabs-panel.type';
import { TabData } from './tab.type';

const TabsPanel = (props: TabsPanelProps) => {
  const { children, id, index: indexInTabs, tab, background, className, style, jssStyle } = props;

  const panelStyle = jssStyle?.tabs?.() || ({} as TabsClasses);

  const { active, lazy, setTabs, color } = useTabsContext<TabData>();
  const isActive = active === id;
  const keekAlive = useRef(false);

  useLayoutEffect(() => {
    const tabData = {
      id,
      tab,
      disabled: props.disabled,
      jssStyle,
      background,
      color: props.color || (active === id ? color : undefined),
    } as TabData;

    setTabs((prev) => {
      const oldTab = prev.find((item) => item.id === id);
      if (oldTab) {
        return prev.map((item) => {
          if (item.id !== id) return item;
          return { ...item, ...tabData };
        });
      }

      if (indexInTabs === undefined) {
        return [...prev, tabData];
      }

      // 向indexInTabs位置插入tabData
      const newTabs = [...prev.slice(0, indexInTabs), tabData, ...prev.slice(indexInTabs)];
      return newTabs;
    });

    return () => {
      // Panel卸载了通知父组件，去销毁相应的TabsHeader
      setTabs((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    };
  }, [id, tab, color, active, props.disabled, props.jssStyle]);

  if (!isActive && lazy && !keekAlive.current) {
    return null;
  }

  // 首次不加载，一旦加载后常驻
  keekAlive.current = true;

  const panelClass = classNames(className, panelStyle.panel, {
    [panelStyle.show]: isActive,
  });

  const styles: React.CSSProperties = {
    color,
    background,
    ...style,
  };

  return (
    <div className={panelClass} style={styles}>
      {children}
    </div>
  );
};

export default TabsPanel;
