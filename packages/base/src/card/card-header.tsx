import clsx from 'clsx';
import { CardContext } from './card.context';
import { useContext } from 'react';
import Icons from '../icons';
import { useConfig } from '../config';

import type { CardHeaderProps } from './card-header.type';

const CardHeader = (props: CardHeaderProps) => {
  const { align } = props;
  const cardClasses = props.jssStyle?.card?.();
  const config = useConfig();
  const { collapsible, onCollapse, handleDragMouseDown } = useContext(CardContext);

  const renderIndicator = () => {
    if (!collapsible) return null;
    return (
      <div className={cardClasses?.indicator}>
        <div className={cardClasses?.indicatorIcon} dir={config.direction}>
          {Icons.card.CollapseArrow}
        </div>
      </div>
    );
  };

  const alignClass = clsx(
    align === 'center' && cardClasses?.center,
    align === 'right' && cardClasses?.right,
  );

  const headerContentClassName = clsx(
    cardClasses?.headerContent,
    alignClass
  );

  const commonHeaderProps = {
    onMouseDown: handleDragMouseDown,
    onClick: onCollapse,
    style: props.style
  }

  if (!props.extra && !collapsible) {
    const simpleHeaderClassName = clsx(
      cardClasses?.header,
      cardClasses?.simpleHeader, 
      alignClass, 
      props.className
    );
    
    return (
      <div
        className={simpleHeaderClassName}
        {...commonHeaderProps}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className={clsx(props.className, cardClasses?.header)}
      {...commonHeaderProps}
    >
      {renderIndicator()}
      <div className={headerContentClassName}>{props.children}</div>
      {props.extra && <div className={cardClasses?.headerExtra}>{props.extra}</div>}
    </div>
  );
};

export default CardHeader;
