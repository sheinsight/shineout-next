import clsx from 'clsx';
import { usePersistFn } from '@sheinx/hooks';
import { useState, useMemo, useRef } from 'react';
import { CardAccordionContext } from './card-accordion-context';

import type { CardAccordionProps } from './card-accordion.type';

const CardAccordion = <T,>(props: CardAccordionProps<T>) => {
  const cardClasses = props.jssStyle?.card?.();
  const { current: context } = useRef({
    id: 0,
  });
  const [activeId, setActiveId] = useState(props.defaultActive);
  const getDefaultId = usePersistFn(() => {
    const id = context.id;
    context.id++;
    return id;
  });

  const onActiveChange = usePersistFn((id: any) => {
    const result = id === activeId ? null : id;
    props.onChange?.(result);
    setActiveId(result);
  });
  const contextValue = useMemo(() => {
    return {
      activeId,
      onActiveChange,
      getDefaultId,
      inAccordion: true,
    };
  }, [activeId]);

  return (
    <div className={clsx(props.className, cardClasses?.accordion)}>
      <CardAccordionContext.Provider value={contextValue}>
        {props.children}
      </CardAccordionContext.Provider>
    </div>
  );
};

export default CardAccordion;
