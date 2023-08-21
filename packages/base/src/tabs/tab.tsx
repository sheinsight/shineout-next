import classNames from 'classnames';
import { TabProps } from './tab.type';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';

const Tab = (props: TabProps) => {
  const { jssStyle, tab, disabled, id } = props;
  const { active, shape = 'card', onChange } = useTabsContext();

  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const tabClass = classNames(tabsStyle.tab, {
    // [tabsStyle.disabled]: disabled,
    // [tabsStyle.active]: active === id,
  });

  const getStateProps = () => {
    const stateProps = [];
    if (active === id) stateProps.push('active');
    if (disabled) stateProps.push('disabled');

    return {
      'data-soui-state': stateProps.join(' '),
    };
  };

  const handleClick = () => {
    if (disabled) return;
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

  return (
    <div className={tabClass} {...getStateProps()} onClick={handleClick}>
      {shape === 'card' && renderCardTab()}
      {shape === 'line' && renderLineTab()}
      {shape === 'dash' && renderDashTab()}
      {shape === 'fill' && renderFillTab()}
    </div>
  );
};

export default Tab;
