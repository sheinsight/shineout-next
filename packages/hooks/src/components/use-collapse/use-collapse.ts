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

  const handleChange = (active: string, event: React.ChangeEvent<Element>) => {
    let newCurrentActive = [...(getCurrentValue() || [])];
    const key = currentActive.indexOf(active);
    if (accordion) newCurrentActive = [active];
    else if (key > -1) newCurrentActive.splice(key, 1);
    else newCurrentActive.push(active);

    if (active === undefined) setCurrentActive(newCurrentActive);
    if (isFunc(onChange)) onChange?.(active, newCurrentActive, event);
  };

  return {
    active: getCurrentValue(),
    onChange: handleChange,
  };
};

export default useCollapse;
