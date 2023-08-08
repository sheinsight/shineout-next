import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const ButtonGroup = (props: ButtonGroupProps) => {
  const buttonStyle = useButtonStyle();
  const jssStyle = useMemo(() => ({ button: buttonStyle }), [buttonStyle]);
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
