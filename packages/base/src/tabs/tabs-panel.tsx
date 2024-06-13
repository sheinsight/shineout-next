import { useEffect } from 'react';
import classNames from 'classnames';
import { useRef } from 'react';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';
import { TabsPanelProps } from './tabs-panel.type';

const TabsPanel = (props: TabsPanelProps) => {
  const { children, id, className, style, color, jssStyle } = props;
  const panelStyle = jssStyle?.tabs?.() || ({} as TabsClasses);

  const { active, lazy, bindTab } = useTabsContext();
  const isActive = active === id;
  const keekAlive = useRef(false);

  useEffect(() => {
    bindTab?.(props);
  }, []);

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
