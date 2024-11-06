import Token from '@sheinx/theme';

export default {
  // margin: 'auto',
  textAlign: 'center',
  boxSizing: 'border-box',
  '& $item': {
    display: 'inline-block',
    '& div': {
      borderRadius: '100%',
    },
    animation: '$three-bounce 1.4s ease-in-out 0s infinite both',

    '& svg': {
      fill: Token.spinColor,
    },

    '&:nth-child(1)': {
      animationDelay: '-0.32s',
    },
    '&:nth-child(2)': {
      animationDelay: '-0.16s',
    },
  },
};
