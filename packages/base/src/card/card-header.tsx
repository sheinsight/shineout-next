import classNames from 'classnames';
import { CardContext } from './card.context';
import { useContext } from 'react';
import Icons from '../icons';

import type { CardHeaderProps } from './card-header.type';

const CardHeader = (props: CardHeaderProps) => {
  const {} = props;
  const cardClasses = props.jssStyle?.card?.();
  const { collapsible, onCollapse, handleDragMouseDown } = useContext(CardContext);

  const renderIndicator = () => {
    if (!collapsible) return null;
    return (
      <div className={cardClasses?.indicator}>
        <div className={cardClasses?.indicatorIcon}>{Icons.ArrowRight}</div>
      </div>
    );
  };

  return (
    <div
      onMouseDown={handleDragMouseDown}
      onClick={onCollapse}
      className={classNames(props.className, cardClasses?.header)}
      style={props.style}
    >
      {renderIndicator()}
      <div className={cardClasses?.headerContent}>{props.children}</div>
      {props.extra && <div className={cardClasses?.headerExtra}>{props.extra}</div>}
    </div>
  );
};

export default CardHeader;
