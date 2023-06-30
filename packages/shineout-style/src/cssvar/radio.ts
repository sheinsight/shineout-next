import { colorVar, va } from './common';

const checkboxBorderColor = va('checkbox-border-color', colorVar.grey300);
export default {
  checkinputColor: va('checkinput-color', '#333e59'),
  radioWidth: va('radio-width', '16px'),
  radioBorderUncheckWidth: va('radio-border-uncheck-width', '2px'),
  radioBorderWidth: va('radio-border-width', '6px'),
  checkboxBorderColor: checkboxBorderColor,
  checkboxDisabledBgc: va('checkbox-disabled-bgc', '#E8EBF0'),
  checkboxCheckedDisabledBgc: va('checkbox-disabled-bgc', checkboxBorderColor),
};
