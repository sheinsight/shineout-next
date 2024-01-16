import React from 'react';
import { usePersistFn } from '@sheinx/hooks';

import Button from '../button/button';
import { useFormFooter } from '../form/form-footer-context';

import type { ButtonProps } from '../button/button.type';

const ModalSubmit = (props: ButtonProps) => {
  const modalFormContext = useFormFooter();
  const handleClick = usePersistFn((e: React.MouseEvent) => {
    props.onClick?.(e);
    modalFormContext?.func.submit();
  });
  return (
    <Button
      htmlType='button'
      type='primary'
      loading={modalFormContext?.formStats === 'pending'}
      disabled={modalFormContext?.formStats === 'disabled'}
      {...props}
      onClick={handleClick}
    />
  );
};

export default ModalSubmit;
