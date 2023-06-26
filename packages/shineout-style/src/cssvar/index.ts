import { colorVar, sizeVar, va } from './common';
import inputVar from './input';
import radioVar from './radio';
import innerTitleVar from './innerTitle';
import formVar from './form';
const cssVars = {
  ...colorVar,
  ...sizeVar,
  ...inputVar,
  ...radioVar,
  ...innerTitleVar,
  ...formVar,
  buttonDefaultBorder: va('button-default-border', `#d9d9d9`),
  buttonPaddingBaseVertical: va('button-padding-base-vertical', `5px`),
  buttonPaddingBaseHorizontal: va('button-padding-base-horizontal', `8px`),
  buttonDefaultTextColor: va('button-default-text-color', `#333e59`),
  buttonBorderRadius: va('button-border-radius', `4px`),
  buttonDisabledBg: va('button-disabled-bg', `#f5f5f5`),
  buttonDisabledColor: va('button-disabled-bg', `rgba(0, 0, 0, 0.45)`),
};

export default cssVars;
