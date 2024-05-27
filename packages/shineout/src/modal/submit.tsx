import { ModalSubmit } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
import { ButtonProps } from '../button/button.type';

const jssStyle = {
  button: useButtonStyle,
  spin: useSpinStyle,
};

const Submit = (props: ButtonProps) => {
  return <ModalSubmit jssStyle={jssStyle} {...props} />;
};

export default Submit;
