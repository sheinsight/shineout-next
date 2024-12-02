import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';
import { TabsPanelProps } from './tabs-panel.type';
import { TabData } from './tab.type';

const TabsPanel = (props: TabsPanelProps) => {
  const { children, id, tab, className, style, jssStyle } = props;

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
      color: props.color || (active === id ? color : undefined),
    } as TabData;

    setTabs(prev => {
      const prevTab = prev.find(item => item.id === id)
      if(prevTab){
        return prev.map(item => {
          if(item.id !== id) return item
          return { ...item, ...tabData }
        })
      }
      return [...prev, tabData]
    })
  }, [id, tab, color, ...(color ? [active] : []), props.disabled, props.jssStyle])

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
    ...style,
  };

  return (
    <div className={panelClass} style={styles}>
      {children}
    </div>
  );
};

export default TabsPanel;
