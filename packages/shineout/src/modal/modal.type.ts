import { ModalProps as UnStyledModalProps, ModalOptions } from '@sheinx/base';

export type ModalProps = Omit<UnStyledModalProps, 'jssStyle'>;

export type ModalFunctionOptions = Omit<ModalOptions, 'jssStyle'>;
