import classNames from 'classnames';
import { TabProps } from './tab.type';
import { TabsClasses } from './tabs.type';

const Tab = (props: TabProps) => {
  const { jssStyle, tab } = props;

  const tabsStyle = jssStyle?.tabs || ({} as TabsClasses);
  const tabClass = classNames(tabsStyle.tab);

  return <div className={tabClass}>{tab}</div>;
};

export default Tab;
