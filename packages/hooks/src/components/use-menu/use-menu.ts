import { useRef, useEffect } from 'react';
import useRender from '../../common/use-render';
import useInputAble from '../../common/use-input-able';
import usePersistFn from '../../common/use-persist-fn';

import type { UseMenuProps, UpdateFunc } from './use-menu.type';
import type { KeygenResult } from '../../common/type';

const useMenu = (props: UseMenuProps) => {
  const { current: context } = useRef({
    updateMap: new Map<string, UpdateFunc>(),
    activeId: '',
    cachedOpenKeys: props.openKeys || [],
  });

  const render = useRender();

  const changeActiveId = usePersistFn((id: string) => {
    if (context.activeId !== id) {
      context.activeId = id;
      render();
    }
  });
  const { value, onChange } = useInputAble({
    value: props.openKeys,
    defaultValue: props.defaultOpenKeys,
    onChange: props.onOpenChange,
    control: props.openKeys !== undefined,
    beforeChange: undefined,
  });
  context.cachedOpenKeys = value || [];

  const changeOpenKeys = usePersistFn((cb: (before: KeygenResult[]) => KeygenResult[]) => {
    const newKeys = cb(context.cachedOpenKeys);
    context.cachedOpenKeys = newKeys;
    onChange(newKeys);
  });

  const checkActive = usePersistFn((id: string, dataItem: any) => {
    const act =
      typeof props.active === 'function' ? props.active(dataItem) : id === context.activeId;
    if (typeof props.active === 'function') {
      if (act && context.activeId !== id) {
        context.activeId = id;
      }
      if (!act && context.activeId === id) {
        context.activeId = '';
      }
    }
    return act;
  });

  const checkInPath = usePersistFn((id: string) => {
    if (!context.activeId || !id) return false;
    return context.activeId.indexOf(id) >= 0;
  });

  const getStatus = usePersistFn((id: string, d: any) => {
    const isChecked = checkActive(id, d);
    const isInPath = checkInPath(id);
    return {
      isChecked,
      isInPath,
    };
  });

  const update = usePersistFn(() => {
    context.updateMap.forEach((updateItem) => {
      updateItem(getStatus);
    });
  });

  const bindUpdate = (id: string, updateItem: UpdateFunc) => {
    context.updateMap.set(id, updateItem);
  };

  const unbindUpdate = (id: string) => {
    context.updateMap.delete(id);
  };
  useEffect(() => {
    update();
  });

  return {
    openKeys: value,
    onOpenChange: changeOpenKeys,
    bindUpdate,
    unbindUpdate,
    changeActiveId,
  };
};

export default useMenu;
