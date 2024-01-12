import { usePersistFn, useDragMove, useDragResize } from '@sheinx/hooks';
import classNames from 'classnames';
import { useState, useMemo, useRef, useContext } from 'react';
import { CardContext } from './card.context';
import { CardAccordionContext, defualtCardAccordionContextValue } from './card-accordion-context';
import { FormFooterProvider } from '../form/form-footer-context';

import type { CardProps } from './card.type';
import type { CardContextValue } from './card.context';

const Card = (props: CardProps) => {
  const { style = {} } = props;
  const cardClasses = props.jssStyle?.card?.();
  const panelRef = useRef<HTMLDivElement>(null);
  const { current: context } = useRef({
    id: undefined as number | undefined,
  });

  const [collpased, setCollpased] = useState(props.defaultCollapsed);
  const moveInfo = useDragMove();
  const resizeInfo = useDragResize({
    defaultWidth: style?.width,
    defaultHeight: style?.height,
    panelRef,
  });

  const { inAccordion, activeId, getDefaultId, onActiveChange } = useContext(CardAccordionContext);

  if (context.id === undefined) {
    context.id = getDefaultId();
  }

  const id = props.id ?? context.id;

  const collapsible = props.collapsible || inAccordion;

  const getCollpased = () => {
    if (inAccordion) return activeId !== id;
    if (!collapsible) return false;
    if (props.collapsed !== undefined) return !!props.collapsed;
    return collpased;
  };

  const handleCollpased = usePersistFn(() => {
    if (inAccordion) {
      onActiveChange(id);
      return;
    }
    if (!collapsible) return;
    props.onCollapse?.(!props.collapsed);
    setCollpased(!collpased);
  });

  const realCollpased = getCollpased();
  const contextValue: CardContextValue = useMemo(() => {
    return {
      collapsed: realCollpased,
      collapsible: collapsible,
      onCollapse: handleCollpased,
      handleDragMouseDown: moveInfo.handleMouseDown,
    };
  }, [realCollpased, collapsible]);

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
      className={classNames(
        props.className,
        cardClasses?.wrapper,
        props.shadow === 'hover' && cardClasses?.wrapperHover,
        alwaysShowShadow && cardClasses?.wrapperShadow,
        collapsible && cardClasses?.wrapperCollapsible,
        realCollpased && cardClasses?.wrapperCollapsed,
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
