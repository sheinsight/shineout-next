import classNames from 'classnames';
import { CardContext } from './card.context';
import { useContext } from 'react';

import type { CardHeaderProps } from './card-header.type';

const CardFooter = (props: CardHeaderProps) => {
  const { align = 'right' } = props;
  const cardClasses = props.jssStyle?.card?.();
  const { onCollapse, handleDragMouseDown, semClass, semStyle } = useContext(CardContext);

  const footerClassName = classNames(
    props.className,
    align === 'center' && cardClasses?.center,
    align === 'right' && cardClasses?.right,
    cardClasses?.footer,
    semClass?.('footer', []),
  );

  return (
    <div
      onMouseDown={handleDragMouseDown}
      onClick={onCollapse}
      className={footerClassName}
      style={{ ...props.style, ...semStyle?.('footer') }}
    >
      {props.children}
    </div>
  );
};

export default CardFooter;
