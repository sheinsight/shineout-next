import React from 'react';
import Button from '../button';
import { useWithFormConfig } from '../common/use-with-form-config';
import { useFormFunc, usePersistFn } from '@sheinx/hooks';

import type { ButtonProps } from '../button/button.type';

const FormButton = (props: ButtonProps) => {
  const formFunc = useFormFunc();
  const { disabled, size } = useWithFormConfig(props);
  const handleClick = usePersistFn((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (formFunc && props.htmlType === 'button') {
      formFunc.submit();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  });
  const type = props.type || (props.htmlType === 'reset' ? 'default' : 'primary');
  return <Button {...props} type={type} onClick={handleClick} disabled={disabled} size={size} />;
};

export default FormButton;
