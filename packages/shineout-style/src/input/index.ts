import { styled } from '../jss-style';

export default styled(() => {
  return {
    wrapper: {
      display: 'flex',
      borderRadius: 4,
      background: '#fff',
      alignItems: 'center',
      border: '1px solid #333e59',
      '&:hover': {
        border: '1px solid #197afa',
      },
    },
    wrapperFocus: {
      border: '1px solid #197afa',
    },
    input: {
      flexGrow: 1,
      background: 'transparent',
      border: 0,
      padding: [5, 8],
      outline: 'none',
    },
    clear: {
      width: 16,
      height: 16,
      display: 'flex',
      marginRight: 5,
      cursor: 'pointer',
    },
  };
}, 'input');
