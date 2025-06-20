import React, { useLayoutEffect, useRef } from 'react'

interface Props {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function MenuItem(props: Props) {
  const elementRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    if (props.active) {
      elementRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: "nearest",
      });
    }
  }, [props.active])

  return (
    <li
      ref={elementRef}
      onClick={props.onClick}
      className={props.active? 'active' : ''}
    >
      {props.children}
    </li>
  )
}