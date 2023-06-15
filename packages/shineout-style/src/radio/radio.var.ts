import { colorVar, va } from '../themes/default';

export default {
  color: va('checkinput-color', '#333e59'),
  size: va('radio-width', '16px'),
  borderWidthUnChecked: va('radio-border-uncheck-width', '2px'),
  borderWidthChecked: va('radio-border-uncheck-width', '6px'),
  borderColor: va('checkbox-border-color', colorVar.grey300),
  backgroundColor: '#fff',
  backgroundColorDisabled: va('checkbox-disabled-bgc', '#E8EBF0'),
};
