import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';

const jssStyle = {
  button: useButtonStyle,
  spin: useSpinStyle,
};
const ButtonGroup = (props: ButtonGroupProps) => {
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
