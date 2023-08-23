import { useRef } from 'react';
import classNames from 'classnames';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import { useTabsContext, useTransform } from '@sheinx/hooks';
import Tab from './tab';
import Icon from '../icons';

const TabsHeader = (props: TabsHeaderProps) => {
  const { tabs, jssStyle, hideSplit, collapsible } = props;

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { shape, isVertical, onCollapsible } = useTabsContext();

  const {
    delta,
    atStart,
    atEnd,
    style: transformStyle,
    shouldScroll,
    handleTransform,
    setTransform,
  } = useTransform({
    autoScroll: true,
    direction: isVertical ? 'Y' : 'X',
    container: headerRef.current,
    target: scrollRef.current,
  });

  const headerStyle = jssStyle?.tabs || ({} as TabsClasses);
  const headerClass = classNames(headerStyle.header, {});

  const headerWrapperClass = classNames(headerStyle.headerWrapper, {
    [headerStyle.hideHeaderLine]: hideSplit,
  });

  const getDataProps = (options?: { 'data-soui-state'?: string }) => {
    return {
      'data-soui-shape': shape,
      ...options,
    };
  };

  const handlePrev = () => {
    if (!headerRef.current) return;
    setTransform(delta - headerRef.current.clientWidth);
  };

  const handleNext = () => {
    if (!headerRef.current) return;
    setTransform(delta + headerRef.current.clientWidth);
  };

  const renderTab = () => {
    return (
      <div ref={headerRef} className={headerClass} {...getDataProps()}>
        <div
          ref={scrollRef}
          className={headerStyle.headerScroll}
          onWheel={handleTransform}
          style={transformStyle}
        >
          {tabs.map((tab, index) => {
            return <Tab key={index} {...tab}></Tab>;
          })}
        </div>
      </div>
    );
  };

  // const renderExtra = () => {};

  const renderPrevButton = () => {
    return (
      <div
        className={classNames(headerStyle.prev)}
        {...getDataProps({ 'data-soui-state': atStart ? 'disabled' : '' })}
        onClick={handlePrev}
      >
        {shape === 'card' ? (
          Icon.AngleLeft
        ) : (
          <span className={headerStyle.iconInner}>{Icon.AngleLeft}</span>
        )}
      </div>
    );
  };

  const renderNextButton = () => {
    return (
      <div
        className={headerStyle.next}
        {...getDataProps({ 'data-soui-state': atEnd ? 'disabled' : '' })}
        onClick={handleNext}
      >
        {shape === 'card' ? (
          Icon.AngleRight
        ) : (
          <span className={headerStyle.iconInner}>{Icon.AngleRight}</span>
        )}
      </div>
    );
  };

  const renderCollapsibleButton = () => {
    return (
      <div className={headerStyle.collapsible} onClick={onCollapsible}>
        {Icon.AngleLeft}
      </div>
    );
  };

  return (
    <div className={headerWrapperClass}>
      {collapsible && renderCollapsibleButton()}
      {shouldScroll && renderPrevButton()}
      {renderTab()}
      {shouldScroll && renderNextButton()}
    </div>
  );
};

export default TabsHeader;
