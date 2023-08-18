import classNames from 'classnames';
import { useRef } from 'react';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';
import { TabsPanelProps } from './tabs-panel.type';

const TabsPanel = (props: TabsPanelProps) => {
  const { children, lazy, id, jssStyle } = props;
  const { active } = useTabsContext();
  const isActive = active === id;
  const keekAlive = useRef(false);
  if (!isActive && lazy && !keekAlive.current) {
    return null;
  }
  // 首次不加载，一旦加载后常驻
  keekAlive.current = true;
  const panelStyle = jssStyle?.tabs || ({} as TabsClasses);
  const panelClass = classNames(panelStyle.panel, {
    [panelStyle.show]: isActive,
  });

  return <div className={panelClass}>{children}</div>;
};

export default TabsPanel;
