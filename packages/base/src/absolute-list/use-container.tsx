import React, { useEffect } from 'react';
import { usePersistFn, util } from '@sheinx/hooks';
import { getDefaultContainer } from '../config';

let root: HTMLDivElement;

export interface ContainerProps {
  container?: HTMLElement | null | (() => HTMLElement | null);
}
const useContainer = (props: ContainerProps = {}) => {
  const { current: context } = React.useRef({ element: null as HTMLDivElement | null });
  const getContainer = usePersistFn(() => {
    {
      let container = typeof props.container === 'function' ? props.container() : props.container;
      if (container && util.isInDocument(container)) return container;

      return getDefaultContainer();
    }
  });

  function getRoot() {
    const container = getContainer();
    const defaultContainer = getDefaultContainer();
    if (container !== defaultContainer) return container;
    if (!root || util.isInDocument(root) === false) {
      root = document.createElement('div');
      root.setAttribute('style', 'contain: size');
    }
    if (root.parentElement !== defaultContainer) {
      defaultContainer.appendChild(root);
    }
    return root;
  }

  const getElement = usePersistFn(() => {
    if (!context.element) {
      context.element = document.createElement('div');
    }
    const root = getRoot();
    if (context.element.parentElement !== root) {
      root.appendChild(context.element);
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
    getElement,
    getContainer,
    unMount,
  };
};

export default useContainer;
