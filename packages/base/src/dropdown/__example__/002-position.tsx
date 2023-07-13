import { DropDown } from '@sheinx/base';
import { useAnimationListStyle, useDropdownStyle } from '@sheinx/shineout-style';

export default () => {
  const animationListStyle = useAnimationListStyle();
  const dropdownStyle = useDropdownStyle();
  return <DropDown animationListJssStyle={animationListStyle} jssStyle={dropdownStyle} data={[]} />;
};
