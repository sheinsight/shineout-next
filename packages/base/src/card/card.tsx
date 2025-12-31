import { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { usePersistFn, useDragMove, useDragResize, useRender } from '@sheinx/hooks';
import clsx from 'clsx';
import { CardContext } from './card.context';
import { CardAccordionContext, defualtCardAccordionContextValue } from './card-accordion-context';
import { FormFooterProvider } from '../form/form-footer-context';

import type { CardProps } from './card.type';
import type { CardContextValue } from './card.context';

const Card = (props: CardProps) => {
  const { style = {}, defaultCollapsed = true } = props;
  const cardClasses = props.jssStyle?.card?.();
  const panelRef = useRef<HTMLDivElement>(null);
  const forceUpdate = useRender();
  const { current: context } = useRef({
    id: undefined as number | undefined,
  });

  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const moveInfo = useDragMove();
  const resizeInfo = useDragResize({
    defaultWidth: style?.width,
    defaultHeight: style?.height,
    panelRef,
  });

  const { inAccordion, activeId, getDefaultId, onActiveChange } = useContext(CardAccordionContext);

  useEffect(() => {
    if (context.id === undefined) {
      context.id = getDefaultId();
      forceUpdate();
    }
  }, []);

  const id = props.id ?? context.id;

  const collapsible = props.collapsible || inAccordion;

  const getCollapsed = () => {
    if (inAccordion) return activeId !== id;
    if (!collapsible) return false;
    if (props.collapsed !== undefined) return !!props.collapsed;
    return collapsed;
  };

  const handleCollapsed = usePersistFn(() => {
    if (inAccordion) {
      onActiveChange(id);
      return;
    }
    if (!collapsible) return;
    props.onCollapse?.(!props.collapsed);
    setCollapsed(!collapsed);
  });

  const realCollapsed = getCollapsed();
  const contextValue: CardContextValue = useMemo(() => {
    return {
      collapsed: realCollapsed,
      collapsible: collapsible,
      onCollapse: handleCollapsed,
      handleDragMouseDown: props.moveable ? moveInfo.handleMouseDown : undefined,
    };
  }, [realCollapsed, collapsible]);

  const alwaysShowShadow = props.shadow && props.shadow !== 'hover';

  const renderResize = () => {
    if (!props.resizable) return null;
    return (
      <>
        <div className={cardClasses?.resizeX} onMouseDown={resizeInfo.handleXMouseDown}></div>
        <div className={cardClasses?.resizeY} onMouseDown={resizeInfo.handleYMouseDown}></div>
        <div className={cardClasses?.resizeXY} onMouseDown={resizeInfo.handleXYMouseDown}></div>
      </>
    );
  };

  const wrapStyle = {
    ...props.style,
  };

  if (props.resizable) {
    wrapStyle.width = resizeInfo.width;
    wrapStyle.height = resizeInfo.height;
  }

  if (props.moveable) {
    wrapStyle.transform = `translate(${moveInfo.pos.x}px, ${moveInfo.pos.y}px)`;
  }

  return (
    <div
      className={clsx(
        props.className,
        cardClasses?.rootClass,
        cardClasses?.wrapper,
        props.shadow === 'hover' && cardClasses?.wrapperHover,
        alwaysShowShadow && cardClasses?.wrapperShadow,
        collapsible && cardClasses?.wrapperCollapsible,
        realCollapsed && cardClasses?.wrapperCollapsed,
        props.resizable && cardClasses?.wrapperResizable,
        props.moveable && cardClasses?.wrapperMoveable,
        props.split && cardClasses?.wrapperSplit,
        inAccordion && cardClasses?.wrapperInAccordion,
      )}
      ref={panelRef}
      style={wrapStyle}
    >
      <CardContext.Provider value={contextValue}>
        <FormFooterProvider>
          <CardAccordionContext.Provider value={defualtCardAccordionContextValue}>
            {props.children}
          </CardAccordionContext.Provider>
        </FormFooterProvider>
      </CardContext.Provider>
      {renderResize()}
    </div>
  );
};

export default Card;
