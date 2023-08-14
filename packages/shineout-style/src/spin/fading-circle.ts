// const circleCount = 12;

// const loop = () => {
//   const keyframes: any = {};
//   for (let i = 1; i <= circleCount; i++) {
//     const delay = Number((-1.2 + (1.2 / circleCount) * (i - 1)).toFixed(1));
//     keyframes[`&:nth-child(${i})`] = {
//       transform: `rotateZ(${(360 / circleCount) * (i - 1)}deg)`,
//     };
//     if (i !== 1) {
//       keyframes[`&:nth-child(${i})`]['& div,& svg'] = {
//         animationDelay: `${delay}s`,
//       };
//     }
//   }
//   return keyframes;
// };

const loop = (i = 12) => {
  if (i > 1) {
    loop(i - 1);
    const delay = -1.2 + (1.2 / 12) * (i - 1);
    return {
      [`&:nth-child(${i})`]: {
        transform: `rotateZ(${(360 / 12) * (i - 1)}deg)`,
        '& svg, & div': {
          animationDelay: `${delay}s`,
        },
      },
    };
  }
  return {};
};

export default {
  position: 'relative',
  margin: 'auto',

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
  '& svg,& div': {
    animation: '$fading-circle-2 1.2s infinite ease-in-out both',
  },
};
