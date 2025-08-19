import React, { useEffect } from 'react';
import { usePersistFn, util } from '@sheinx/hooks';
import { getDefaultContainer } from '../config';

let root: HTMLDivElement | null = null;

export interface ContainerProps {
  container?: HTMLElement | null | (() => HTMLElement | null);
  containerClassName?: string
}

export const getContainer = (props: ContainerProps) => {
  {
    let container = typeof props.container === 'function' ? props.container() : props.container;
    if (container && util.isInDocument(container)) return container;
    return getDefaultContainer();
  }
};

export const getRootContainer = (props: ContainerProps) => {
  const container = getContainer(props);
  const defaultContainer = getDefaultContainer();
  if (container !== defaultContainer) return container;
  if (!root || util.isInDocument(root) === false) {
    root = document.createElement('div');
    root.setAttribute('style', 'contain: size');
    if (defaultContainer) {
      defaultContainer.appendChild(root);
    }
  }
  if (
    util.isBrowser() &&
    defaultContainer &&
    // body在微前端会被劫持导致死循环
    defaultContainer !== document.body &&
    root.parentElement !== defaultContainer
  ) {
    defaultContainer.appendChild(root);
  }

  return root;
};

export const getRoot = (props: ContainerProps) => {
  const rootContainer = getRootContainer(props);
  if (!rootContainer) return null;
  if (!util.isBrowser()) return null;
  const root = document.createElement('div');
  rootContainer.appendChild(root);
  return root;
};

const useContainer = (props: ContainerProps = {}) => {
  const { current: context } = React.useRef({ element: null as HTMLDivElement | null });
  const getContainerFn = usePersistFn(() => getContainer(props));

  const getRoot = usePersistFn(() => {
    if (!util.isBrowser()) return null;
    if (!context.element) {
      context.element = document.createElement('div');
      context.element.setAttribute(
        'style',
        'position: absolute; top: 0px; left: 0px; width: 100%;',
      );
      if (props.containerClassName) {
        context.element.classList.add(props.containerClassName)
      }
    }
    const rootContainer = getRootContainer(props);
    if (rootContainer && context.element.parentElement !== rootContainer) {
      rootContainer.appendChild(context.element);
    }
    return context.element;
  });

  const unMount = usePersistFn(() => {
    if (context.element) {
      context.element.remove();
    }
  });

  useEffect(() => {
    return unMount;
  }, []);

  return {
    getRoot,
    getContainer: getContainerFn,
    unMount,
  };
};

export default useContainer;
