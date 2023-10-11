import { useButtonStyle, useDropdownStyle } from '@sheinx/shineout-style';
import { Dropdown as UnStyledDropDown } from '@sheinx/base';
import { DropdownProps } from './dropdown.type';

const jssStyle = {
  dropdown: useDropdownStyle,
  button: useButtonStyle,
};
const Dropdown = (props: DropdownProps) => {
  return <UnStyledDropDown {...props} jssStyle={jssStyle} />;
};

export default Dropdown;
