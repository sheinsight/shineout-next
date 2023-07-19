import { useDropdownStyle, useAnimationListStyle } from '@sheinx/shineout-style';
import { Dropdown as UnStyledDropDown } from '@sheinx/base';
import { DropdownProps } from './dropdown.type';

const Dropdown = (props: DropdownProps) => {
  const jssStyle = useDropdownStyle();
  const animationListJssStyle = useAnimationListStyle();
  return (
    <UnStyledDropDown
      {...props}
      jssStyle={jssStyle}
      animationListJssStyle={animationListJssStyle}
    />
  );
};

export default Dropdown;
