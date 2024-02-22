import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import { useTabsContext, useTransform } from '@sheinx/hooks';
import Tab from './tab';
import Icon from '../icons';
import Button from '../button';

const TabsHeader = (props: TabsHeaderProps) => {
  const { tabs, jssStyle, hideSplit, collapsible, extra, splitColor, tabBarStyle, getPosition, sticky } =
    props;

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false); 
  const tabRef = useRef<Record<string | number, HTMLDivElement>>({});
  const { shape, isVertical, onCollapsible, active } = useTabsContext();

  useEffect(() => {
    if (sticky && headerRef.current && scrollRef.current && !loaded) {
      setLoaded(true);
    }
  }, [loaded, sticky]);

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

  const calculateOffset = (
    scrollOffsetValue: number,
    currentOffsetValue: number,
    currentOffsetValueOther: number,
    isAdditon: boolean = true,
  ) => {
    let nextOffset = scrollOffsetValue;
    const startOffset = isAdditon
      ? scrollOffsetValue - currentOffsetValue
      : scrollOffsetValue + currentOffsetValue;
    if (currentOffsetValue < 0 || currentOffsetValueOther > 0) {
      nextOffset = startOffset;
    }
    return nextOffset;
  };

  useEffect(() => {
    if (!shouldScroll) return;
    const getActiveTabOffest = () => {
      const currentTab = tabRef.current[active!];
      if (!currentTab || !headerRef.current || !scrollRef.current) return 0;

      const currentOffest = getRectDiff(currentTab, headerRef.current);
      const scrollOffest = getRectDiff(scrollRef.current, headerRef.current);

      if (['top-right', 'bottom-right'].includes(getPosition!)) {
        return -calculateOffset(scrollOffest.right, currentOffest.left, currentOffest.right);
      }
      if (['left-top', 'right-top'].includes(getPosition!)) {
        return calculateOffset(-scrollOffest.top, currentOffest.top, currentOffest.bottom, false);
      }
      if (['left-bottom', 'right-bottom'].includes(getPosition!)) {
        return -calculateOffset(scrollOffest.bottom, currentOffest.top, currentOffest.bottom);
      }
      return calculateOffset(-scrollOffest.left, currentOffest.left, currentOffest.right, false);
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
