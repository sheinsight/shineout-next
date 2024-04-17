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

  const headerContentClassName = classNames(
    cardClasses?.headerContent,
    align === 'center' && cardClasses?.center,
    align === 'right' && cardClasses?.right,
  );

  return (
    <div
      onMouseDown={handleDragMouseDown}
      onClick={onCollapse}
      className={classNames(props.className, cardClasses?.header)}
      style={props.style}
    >
      {renderIndicator()}
      <div className={headerContentClassName}>{props.children}</div>
      {props.extra && <div className={cardClasses?.headerExtra}>{props.extra}</div>}
    </div>
  );
};

export default CardHeader;
