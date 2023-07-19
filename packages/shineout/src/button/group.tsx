import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonGroupStyle } from '@sheinx/shineout-style';

const ButtonGroup = (props: ButtonGroupProps) => {
  const jssStyle = useButtonGroupStyle();
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
