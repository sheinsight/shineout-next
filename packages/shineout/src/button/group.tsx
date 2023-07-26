import { ButtonGroupProps } from './group.type';
import { ButtonGroup as UnStyledButtonGroup } from '@sheinx/base';
import { useButtonGroupStyle } from '@sheinx/shineout-style';
import { useMemo } from 'react';

const ButtonGroup = (props: ButtonGroupProps) => {
  const buttonGroupStyle = useButtonGroupStyle();
  const jssStyle = useMemo(() => ({ buttonGroup: buttonGroupStyle }), [buttonGroupStyle]);
  return <UnStyledButtonGroup {...props} jssStyle={jssStyle} />;
};

export default ButtonGroup;
