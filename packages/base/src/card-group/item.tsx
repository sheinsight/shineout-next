import React, { useContext, useRef, useEffect, useState } from 'react';
import { useInView, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { CardGroupContext } from './card-group-context';
import Lazyload from './lazyload';
import Checkbox from '../checkbox/checkbox';

import type { CardGroupItemProps } from './item.type';

const Item = <V,>(props: CardGroupItemProps<V>) => {
  const { container } = useContext(CardGroupContext);
  const classes = props.jssStyle?.cardGroup?.();
  const [isInViewState, setIsInView] = useState(false);

  const { ref: itemRef, isInView: isInViewRef } = useInView<HTMLDivElement>({
    rootMargin: `${container?.offsetHeight || 500}px`,
    root: container,
    threshold: [0, 1],
    once: true,
  });

  useEffect(() => {
    if (isInViewRef) {
      setIsInView(true);
    }
  }, [isInViewRef]);

  const handleChange = usePersistFn((_: any, checked: boolean) => {
    if (props.onChange) props.onChange(checked, props.value!);
  });

  const renderChildren = (content: React.ReactNode) => {
    if (!props.placeholder) return content;
    return (
      <Lazyload container={container} placeholder={props.placeholder} isInView={isInViewState}>
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

  const hiddenStyle = isInViewState ? undefined : { visibility: 'hidden' };
  const itemStyle = { ...props.style, ...hiddenStyle } as React.CSSProperties;

  return (
    <div ref={itemRef} className={cls} style={itemStyle}>
      {renderChildren(content)}
    </div>
  );
};

export default Item;
