const circleCount = 12;

const loop = () => {
  const keyframes: any = {};
  for (let i = 1; i <= circleCount; i++) {
    const delay = Number((-1.2 + (1.2 / circleCount) * (i - 1)).toFixed(1));
    keyframes[`&:nth-child(${i})`] = {
      transform: `rotateZ(${(360 / circleCount) * (i - 1)}deg)`,
    };
    if (i !== 1) {
      keyframes[`&:nth-child(${i})`]['& div,& svg'] = {
        animationDelay: `${delay}s`,
      };
    }
  }
  return keyframes;
};

export default {
  position: 'relative',
  // margin: 'auto',
  boxSizing: 'border-box',
  '& $item': {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '80%',
    height: '80%',
    '& div': {
      borderRadius: '100%',
    },
    ...loop(),
  },
  '& svg': {
    fill: '#197AFA',
    animation: '$scale-circle 1.2s infinite ease-in-out both',
  },
};
