import classNames from 'classnames';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import { useTabsContext } from '@sheinx/hooks';
import Tab from './tab';

const TabsHeader = (props: TabsHeaderProps) => {
  const { tabs, jssStyle } = props;
  const { shape } = useTabsContext();

  const headerStyle = jssStyle?.tabs || ({} as TabsClasses);
  const headerClass = classNames(headerStyle.header);

  const getDataProps = () => {
    return {
      'data-soui-shape': shape,
    };
  };

  const renderTab = () => {
    return (
      <div className={headerClass} {...getDataProps()}>
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
