import classNames from 'classnames';
import { CardContext } from './card.context';
import { useContext } from 'react';
import Icons from '../icons';
import { useConfig } from '../config';

import type { CardHeaderProps } from './card-header.type';

const CardHeader = (props: CardHeaderProps) => {
  const { align } = props;
  const cardClasses = props.jssStyle?.card?.();
  const config = useConfig();
  const { collapsible, onCollapse, handleDragMouseDown, semClass, semStyle } = useContext(CardContext);

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

  const alignClass = classNames(
    align === 'center' && cardClasses?.center,
    align === 'right' && cardClasses?.right,
  );

  const headerContentClassName = classNames(
    cardClasses?.headerContent,
    alignClass,
    semClass?.('headerContent'),
  );

  const commonHeaderProps = {
    onMouseDown: handleDragMouseDown,
    onClick: onCollapse,
    style: { ...props.style, ...semStyle?.('header') },
  }

  if (!props.extra && !collapsible) {
    const simpleHeaderClassName = classNames(
      cardClasses?.header,
      cardClasses?.simpleHeader,
      alignClass,
      props.className,
      semClass?.('header'),
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
      className={classNames(props.className, cardClasses?.header, semClass?.('header'))}
      {...commonHeaderProps}
    >
      {renderIndicator()}
      <div className={headerContentClassName} style={semStyle?.('headerContent')}>{props.children}</div>
      {props.extra && <div className={classNames(cardClasses?.headerExtra, semClass?.('headerExtra'))} style={semStyle?.('headerExtra')}>{props.extra}</div>}
    </div>
  );
};

export default CardHeader;
