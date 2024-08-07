import React from 'react';
import classNames from 'classnames';
import { TabProps } from './tab.type';
import { TabsClasses } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import Button from '../button';
import { useConfig } from '../config';

import { useTabsContext, util } from '@sheinx/hooks';

const Tab = (props: TabProps, ref: any) => {
  const { jssStyle, tab, disabled, id, color } = props;
  const {
    active,
    shape = 'card',
    onChange,
    activeBackground,
    inactiveBackground,
  } = useTabsContext();
  const config = useConfig();

  const tabsStyle = jssStyle?.tabs?.() || ({} as TabsClasses);
  const buttonStyle = jssStyle?.button || ({} as ButtonClasses);

  const tabClass = classNames(tabsStyle.tab, {});

  const isActive = active === id;

  const getStateProps = () => {
    const stateProps = [];
    if (isActive) stateProps.push('active');
    if (disabled) stateProps.push('disabled');
    return util.getDataAttribute({ state: stateProps.join(' ') });
  };

  const handleClick = () => {
    if (disabled) return;

    if (util.isLink(tab)) {
      if (tab.props.onClick && typeof tab.props.onClick === 'function') {
        tab.props.onClick()
      }
    }

    onChange?.(id);
  };

  const renderCardTab = () => {
    return tab;
  };

  const renderLineTab = () => {
    return <div className={tabsStyle.lineInner}>{tab}</div>;
  };

  const renderDashTab = () => {
    return <div className={tabsStyle.lineInner}>{tab}</div>;
  };

  const renderFillTab = () => {
    return <div className={tabsStyle.fillInner}>{tab}</div>;
  };

  const style: { background?: string; color?: string } = {};

  if (activeBackground && isActive) {
    style.background = activeBackground;
  }

  if (inactiveBackground && !isActive) {
    style.background = inactiveBackground;
  }

  if (shape === 'card') {
    style.color = color;
  }

  if (shape === 'button')
    return (
      <Button
        className={tabClass}
        jssStyle={{ button: buttonStyle }}
        {...getStateProps()}
        style={style}
        disabled={disabled}
        type={isActive ? 'primary' : 'secondary'}
        onClick={handleClick}
        dir={config.direction}
      >
        {tab}
      </Button>
    );

  return (
    <div
      dir={config.direction}
      className={tabClass}
      {...getStateProps()}
      style={style}
      onClick={handleClick}
      ref={ref}
    >
      {shape === 'card' && renderCardTab()}
      {shape === 'line' && renderLineTab()}
      {shape === 'dash' && renderDashTab()}
      {shape === 'fill' && renderFillTab()}
    </div>
  );
};

export default React.forwardRef(Tab);
