import React, { useContext, useEffect, useLayoutEffect, useMemo, useState, } from 'react';
import { useInView, usePersistFn } from '@sheinx/hooks';
import classNames from 'classnames';
import { CardGroupContext } from './card-group-context';
import Lazyload from './lazyload';
import Checkbox from '../checkbox/checkbox';

import type { CardGroupItemProps } from './item.type';

const Item = <V,>(props: CardGroupItemProps<V>) => {
  const { container } = useContext(CardGroupContext);
  const classes = props.jssStyle?.cardGroup?.();
  const { ref: itemRef, isInView: itemIsInView, wasInView } = useInView<HTMLDivElement>({
    root: container,
    rootMargin: `${props.lazyLoadOffset || container?.clientHeight || 100}px`,
  });
  const isInView = props.placeholder ? itemIsInView : true;
  const [itemHeight, setItemHeight] = useState(0);

  const handleChange = usePersistFn((_: any, checked: boolean) => {
    if (props.onChange) props.onChange(checked, props.value!);
  });

  const renderChildren = (content: React.ReactNode) => {
    if (!props.placeholder) return content;
    if (!container) return content;
    return (
      <Lazyload container={container} placeholder={props.placeholder} isInView={isInView}>
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

  useLayoutEffect(() => {
    if(isInView){
      setItemHeight(itemRef.current?.offsetHeight || 0);
    }
  }, [isInView])

  const hiddenStyle = useMemo(() => !isInView && wasInView && itemHeight ? ({
    height: itemHeight,
    overflow: 'hidden',
    visibility: isInView ? 'visible' : 'hidden',
  }) : undefined, [isInView, itemHeight])

  const itemStyle = useMemo(() => {
    return hiddenStyle ? {
      ...props.style,
      ...hiddenStyle,
    } as React.CSSProperties : props.style;
  }, [hiddenStyle, props.style]);

  return (
    <div ref={itemRef} className={cls} style={itemStyle}>
      {renderChildren(content)}
    </div>
  );
};

export default Item;
