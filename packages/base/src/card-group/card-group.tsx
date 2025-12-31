import { useRender, usePersistFn } from '@sheinx/hooks';
import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { CardGroupContext } from './card-group-context';

import type { CardGroupProps } from './card-group.type';

const CardGroup = (props: CardGroupProps) => {
  // @ts-ignore gap 属性以被重命名了
  const { columns = 3, gap = 16 } = props;
  const classes = props.jssStyle?.cardGroup?.();
  const render = useRender();
  const { current: context } = useRef({
    scrollEl: null as HTMLDivElement | null,
  });

  const getGap = () => {
    if (props.gutter !== undefined) return props.gutter;
    return gap;
  };
  const handleScrollRef = usePersistFn((el: HTMLDivElement | null) => {
    if (!el) return;
    if (context.scrollEl === el) return;
    context.scrollEl = el;
    render();
  });

  const contextValue = useMemo(
    () => ({
      container: context.scrollEl,
    }),
    [context.scrollEl],
  );

  const renderBody = () => {
    if (!props.children) return null;
    const gap = getGap();
    const gridStyle = {
      gridRowGap: gap,
      gridColumnGap: gap,
      ...props.gridStyle,
      gridTemplateColumns:
        props.cardWidth !== undefined
          ? `repeat(auto-fill, minmax(${props.cardWidth}px, 1fr))`
          : `repeat(${columns}, 1fr)`,
    };
    return (
      <CardGroupContext.Provider value={contextValue}>
        <div className={classes?.scroller} ref={handleScrollRef}>
          <div style={gridStyle} className={classes?.grid}>
            {context.scrollEl && props.children}
          </div>
        </div>
      </CardGroupContext.Provider>
    );
  };

  return (
    <div
      className={clsx(props.className, classes?.rootClass, classes?.wrapper)}
      style={{
        height: props.height,
        ...props.style,
      }}
    >
      {renderBody()}
    </div>
  );
};

export default CardGroup;
