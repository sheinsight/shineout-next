import { CommonType } from '../common/type';
import { JssStyleType } from './select.type';

export interface ResultInputProps extends Pick<CommonType, 'style' | 'className'> {
  jssStyle?: JssStyleType;
  value: string;
  focus?: boolean;
  open?: boolean;
  inputText?: string;
  filterText?: string;
  values: any;
  multiple?: boolean;
  onChange?: (value: string) => void;
  onRef: React.MutableRefObject<HTMLInputElement | undefined>;
  // onFilter: any;
  onBindInput?: (input: HTMLInputElement) => void;
  onInputBlur: (text?: string) => void;
  onResetFilter: () => void;
}
