import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import { useTabsContext, useTransform } from '@sheinx/hooks';
import Tab from './tab';
import Icon from '../icons';
import Button from '../button';

const TabsHeader = (props: TabsHeaderProps) => {
  const { tabs, jssStyle, hideSplit, collapsible, extra, splitColor, tabBarStyle, getPosition } =
    props;

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<Record<string | number, HTMLDivElement>>({});
  const { shape, isVertical, onCollapsible, active } = useTabsContext();

  const {
    delta,
    atStart,
    atEnd,
    style: transformStyle,
    shouldScroll,
    handleTransform,
    setTransform,
    getRectDiff,
  } = useTransform({
    autoScroll: true,
    direction: isVertical ? 'Y' : 'X',
    container: headerRef.current,
    target: scrollRef.current,
  });

  const headerStyle = jssStyle?.tabs?.() || ({} as TabsClasses);
  const headerClass = classNames(headerStyle.header, {});
  const headerWrapperClass = classNames(headerStyle.headerWrapper, {});

  const buttonStyle = jssStyle?.button || ({} as ButtonClasses);

  useEffect(() => {
    if (!shouldScroll) return;
    const getActiveTabOffest = () => {
      const currentTab = tabRef.current[active!];
      if (!currentTab) return 0;
      if (!headerRef.current) return 0;
      if (!scrollRef.current) return 0;
      const currentOffest = getRectDiff(currentTab, headerRef.current);
      const scrollOffest = getRectDiff(scrollRef.current, headerRef.current);
      if (['top-right', 'bottom-right'].includes(getPosition!)) {
        let nextOffset = scrollOffest.right;
        const startOffset = scrollOffest.right - currentOffest.left;
        if (currentOffest.left < 0 || currentOffest.right > 0) {
          nextOffset = startOffset;
        }
        return -nextOffset;
      }
      if (['left-top', 'right-top'].includes(getPosition!)) {
        let nextOffset = -scrollOffest.top;
        const startOffset = -scrollOffest.top + currentOffest.top;
        if (currentOffest.top < 0 || currentOffest.bottom > 0) {
          nextOffset = startOffset;
        }
        return nextOffset;
      }
      if (['left-bottom', 'right-bottom'].includes(getPosition!)) {
        let nextOffset = scrollOffest.bottom;
        const startOffset = scrollOffest.bottom - currentOffest.top;
        if (currentOffest.top < 0 || currentOffest.bottom > 0) {
          nextOffset = startOffset;
        }
        return -nextOffset;
      }
      let nextOffset = -scrollOffest.left;
      const startOffset = -scrollOffest.left + currentOffest.left;
      if (currentOffest.left < 0 || currentOffest.right > 0) {
        nextOffset = startOffset;
      }
      return nextOffset;
    };
    setTransform(getActiveTabOffest());
  }, [active, tabRef.current, headerRef.current, scrollRef.current, shouldScroll]);

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
          className={classNames(
            headerStyle.headerScroll,
            shape === 'card' ? headerStyle.cardHr : '',
          )}
          onWheel={handleTransform}
          style={transformStyle}
        >
          {shape === 'button' && (
            <Button.Group jssStyle={{ button: buttonStyle }}>
              {tabs.map((tab, index) => {
                return (
                  <Tab
                    key={index}
                    {...tab}
                    ref={(node: any) => {
                      tabRef.current[tab.id] = node;
                    }}
                  ></Tab>
                );
              })}
            </Button.Group>
          )}

          {shape !== 'button' &&
            tabs.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  {...tab}
                  ref={(node: any) => {
                    tabRef.current[tab.id] = node;
                  }}
                ></Tab>
              );
            })}
        </div>
      </div>
    );
  };

  const renderExtra = () => {
    return <div className={headerStyle.extra}>{extra}</div>;
  };

  const renderPrevButton = () => {
    return (
      <div
        className={classNames(headerStyle.prev)}
        {...getDataProps({ 'data-soui-state': atStart ? 'disabled' : '' })}
        onClick={handlePrev}
      >
        {shape === 'card' ? (
          Icon.ArrowLeft
        ) : (
          <span className={headerStyle.iconInner}>{Icon.ArrowLeft}</span>
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
          Icon.ArrowRight
        ) : (
          <span className={headerStyle.iconInner}>{Icon.ArrowRight}</span>
        )}
      </div>
    );
  };

  const renderCollapsibleButton = () => {
    return (
      <div className={headerStyle.collapsible} onClick={onCollapsible}>
        {Icon.ArrowLeft}
      </div>
    );
  };

  const renderHr = () => {
    const style: { background?: string } = {};

    if (splitColor) {
      style.background = splitColor;
    }
    return <div className={headerStyle.hr} style={style}></div>;
  };

  return (
    <div className={headerWrapperClass} style={tabBarStyle}>
      {!hideSplit && shape !== 'card' && renderHr()}
      {collapsible && renderCollapsibleButton()}
      {shouldScroll && renderPrevButton()}
      {renderTab()}
      {shouldScroll && renderNextButton()}
      {extra && renderExtra()}
    </div>
  );
};

export default TabsHeader;
