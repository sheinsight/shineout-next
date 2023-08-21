import type * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';
import { createRoot as createRootOrigin } from 'react-dom/client';

const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  createRoot?: CreateRoot;
};

const MARK = '__sheinout_root__';

type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root;
};

type CreateRoot = (container: ContainerType) => Root;

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot;

try {
  const mainVersion = Number((version || '').split('.')[0]);
  if (mainVersion >= 18) {
    createRoot = createRootOrigin;
  }
} catch (e) {
  // Nothing;
}

const modernRender = (node: React.ReactElement, container: ContainerType) => {
  const root = container[MARK] || createRoot(container);

  root.render(node);

  container[MARK] = root;
};

const legacyRender = (node: React.ReactElement, container: ContainerType) => {
  reactRender(node, container);
};

export const ReactRender = (node: React.ReactElement, container: ContainerType) => {
  // @ts-ignore
  if (createRoot) {
    modernRender(node, container);
    return;
  }

  legacyRender(node, container);
};

const modernUnmount = async (container: ContainerType) => {
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();

    delete container[MARK];
  });
};

const legacyUnmount = (container: ContainerType) => {
  unmountComponentAtNode(container);
};

export const ReactUnmount = (container: ContainerType) => {
  if (createRoot !== undefined) {
    return modernUnmount(container);
  }

  legacyUnmount(container);
};
