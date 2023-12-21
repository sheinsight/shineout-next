import ReactDom from 'react-dom';
import { useState } from 'react';
import ModalContent from './modal-content';
import { ModalProps } from './modal.type';
import useContainer from '../absolute-list/use-container';

const Modal = (props: ModalProps) => {
  const { getRoot } = useContainer({
    container: props.container,
  });
  const [canDestroy, seCanDestroy] = useState(true);
  const root = getRoot();

  if (props.destroy && !props.visible && canDestroy) {
    return null;
  }

  const Content = <ModalContent {...props} shouldDestroy={seCanDestroy} autoShow={false} />;

  return ReactDom.createPortal(Content, root);
};

export default Modal;
