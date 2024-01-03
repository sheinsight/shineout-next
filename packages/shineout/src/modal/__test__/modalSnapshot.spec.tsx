import { render, fireEvent } from '@testing-library/react';
import { createClassName } from '../../tests/utils';
import ModalBase from '../__example__/01-base';
import ModalType from '../__example__/02-type';
import ModalConfirm from '../__example__/03-confirm';
import ModalFocus from '../__example__/04-focus';
import ModalFull from '../__example__/05-full';
import ModalContainer from '../__example__/06-container';
import ModalForm from '../__example__/07-form';
import ModalMove from '../__example__/08-move';
import ModalMultiple from '../__example__/09-multiple';
import ModalClose from '../__example__/10-close';
import ModalIcon from '../__example__/11-icon';
import ModalZoom from '../__example__/12-zoom';
import ModalPosition from '../__example__/13-position';

const { wrapper } = createClassName('modal', ['wrapper'], []);

const snapshotTestByClick = (component: JSX.Element, testName: string = '') => {
  test(`should render correctly ${testName}`, () => {
    const { container } = render(component);
    fireEvent.click(container.querySelector('button')!);
    expect(document.querySelector(wrapper)).toMatchSnapshot();
  });
};

describe('Modal[SnapShot]', () => {
  snapshotTestByClick(<ModalBase />);
  snapshotTestByClick(<ModalType />, 'about type');
  snapshotTestByClick(<ModalConfirm />, 'about confirm');
  snapshotTestByClick(<ModalFocus />, 'about focus');
  snapshotTestByClick(<ModalFull />, 'about full');
  snapshotTestByClick(<ModalContainer />, 'about container');
  snapshotTestByClick(<ModalForm />, 'about form');
  snapshotTestByClick(<ModalMove />, 'about move');
  snapshotTestByClick(<ModalMultiple />, 'about multiple');
  snapshotTestByClick(<ModalClose />, 'about close');
  snapshotTestByClick(<ModalIcon />, 'about icon');
  snapshotTestByClick(<ModalZoom />, 'about zoom');
  snapshotTestByClick(<ModalPosition />, 'about position');
});
