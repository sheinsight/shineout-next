import { styled } from '../jss-style';
import border from '../mixin/inputBorder';

export default styled((t) => {
  const inputTheme = t.components.input;
  const inputBorder = border(t.common.inputBorder, 'wrapper');
  const { wrapperFocus, wrapperError, wrapperDisabled, wrapper } = inputBorder;
  return {
    ...inputBorder,
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      ...wrapper,
    },
    wrapperFocus,
    wrapperError,
    wrapperDisabled,
    inputWrapper: {
      flexGrow: '1',
      position: 'relative',
      paddingRight: '22px',
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      background: 'transparent',
      border: '0',
      padding: `${inputTheme.paddingY} ${inputTheme.paddingX}`,
      outline: 'none',
    },
    clear: {
      position: 'absolute',
      right: '6px',
      top: '0',
      bottom: '0',
      margin: 'auto',
      width: '16px',
      height: '16px',
      display: 'flex',
      cursor: 'pointer',
    },
  };
}, 'input');
