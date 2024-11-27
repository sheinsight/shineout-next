import React from 'react';
import { util } from '@sheinx/hooks';
import DropdownIn from './dropdownIn';
import { DropdownProps } from './dropdown.type';

const { devUseWarning } = util;

// 过滤内部属性
const Dropdown = (props: DropdownProps) => {
  if (props.outline) {
    devUseWarning.deprecated('outline', 'mode="outline"', 'Dropdown');
  }
  return <DropdownIn {...props} isSub={false} closePop={undefined} />;
};

export default Dropdown;
