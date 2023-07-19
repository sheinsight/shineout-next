import { useAnimationListStyle, useButtonStyle, useDropdownStyle } from '@sheinx/shineout-style';
import { Dropdown as UnStyledDropDown } from '@sheinx/base';
import { DropdownProps } from './dropdown.type';

const Dropdown = (props: DropdownProps) => {
  const jssStyle = useDropdownStyle();
  const animationListJssStyle = useAnimationListStyle();
  const buttonJssStyle = useButtonStyle();
  return (
    <UnStyledDropDown
      {...props}
      jssStyle={jssStyle}
      animationListJssStyle={animationListJssStyle}
      buttonJssStyle={buttonJssStyle}
    />
  );
};

export default Dropdown;
