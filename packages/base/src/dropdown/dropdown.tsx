import React from 'react';
import DropdownIn from './dropdownIn';
import { DropdownProps } from './dropdown.type';

// 过滤内部属性
const Dropdown = (props: DropdownProps) => {
  return <DropdownIn {...props} isSub={false} closePop={undefined} />;
};

export default Dropdown;
