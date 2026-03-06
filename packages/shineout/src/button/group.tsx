import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonStyle, useButtonGroupStyle, useSpinStyle } from '@sheinx/shineout-style';

const jssStyle = {
  button: useButtonStyle,
  buttonGroup: useButtonGroupStyle,
  spin: useSpinStyle,
};
const ButtonGroup = (props: ButtonGroupProps) => {
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
