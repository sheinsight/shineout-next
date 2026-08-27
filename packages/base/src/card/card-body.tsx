import classNames from 'classnames';
import { useContext } from 'react';
import { CardContext } from './card.context';
import AnimationList from '../animation-list';

import type { CardBodyProps } from './card-body.type';

const CardBody = (props: CardBodyProps) => {
  const cardClasses = props.jssStyle?.card?.();
  const { collapsible, collapsed, semClass, semStyle } = useContext(CardContext);
  const cs = classNames(props.className, cardClasses?.body, semClass?.('body'));
  const body = (
    <div className={cs} style={{ ...props.style, ...semStyle?.('body') }}>
      {props.children}
    </div>
  );
  if (collapsible) {
    return (
      <AnimationList
        className={cardClasses?.bodyCollapse}
        type={'collapse'}
        show={!collapsed}
        duration={'fast'}
      >
        {body}
      </AnimationList>
    );
  }
  return body;
};

export default CardBody;
