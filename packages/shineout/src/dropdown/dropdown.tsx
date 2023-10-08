import { useMemo } from 'react';
import { useButtonStyle, useDropdownStyle } from '@sheinx/shineout-style';
import { Dropdown as UnStyledDropDown } from '@sheinx/base';
import { DropdownProps } from './dropdown.type';

const Dropdown = (props: DropdownProps) => {
  const dropdownStyle = useDropdownStyle();
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(
    () => ({ dropdown: dropdownStyle, button: buttonStyle }),
    [dropdownStyle, buttonStyle],
  );
  return <UnStyledDropDown {...props} jssStyle={jssStyle} />;
};

export default Dropdown;
