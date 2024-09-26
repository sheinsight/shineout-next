import type { CommonPickerProps } from './picker.type';

export interface ConfirmProps extends Pick<CommonPickerProps, 'jssStyle'> {
  closeByConfirm?: () => void;
}
