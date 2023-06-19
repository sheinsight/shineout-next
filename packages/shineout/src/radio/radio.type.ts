import { RadioProps as UiRadioProps } from '@sheinx/base';
export interface RadioProps<T> extends Omit<UiRadioProps, 'onChange' | 'jssStyle' | 'checked'> {
  /**
   * 选中后返回的值默认为 true
   */
  htmlValue?: T;
  onChange?: (value: T) => void;
  checked?: boolean | ((d: T) => boolean);
}
