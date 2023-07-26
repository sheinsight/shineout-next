import { useMemo } from 'react';
import { useAnimationListStyle, useButtonStyle, useDropdownStyle } from '@sheinx/shineout-style';
import { Dropdown as UnStyledDropDown } from '@sheinx/base';
import { DropdownProps } from './dropdown.type';

const Dropdown = (props: DropdownProps) => {
  const dropdownStyle = useDropdownStyle();
  const animationListStyle = useAnimationListStyle();
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(
    () => ({ dropdown: dropdownStyle, animationList: animationListStyle, button: buttonStyle }),
    [dropdownStyle, animationListStyle, buttonStyle],
  );
  return <UnStyledDropDown {...props} jssStyle={jssStyle} />;
};

export default Dropdown;
