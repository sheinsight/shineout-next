import React from 'react';

const FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
const MEMO_TYPE = Symbol.for('react.memo');

const canAcceptRefType = (type: unknown): boolean => {
  if (typeof type === 'string') return true;
  if (typeof type === 'function') {
    return Boolean(
      (type as { prototype?: { isReactComponent?: unknown } }).prototype?.isReactComponent,
    );
  }
  if (!type || typeof type !== 'object') return false;
  const candidate = type as { $$typeof?: symbol; type?: unknown };
  if (candidate.$$typeof === FORWARD_REF_TYPE) return true;
  return candidate.$$typeof === MEMO_TYPE ? canAcceptRefType(candidate.type) : false;
};

const getReactMajorVersion = () => Number.parseInt(React.version, 10);

export const canElementAcceptRef = (
  element: React.ReactElement,
  reactMajorVersion = getReactMajorVersion(),
): boolean => {
  if (element.type === React.Fragment) return false;
  return reactMajorVersion >= 19 || canAcceptRefType(element.type);
};

const getElementRef = (element: React.ReactElement) => {
  return getReactMajorVersion() >= 19
    ? (element.props as { ref?: React.Ref<unknown> }).ref
    : (element as React.ReactElement & { ref?: React.Ref<unknown> }).ref;
};

const toHost = (node: unknown) => {
  const candidate =
    node && typeof node === 'object' && 'nativeElement' in node
      ? (node as { nativeElement?: unknown }).nativeElement
      : node;

  return typeof HTMLElement !== 'undefined' && candidate instanceof HTMLElement
    ? candidate
    : null;
};

type RefCleanup = () => void;
type CleanupRef<T> = (instance: T | null) => void | RefCleanup;
type CompatibleRef<T> = React.Ref<T> | CleanupRef<T> | null | undefined;

export const mergeRefs = <T>(...refs: CompatibleRef<T>[]) => {
  return (node: T | null): void | RefCleanup => {
    const callbackRefsWithoutCleanup: CleanupRef<T>[] = [];
    const objectRefs: React.MutableRefObject<T | null>[] = [];
    const cleanups: RefCleanup[] = [];

    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        const cleanup = (ref as CleanupRef<T>)(node);
        if (typeof cleanup === 'function') {
          cleanups.push(cleanup);
        } else {
          callbackRefsWithoutCleanup.push(ref as CleanupRef<T>);
        }
      } else if (ref) {
        const objectRef = ref as React.MutableRefObject<T | null>;
        objectRef.current = node;
        objectRefs.push(objectRef);
      }
    });

    if (!cleanups.length) return;

    return () => {
      let error: unknown;
      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch (cleanupError) {
          error ||= cleanupError;
        }
      });
      callbackRefsWithoutCleanup.forEach((ref) => ref(null));
      objectRefs.forEach((ref) => {
        ref.current = null;
      });
      if (error) throw error;
    };
  };
};

const useChildDom = (children: React.ReactNode): [React.ReactNode, HTMLElement | null] => {
  const [host, setHost] = React.useState<HTMLElement | null>(null);
  const child = React.isValidElement(children) ? children : null;
  const canAcceptRef = Boolean(child && canElementAcceptRef(child));
  const childRef = child && canAcceptRef ? getElementRef(child) : undefined;
  const internalRef = React.useCallback((node: unknown) => {
    const nextHost = toHost(node);
    setHost((currentHost) => (currentHost === nextHost ? currentHost : nextHost));
  }, []);
  const mergedRef = React.useMemo(() => mergeRefs<unknown>(childRef, internalRef), [childRef]);

  if (!child || !canAcceptRef) return [children, null];

  return [
    React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
      ref: mergedRef,
    }),
    host,
  ];
};

export default useChildDom;
