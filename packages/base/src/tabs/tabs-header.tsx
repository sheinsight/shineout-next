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
  const scaleX = pNode.offsetWidth / pNodeRect.width;
  const scaleY = pNode.offsetHeight / pNodeRect.height;
  return {
    left: (nodeRect.left - pNodeRect.left) * scaleX,
    right: (nodeRect.right - pNodeRect.right) * scaleX,
    top: (nodeRect.top - pNodeRect.top) * scaleY,
    bottom: (nodeRect.bottom - pNodeRect.bottom) * scaleY,
  };
}

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
    scrollOffsetValue: number,
    currentOffsetValue: number,
    currentOffsetValueOther: number,
    isAdditon: boolean = true,
  ) => {
    console.log('scrollOffsetValue', scrollOffsetValue);
    console.log('currentOffsetValue', currentOffsetValue);
    console.log('currentOffsetValueOther', currentOffsetValueOther);
    let nextOffset = scrollOffsetValue;
    
    console.log(currentOffsetValue, currentOffsetValueOther)
    if (currentOffsetValue < 0 || currentOffsetValueOther > 0) {
      const startOffset = isAdditon
      ? scrollOffsetValue - currentOffsetValue
      : scrollOffsetValue + currentOffsetValue;
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

      let positionFit = getPosition;
      // if (isRtl) {
      //   if (positionFit.indexOf('left') > -1) {
      //     positionFit = positionFit.replace('left', 'right');
      //   } else if (positionFit.indexOf('right') > -1) {
      //     positionFit = positionFit.replace('right', 'left');
      //   }
      // }
      console.log(getPosition, positionFit);

      if (['top-right', 'bottom-right'].includes(positionFit!)) {
        return -calculateOffset(scrollOffest.right, currentOffest.left, currentOffest.right);
      }
      if (['left-top', 'right-top'].includes(positionFit!)) {
        return calculateOffset(-scrollOffest.top, currentOffest.top, currentOffest.bottom, false);
      }
      if (['left-bottom', 'right-bottom'].includes(positionFit!)) {
        return -calculateOffset(scrollOffest.bottom, currentOffest.top, currentOffest.bottom);
      }
      return calculateOffset(-scrollOffest.left, currentOffest.left, currentOffest.right, false);
    };
    // setTransform(getActiveTabOffest());
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
