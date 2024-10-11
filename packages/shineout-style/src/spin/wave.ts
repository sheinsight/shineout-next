import Token from '@sheinx/theme';

const loop = (count = 5) => {
  const animationDelay: any = {};
  for (let i = 1; i < count; i++) {
    animationDelay[`&:nth-child(${i + 1})`] = {
      animationDelay: `${-1.2 + (0.4 / count) * i}s`,
    };
  }
  return animationDelay;
};

export default {
  margin: 'auto',
  fontSize: 10,
  textAlign: 'center',
  whiteSpace: 'nowrap',

  '& $item': {
    display: 'inline-block',
    height: '100%',
    marginRight: '2px',
    background: Token.spinColor,
    animation: '$wave 1.2s infinite ease-in-out',

    ':last-child': {
      marginRight: 0,
    },
    ...loop(),
  },
};
