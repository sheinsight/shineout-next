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
  buttonPaddingSmallVertical: va('button-padding-small-vertical', `2px`),
  buttonPaddingLargeVertical: va('button-padding-large-vertical', `8px`),
  buttonPaddingBaseHorizontal: va('button-padding-base-horizontal', `8px`),
  buttonPaddingSmallHorizontal: va('button-padding-small-horizontal', `8px`),
  buttonPaddingLargeHorizontal: va('button-padding-large-horizontal', `12px`),
  buttonDefaultTextColor: va('button-default-text-color', `#333e59`),
  buttonBorderRadius: va('button-border-radius', `4px`),
  buttonDisabledBg: va('button-disabled-bg', `#f5f5f5`),
  buttonDisabledColor: va('button-disabled-bg', `rgba(0, 0, 0, 0.45)`),
  buttonLineHeightSmall: 1.5,
};

export default cssVars;
