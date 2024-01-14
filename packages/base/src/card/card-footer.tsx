import classNames from 'classnames';
import { CardContext } from './card.context';
import { useContext } from 'react';

import type { CardHeaderProps } from './card-header.type';

const CardHeader = (props: CardHeaderProps) => {
  const cardClasses = props.jssStyle?.card?.();
  const { onCollapse, handleDragMouseDown } = useContext(CardContext);

  return (
    <div
      onMouseDown={handleDragMouseDown}
      onClick={onCollapse}
      className={classNames(props.className, cardClasses?.footer)}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default CardHeader;
