import classNames from 'classnames';
import { useTabsContext } from '@sheinx/hooks';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import Tab from './tab';

const TabsHeader = (props: TabsHeaderProps) => {
  const { tabs, jssStyle } = props;
  const { shape = 'card' } = useTabsContext();

  const headerStyle = jssStyle?.tabs || ({} as TabsClasses);
  const headerClass = classNames(headerStyle.header, headerStyle[shape]);
  const renderTab = () => {
    return (
      <div className={headerClass}>
        {tabs.map((tab, index) => {
          return <Tab key={index} {...tab}></Tab>;
        })}
      </div>
    );
  };

  // const renderExtra = () => {};

  // const renderPrevButton = () => {};

  // const renderNextButton = () => {};

  return renderTab();
};

export default TabsHeader;
