import Token from '@sheinx/theme';

const Default = (count = 12) => {
  const animationDelay: any = {};

  for (let i = 1; i < count; i++) {
    animationDelay[`&:nth-child(${i + 1})`] = {
      transform: `rotateZ(${(360 / count) * i}deg)`,
      '& div': {
        animationDelay: `${-1 + (1 / count) * i}s`,
      },
    };
  }

  const defaultStyle = {
    width: 54,
    height: 54,
    // margin: 'auto',
    position: 'relative',
    boxSizing: 'border-box',
    '& $item': {
      position: 'absolute',
      top: 0,
      left: '45%',
      width: '10%',
      height: '50%',
      transformOrigin: '50% 100%',

      '& div': {
        height: '55%',
        margin: '0 auto',
        background: Token.spinColor,
        borderRadius: 5,
        animation: '$keyframesFade 1s infinite ease-in-out both',
      },

      ...animationDelay,
    },
  };

  return defaultStyle;
};

export default Default;
