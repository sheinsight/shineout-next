import Modal, { methods } from './modal';
import Submit from './submit';

type RefModal = typeof Modal;
type RefModalMethods = typeof methods;
type RefSubmit = typeof Submit;

export interface SubmitComponent extends RefSubmit {
  displayName: string;
}
export interface ModalComponent extends RefModal, RefModalMethods {
  displayName: string;
  Submit: RefSubmit;
}

const SubmitComp: SubmitComponent = Submit as SubmitComponent;

const ModalComp: ModalComponent = Object.assign(Modal, methods as any) as ModalComponent;
SubmitComp.displayName = 'ShineoutModalSubmit';

ModalComp.displayName = 'ShineoutModal';
ModalComp.Submit = SubmitComp;

export default ModalComp;
