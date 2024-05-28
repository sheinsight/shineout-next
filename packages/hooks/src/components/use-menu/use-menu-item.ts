import { useEffect, useRef, useState } from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { getUidStr } from '../../utils/uid';

import type { UseMenuItemProps, UpdateFunc } from './use-menu.type';

const useMenuItem = (props: UseMenuItemProps) => {
  const { current: context } = useRef({
    id: '',
    timer: null as NodeJS.Timeout | null,
  });
  const { parentId = '', dataItem } = props;
  const isLeaf = ((dataItem || {}).children || []).length === 0;

  if (!context.id) {
    context.id = `${parentId},${getUidStr()}`;
  }
  const gopenKeySet = new Set(props.openKeys);
  const isDisabled =
    (dataItem && dataItem.disabled) ||
    (typeof props.disabled === 'function' ? props.disabled(dataItem) : !!props.disabled);
  const expandAble = dataItem.children && (props.looseChildren || dataItem.children.length > 0);
  const [isChecked, setChecked] = useState(false);
  const [isInPath, setInPath] = useState(false);
  const [isUp, setIsUp] = useState(false);

  const update: UpdateFunc = usePersistFn((getStatus) => {
    const status = getStatus(context.id, props.dataItem);
    if (isChecked !== status.isChecked) {
      setChecked(status.isChecked);
    }
    if (isInPath !== status.isInPath) {
      setInPath(status.isInPath);
    }
  });

  const handleItemClick = usePersistFn((e: React.MouseEvent) => {
    if (expandAble && !props.parentSelectable) {
      if (props.mode === 'inline') {
        props.onOpenChange((before) => {
          const openKeySet = new Set(before);
          if (openKeySet.has(props.keyResult)) {
            openKeySet.delete(props.keyResult);
          } else {
            openKeySet.add(props.keyResult);
          }
          return Array.from(openKeySet);
        });
      }
    } else {
      if (isDisabled) return;
      if (typeof dataItem.onClick === 'function') {
        dataItem.onClick(dataItem);
      }
      props.changeActiveId(context.id);
      if (props.onClick) {
        props.onClick(dataItem);
      }
    }
    // 阻止冒泡
    if (!isLeaf) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  });

  const handleExpandClick = usePersistFn((e: React.MouseEvent) => {
    e.stopPropagation();
    if (expandAble && props.mode === 'inline') {
      props.onOpenChange((before) => {
        const openKeySet = new Set(before);
        if (openKeySet.has(props.keyResult)) {
          openKeySet.delete(props.keyResult);
        } else {
          openKeySet.add(props.keyResult);
        }
        return Array.from(openKeySet);
      });
    }
  });

  const handleMouseLeave = usePersistFn(() => {
    // if (expandAble && props.mode !== 'inline') {
    // if (context.timer) {
    //   clearTimeout(context.timer);
    //   context.timer = null;
    // }
    // context.timer = setTimeout(() => {
    //   props.onOpenChange((before) => {
    //     const openKeySet = new Set(before);
    //     openKeySet.delete(props.keyResult);
    //     return Array.from(openKeySet);
    //   });
    // }, toggleDuration);
    // document.removeEventListener('click', handleMouseLeave);
    // }
  });

  const handleMouseEnter = usePersistFn((e: React.MouseEvent) => {
    if (expandAble && props.mode !== 'inline') {
      // if (context.timer) {
      //   clearTimeout(context.timer);
      //   context.timer = null;
      // }
      let up = false;
      if (props.mode === 'vertical-auto' && props.scrollRef?.current) {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const scrollRect = props.scrollRef.current?.getBoundingClientRect();
        const topLine = scrollRect?.top;
        const bottomLine = scrollRect?.bottom;
        up = rect.bottom - topLine > (bottomLine - topLine) / 2;
      }
      if (isUp !== up) {
        setIsUp(up);
      }
      // props.onOpenChange((before) => {
      //   const openKeySet = new Set(before);
      //   openKeySet.add(props.keyResult);
      //   return Array.from(openKeySet);
      // });
      // document.addEventListener('click', handleMouseLeave);
    }
  });

  useEffect(() => {
    props.bindUpdate(context.id, update);
    return () => {
      props.unbindUpdate(context.id);
    };
  }, []);

  return {
    id: context.id,
    isChecked,
    isInPath,
    isOpen: gopenKeySet.has(props.keyResult),
    isDisabled,
    expandAble,
    isUp,
    handleItemClick,
    handleMouseEnter,
    handleMouseLeave,
    handleExpandClick,
    isLeaf,
  };
};

export default useMenuItem;
