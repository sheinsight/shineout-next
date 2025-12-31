import clsx from 'clsx';
import { CardContext } from './card.context';
import { useContext } from 'react';

import type { CardHeaderProps } from './card-header.type';

const CardHeader = (props: CardHeaderProps) => {
  const { align = 'right' } = props;
  const cardClasses = props.jssStyle?.card?.();
  const { onCollapse, handleDragMouseDown } = useContext(CardContext);

  const footerClassName = clsx(
    props.className,
    align === 'center' && cardClasses?.center,
    align === 'right' && cardClasses?.right,
    cardClasses?.footer,
  );

  return (
    <div
      onMouseDown={handleDragMouseDown}
      onClick={onCollapse}
      className={footerClassName}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default CardHeader;
