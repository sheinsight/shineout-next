export const va = (name: string, value: string) => {
  return `var(--${name},${value})`;
};
export const colorVar = {
  primary: va('primary-color', '#197AFA'),
  secondary: va('secondary-color', '#666c7c'),
  success: va('success-color', '#52c41a'),
  info: va('info-color', '#197AFA'),
  warning: va('warning-color', '#ff8c00'),
  danger: va('danger-color', '#ff4d50'),
  white: '#fff',
  grey100: va('grey-100', '#f4f5f8'),
  grey200: va('grey-200', '#e8ebf0'),
  grey500: va('grey-500', '#adb5bd'),
};

export const sizeVar = {
  font: va('font-size', '14px'),
  fontSmall: va('font-size-small', '12px'),
  fontLarge: va('font-size-large', '16px'),
  lineHeight: va('common-line-height', '1.42857143'),
};
