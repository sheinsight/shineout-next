import { colorVar, va } from './common';

const checkboxBorderColor = va('checkbox-border-color', colorVar.grey300);
export default {
  checkinputColor: va('checkinput-color', '#333e59'),
  checkboxWidth: va('checkbox-width', '16px'),
  checkboxBorderUncheckWidth: va('checkbox-border-uncheck-width', '2px'),
  checkboxBorderWidth: va('checkbox-border-width', '6px'),
  checkboxBorderColor: checkboxBorderColor,
  checkboxDisabledBgc: va('checkbox-disabled-bgc', '#E8EBF0'),
  checkboxCheckedDisabledBgc: va('checkbox-disabled-bgc', checkboxBorderColor),
};
