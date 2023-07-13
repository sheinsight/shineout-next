import { DropDown } from '@sheinx/base';
import { useAnimationListStyle, useDropdownStyle } from '@sheinx/shineout-style';

export default () => {
  const animationListStyle = useAnimationListStyle();
  const dropdownStyle = useDropdownStyle();
  return (
    <DropDown
      position={'top-left'}
      animationListJssStyle={animationListStyle}
      jssStyle={dropdownStyle}
      data={[]}
    />
  );
};
