//https://github.com/react-component/util/blob/master/src/React/render.ts
import type * as React from 'react';
import * as ReactDOM from 'react-dom';

type RootType = {
  render: (node: React.ReactElement) => void;
  unmount: () => void;
};

type CreateRoot = (container: Element | DocumentFragment) => RootType;

// Let compiler not to search module usage
const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
  render?: (element: React.ReactElement, container: Element | DocumentFragment) => void;
  unmountComponentAtNode?: (container: Element | DocumentFragment) => boolean;
};

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot | undefined;

const mainVersion = Number((version || '').split('.')[0]);

// React 18: createRoot 在 react-dom 主入口上可获取
if (mainVersion >= 18 && typeof fullClone.createRoot === 'function') {
  createRoot = fullClone.createRoot;
}

// React 19+: createRoot 已从主入口移除，仅在 react-dom/client 导出
// 用 import() 动态加载，CJS/ESM 产物均可用
// 使用 pendingQueue 保证 import() resolve 之前的调用不会丢失
type PendingItem = { node: React.ReactElement; container: ContainerType };
let pendingQueue: PendingItem[] | null = null;

if (!createRoot && mainVersion >= 18) {
  pendingQueue = [];
  import('react-dom/client')
    .then((client) => {
      createRoot = (client as { createRoot: CreateRoot }).createRoot;
    })
    .catch(() => {
      // 不应走到这里，但安全降级
    })
    .finally(() => {
      const queue = pendingQueue;
      pendingQueue = null;
      // 回放等待期间的调用
      queue?.forEach(({ node, container }) => ReactRender(node, container));
    });
}

function toggleWarning(skip: boolean) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

  if (
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
    typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
  ) {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
  }
}

const MARK = '__rc_react_root__';

// ========================== Render ==========================
type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: RootType;
};

function modernRender(node: React.ReactElement, container: ContainerType) {
  toggleWarning(true);
  const root = container[MARK] || createRoot!(container);
  toggleWarning(false);

  root.render(node);

  container[MARK] = root;
}

function legacyRender(node: React.ReactElement, container: ContainerType) {
  reactRender?.(node, container);
}

export function ReactRender(node: React.ReactElement, container: ContainerType) {
  // import() 尚未 resolve，入队等待回放
  if (pendingQueue !== null) {
    pendingQueue.push({ node, container });
    return;
  }

  if (createRoot) {
    modernRender(node, container);
    return;
  }

  legacyRender(node, container);
}

// ========================= Unmount ==========================
async function modernUnmount(container: ContainerType) {
  // Delay to unmount to avoid React 18 sync warning
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();

    delete container[MARK];
  });
}

function legacyUnmount(container: ContainerType) {
  unmountComponentAtNode?.(container);
}

export async function ReactUnmount(container: ContainerType) {
  // import() 尚未 resolve 时，从等待队列中移除该容器的待渲染项
  if (pendingQueue !== null) {
    pendingQueue = pendingQueue.filter((item) => item.container !== container);
    return;
  }

  if (createRoot !== undefined) {
    return modernUnmount(container);
  }

  legacyUnmount(container);
}
