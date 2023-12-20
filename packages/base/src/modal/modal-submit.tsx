import React, { useContext } from 'react';
import { usePersistFn } from '@sheinx/hooks';

import Button from '../button/button';
import { ModalFormContext } from './modal-context';

import type { ButtonProps } from '../button/button.type';

const ModalSubmit = (props: ButtonProps) => {
  const modalFormContext = useContext(ModalFormContext);
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
