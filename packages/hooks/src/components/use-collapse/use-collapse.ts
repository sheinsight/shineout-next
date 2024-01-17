import React, { useState } from 'react';
import type { BaseCollapseProps } from './use-collapse.type';
import { isFunc } from '../../utils/is';

const getCurrentActive = (active: BaseCollapseProps['active'], accordion?: boolean): string[] => {
  // @ts-ignore
  const res = [].concat(active) as string[];
  if (accordion) return res.slice(0, 1);
  return res;
};

const useCollapse = (props: BaseCollapseProps) => {
  const { defaultActive, active, accordion, onChange } = props;
  const [currentActive, setCurrentActive] = useState<string[]>(
    getCurrentActive(defaultActive, accordion) || [],
  );

  const getCurrentValue = () => {
    if (active !== undefined) return getCurrentActive(active, accordion);
    return currentActive;
  };

  const handleChange = (newActive: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const currentActive = getCurrentValue() || [];
    const isActive = currentActive.includes(newActive);

    const newCurrentActive = isActive
      ? currentActive.filter((item) => item !== newActive)
      : accordion
      ? [newActive]
      : [...currentActive, newActive];

    if (active === undefined) setCurrentActive(newCurrentActive);
    if (isFunc(onChange)) onChange?.(newActive, newCurrentActive, event);
  };

  return {
    active: getCurrentValue(),
    onChange: handleChange,
  };
};

export default useCollapse;
