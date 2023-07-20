import { Dropdown } from '@sheinx/base';
import { useAnimationListStyle, useDropdownStyle } from '@sheinx/shineout-style';

export default () => {
  const animationListStyle = useAnimationListStyle();
  const dropdownStyle = useDropdownStyle();
  return <Dropdown animationListJssStyle={animationListStyle} jssStyle={dropdownStyle} data={[]} />;
};
