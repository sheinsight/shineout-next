import React, { useEffect, useState, useRef } from 'react';
import { util } from '@sheinx/hooks';

const { addStack, removeStack } = util;

export interface LazyloadProps {
  children?: React.ReactNode;
  placeholder?: React.ReactNode;
  container?: HTMLElement | null;
  offset?: number;
  isInView?: boolean;
}

const Lazyload = (props: LazyloadProps) => {
  const [ready, setReady] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (ready) return;
    const lazyId = addStack({
      offset: props.offset || 0,
      container: props.container,
      element: placeholderRef.current!,
      render: () => {
        setReady(true);
      },
    });
    return () => {
      removeStack(lazyId);
    };
  }, []);

  if (ready && props.isInView) return <>{props.children}</>;
  return (
    <span ref={placeholderRef} style={{ border: '1px solid transparent' }}>
      {props.placeholder}
    </span>
  );
};

export default Lazyload;
