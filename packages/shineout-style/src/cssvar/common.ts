export const va = (name: string, value: string) => {
  return `var(--${name},${value})`;
};

export const colorVar = {
  primaryColor: va('primary-color', '#197AFA'),
  primaryColorFade50: va('primary-color-fade-50', 'rgba(25,122,250,.5)'),
  primaryColorFade0: va('primary-color-fade-0', 'rgba(25,122,250,0)'),
  secondaryColor: va('secondary-color', '#666c7c'),
  successColor: va('success-color', '#52c41a'),
  infoColor: va('info-color', '#197AFA'),
  warningColor: va('warning-color', '#ff8c00'),
  dangerColor: va('danger-color', '#ff4d50'),
  white: '#fff',
  grey100: va('grey-100', '#f4f5f8'),
  grey200: va('grey-200', '#e8ebf0'),
  grey300: va('grey-300', '#cccfd7'),
  grey500: va('grey-500', '#adb5bd'),
  grey900: va('grey-900', '#020b18'),
};

export const sizeVar = {
  fontSize: va('font-size', '14px'),
  fontSizeSmall: va('font-size-small', '12px'),
  fontSizeLarge: va('font-size-large', '16px'),
  commonLineHeight: va('common-line-height', '1.42857143'),
};
