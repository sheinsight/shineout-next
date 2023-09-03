import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonStyle, useSpinStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const ButtonGroup = (props: ButtonGroupProps) => {
  const buttonStyle = useButtonStyle();
  const spinStyle = useSpinStyle();
  const jssStyle = useMemo(
    () => ({ button: buttonStyle, spin: spinStyle }),
    [buttonStyle, spinStyle],
  );
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
