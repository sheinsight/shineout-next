import { colorVar, sizeVar, va } from '../themes/default';

const inputBorderVar = {
  color: {
    background: {
      default: colorVar.white,
      disabled: va('input-bg-disabled', '#f5f6fb'),
    },
    border: {
      default: va('input-border-color', '#cccfd7'),
      disabled: va('input-border-disabled-color', '#cccfd7'),
      focus: va('input-border-focus-color', colorVar.primary),
      error: va('input-border-error-color', colorVar.danger),
    },
    text: {
      default: va('input-text-color', '#333e59'),
      disabled: va('input-disabled-color', '#999da8'),
    },
  },
  size: {
    fontSize: {
      default: sizeVar.font,
      small: sizeVar.fontSmall,
      large: sizeVar.fontLarge,
    },
    paddingX: {
      small: '8px',
      default: '8px',
      large: '12px',
    },
    paddingY: {
      small: '2px',
      default: '5px',
      large: '8px',
    },
    radius: {
      default: va('input-border-radius', '4px'),
    },
  },
  boxShadow: {
    focus: `0 0 0 ${va('input-focus-width', '0')} ${va(
      'input-border-focus-color-fade-25',
      'rgba(25,122,250,.25)',
    )}`,
  },
};

export default inputBorderVar;
