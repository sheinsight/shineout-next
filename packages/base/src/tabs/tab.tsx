import classNames from 'classnames';
import { TabProps } from './tab.type';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';

const Tab = (props: TabProps) => {
  const { jssStyle, tab, disabled, id } = props;
  const { active, onChange } = useTabsContext();

  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const tabClass = classNames(tabsStyle.tab, {
    [tabsStyle.disabled]: disabled,
    [tabsStyle.active]: active === id,
  });

  const handleClick = () => {
    if (disabled) return;
    onChange?.(id);
  };

  return (
    <div className={tabClass} onClick={handleClick}>
      {tab}
    </div>
  );
};

export default Tab;
