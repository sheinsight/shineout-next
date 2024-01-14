import React, { useContext } from 'react';
import { usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { CardGroupContext } from './card-group-context';
import Lazyload from './lazyload';
import Checkbox from '../checkbox/checkbox';

import type { CardGroupItemProps } from './item.type';

const Item = <V,>(props: CardGroupItemProps<V>) => {
  const { container } = useContext(CardGroupContext);
  const classes = props.jssStyle?.cardGroup?.();

  const handleChange = usePersistFn((_: any, checked: boolean) => {
    if (props.onChange) props.onChange(checked, props.value!);
  });

  const renderChildren = (content: React.ReactNode) => {
    if (!props.placeholder) return content;
    if (!container) return content;
    return (
      <Lazyload container={container} placeholder={props.placeholder}>
        {content}
      </Lazyload>
    );
  };

  const cls = classNames(props.className, classes?.item);
  const showCheck = props.checked !== undefined;

  const content = (
    <>
      {props.children}
      {!!showCheck && (
        <Checkbox
          jssStyle={props.jssStyle}
          checked={props.checked}
          disabled={props.disabled}
          onChange={handleChange}
          className={classes?.checkbox}
        />
      )}
    </>
  );

  return (
    <div className={cls} style={props.style}>
      {renderChildren(content)}
    </div>
  );
};

export default Item;
