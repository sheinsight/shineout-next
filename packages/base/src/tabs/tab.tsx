import React from 'react';
import classNames from 'classnames';
import { TabProps } from './tab.type';
import { TabsClasses } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import Button from '../button';
import { useConfig } from '../config';

import { useTabsContext, util } from '@sheinx/hooks';

const Tab = (props: TabProps, ref: any) => {
  const { jssStyle, tab: propTab, disabled, id, color } = props;
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

    onChange?.(id);
  };

  const tab = util.isLink(propTab)
    ? // 直接返回a标签的内容，不要a标签
      propTab.props.children
    : propTab;

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

  const containerProps = {
    className: tabClass,
    ...getStateProps(),
    style: style,
    onClick: handleClick,
    ref: ref,
    dir: config.direction,
  };

  if (shape === 'button') {
    return (
      <Button
        jssStyle={{ button: buttonStyle }}
        disabled={disabled}
        type={isActive ? 'primary' : 'secondary'}
        {...containerProps}
      >
        {tab}
      </Button>
    );
  }

  const $children = (
    <>
      {shape === 'card' && renderCardTab()}
      {shape === 'line' && renderLineTab()}
      {shape === 'dash' && renderDashTab()}
      {shape === 'fill' && renderFillTab()}
    </>
  );

  if (util.isLink(propTab)) {
    return React.cloneElement(propTab, {
      children: $children,

      ...containerProps,
    });
  }

  return <div {...containerProps}>{$children}</div>;
};

export default React.forwardRef(Tab);
