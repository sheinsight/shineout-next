import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { TabsHeaderProps } from './tabs-header.type';
import { TabsClasses } from './tabs.type';
import { ButtonClasses } from '../button/button.type';
import { useTabsContext, useTransform, util } from '@sheinx/hooks';
import Tab from './tab';
import Icon from '../icons';
import Button from '../button';
import { useConfig } from '../config';

const getRectDiff = (node: HTMLElement, pNode: HTMLElement) => {
  const nodeRect = node.getBoundingClientRect();
  const pNodeRect = pNode.getBoundingClientRect();
  return {
    left: nodeRect.left - pNodeRect.left,
    right: nodeRect.right - pNodeRect.right,
    top: nodeRect.top - pNodeRect.top,
    bottom: nodeRect.bottom - pNodeRect.bottom,
    width: nodeRect.width,
    height: nodeRect.height,
    parentWidth: pNodeRect.width,
    parentHeight: pNodeRect.height,
  };
};

const TabsHeader = (props: TabsHeaderProps) => {
  const {
    tabs,
    jssStyle,
    hideSplit,
    collapsible,
    extra,
    splitColor,
    tabBarStyle,
    getPosition,
    sticky,
  } = props;

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const tabRef = useRef<Record<string | number, HTMLDivElement>>({});
  const { shape, isVertical, onCollapsible, active } = useTabsContext();

  const config = useConfig();

  const isRtl = config.direction === 'rtl';

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
  } = useTransform({
    autoScroll: true,
    direction: isVertical ? 'Y' : 'X',
    containerRef: headerRef,
    targetRef: scrollRef,
    isRtl: config.direction === 'rtl',
  });

  const headerStyle = jssStyle?.tabs?.() || ({} as TabsClasses);
  const headerClass = classNames(headerStyle.header, {});
  const headerWrapperClass = classNames(headerStyle.headerWrapper, {});

  const buttonStyle = jssStyle?.button || ({} as ButtonClasses);

  const calculateOffset = (
    currentScrollOffsetStartValue: number,
    width: number,
    currentOffsetStartValue: number,
    currentOffsetEndOther: number,
    parentWidth: number,
  ) => {
    const single = isRtl && !isVertical ? -1 : 1;
    if (currentOffsetStartValue * single < 0) {
      return currentScrollOffsetStartValue;
    }
    if (currentOffsetEndOther * single > 0) {
      return currentScrollOffsetStartValue + single * (width - parentWidth);
    }
    return undefined;
  };

  useEffect(() => {
    if (!shouldScroll) return;
    const getActiveTabOffest = () => {
      const currentTab = tabRef.current[active!];
      if (!currentTab || !headerRef.current || !scrollRef.current) return 0;

      const currentOffest = getRectDiff(currentTab, headerRef.current);
      const currentScrollOffset = getRectDiff(currentTab, scrollRef.current);
      // vertical
      if (['left-top', 'right-top', 'left-bottom', 'right-bottom'].includes(getPosition!)) {
        return calculateOffset(
          currentScrollOffset.top,
          currentScrollOffset.height,
          currentOffest.top,
          currentOffest.bottom,
          currentOffest.parentHeight,
        );
      }
      if (isRtl) {
        return calculateOffset(
          currentScrollOffset.right,
          currentScrollOffset.width,
          currentOffest.right,
          currentOffest.left,
          currentOffest.parentWidth,
        );
      }
      return calculateOffset(
        currentScrollOffset.left,
        currentScrollOffset.width,
        currentOffest.left,
        currentOffest.right,
        currentOffest.parentWidth,
      );
    };
    const offset = getActiveTabOffest();
    if (offset !== undefined) {
      setTransform(offset);
    }
  }, [active, tabRef.current, headerRef.current, scrollRef.current, shouldScroll]);

  const getDataProps = (options?: { state?: string; position?: string; shape?: string }) => {
    return util.getDataAttribute({
      ...options,
    });
  };

  const handlePrev = () => {
    if (!headerRef.current) return;
    const single = isRtl && !isVertical ? -1 : 1;
    setTransform(delta - headerRef.current.clientWidth * single);
  };

  const handleNext = () => {
    if (!headerRef.current) return;
    const single = isRtl && !isVertical ? -1 : 1;
    setTransform(delta + headerRef.current.clientWidth * single);
  };

  const renderTab = () => {
    return (
      <div ref={headerRef} className={headerClass}>
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
        {...getDataProps({ state: atStart ? 'disabled' : '' })}
        onClick={handlePrev}
        dir={config.direction}
      >
        {shape === 'card' ? (
          Icon.tabs.Pre
        ) : (
          <span className={headerStyle.iconInner}>{Icon.tabs.Pre}</span>
        )}
      </div>
    );
  };

  const renderNextButton = () => {
    return (
      <div
        className={headerStyle.next}
        {...getDataProps({ state: atEnd ? 'disabled' : '' })}
        onClick={handleNext}
        dir={config.direction}
      >
        {shape === 'card' ? (
          Icon.tabs.Next
        ) : (
          <span className={headerStyle.iconInner}>{Icon.tabs.Next}</span>
        )}
      </div>
    );
  };

  const renderCollapsibleButton = () => {
    return (
      <div className={headerStyle.collapsible} onClick={onCollapsible}>
        {Icon.tabs.CollapseArrow}
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
    <div
      className={headerWrapperClass}
      style={tabBarStyle}
      {...getDataProps({ position: props.getPosition, shape })}
      dir={config.direction}
    >
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
