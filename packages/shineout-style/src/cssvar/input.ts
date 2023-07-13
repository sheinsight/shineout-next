import { colorVar, va } from './common';

export default {
  inputClearSize: '14px',
  inputClearBgColor: va('input-clear-bg-color', '#b3b7c1'),
  inputClearBgHoverColor: va('input-clear-bg-hover-color', '#197afa'),
  // inputBorder
  inputBg: colorVar.white,
  inputPlaceholderColor: va('input-placeholder-color', '#b3b7c1'),
  inputPlaceholderSize: va('input-placeholder-size', '14px'),
  inputBorderColor: va('input-border-color', '#cccfd7'),
  inputBorderDisabledColor: va('input-border-disabled-color', '#cccfd7'),
  inputBorderFocusColor: va('input-border-focus-color', colorVar.primaryColor),
  inputBorderErrorColor: va('input-border-error-color', colorVar.dangerColor),
  inputBgDisabled: va('input-bg-disabled', '#f5f6fb'),
  inputTextColor: va('input-text-color', '#333e59'),
  inputDisabledColor: va('input-disabled-color', '#999da8'),
  inputPaddingXSmall: '8px',
  inputPaddingX: '8px',
  inputPaddingXLarge: '12px',
  inputPaddingYSmall: '2px',
  inputPaddingY: '5px',
  inputPaddingYLarge: '8px',
  inputBorderRadius: va('input-border-radius', '4px'),
  inputFocusWidth: va('input-focus-width', '0'),
  inputBorderFocusColorFade25: va('input-focus-width', '0'),
};
