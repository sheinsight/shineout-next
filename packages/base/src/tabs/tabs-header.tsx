import classNames from 'classnames';
import { useTabsHeader, TabsContextProps } from '@sheinx/hooks';
import { TabsHeaderProps, TabsHeaderWidthContextProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import Tab from './tab';

const TabsHeader = (props: TabsHeaderWidthContextProps) => {
  const { tabs, jssStyle, shape = 'card' } = props;
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

// Provider 接收器，接点 Tabs 散播的共享数据
const TabsHeaderWidthContext = (props: TabsHeaderProps) => {
  const { Consumer } = useTabsHeader();

  return (
    <Consumer>
      {(value: TabsContextProps) => {
        return <TabsHeader {...props} {...value}></TabsHeader>;
      }}
    </Consumer>
  );
};

export default TabsHeaderWidthContext;
