import { ModalProps } from './modal.type';

export interface ModalContentProps extends ModalProps {
  shouldDestroy: (state: boolean) => void;
  autoShow: boolean;
}
