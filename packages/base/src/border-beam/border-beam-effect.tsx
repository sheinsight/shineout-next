import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

export interface BorderBeamEffectProps {
  host: HTMLElement | null;
  rootClassName?: string;
  beamClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BorderBeamEffect = ({
  host,
  rootClassName,
  beamClassName,
  className,
  style,
}: BorderBeamEffectProps) => {
  if (!host) return null;
  return createPortal(
    <div
      aria-hidden='true'
      className={classNames(rootClassName, beamClassName, className)}
      style={style}
    />,
    host,
  );
};

export default BorderBeamEffect;
