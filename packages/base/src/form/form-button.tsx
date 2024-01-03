import React from 'react';
import Button from '../button';
import { useFormFunc, usePersistFn, useFormConfig } from '@sheinx/hooks';

import type { ButtonProps } from '../button/button.type';

const FormButton = (props: ButtonProps) => {
  const formFunc = useFormFunc();
  const formConfig = useFormConfig();
  const handleClick = usePersistFn((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (formFunc && props.htmlType === 'button') {
      formFunc.submit();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  });
  const type = props.type || (props.htmlType === 'reset' ? 'default' : 'primary');
  return (
    <Button
      {...props}
      type={type}
      onClick={handleClick}
      disabled={formConfig.disabled || props.disabled}
    />
  );
};

export default FormButton;
