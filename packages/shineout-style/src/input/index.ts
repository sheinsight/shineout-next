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
    input: {
      flexGrow: '1',
      background: 'transparent',
      border: '0',
      padding: `${inputTheme.paddingY} ${inputTheme.paddingX}`,
      outline: 'none',
    },
    clear: {
      width: '16px',
      height: '16px',
      display: 'flex',
      marginRight: '5px',
      cursor: 'pointer',
    },
  };
}, 'input');
