import Token from '@sheinx/theme';

export default {
  position: 'relative',
  // margin: 'auto',
  boxSizing: 'border-box',
  '& $item': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    opacity: 0.6,
    animation: '$double-bounce 2s ease-in-out infinite',
    background: Token.spinColor,

    '&:last-child': {
      animationDelay: '-1s',
    },
  },
};
