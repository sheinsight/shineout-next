// import token from '@sheinx/theme';
import { JsStyles } from '../jss-style';

export type SpinClass = 'default' | 'dots' | 'item' | '@keyframes keyframesFade';

// const Defaults = () => {
//   return {
//     '@keyframes keyframesScale': {
//       '0%': {
//         transform: 'scale3d(0, 0, 1)',
//       },
//       '40%': {
//         transform: 'scale3d(1, 1, 1)',
//       },
//       '80%': {
//         transform: 'scale3d(0, 0, 1)',
//       },
//       '100%': {
//         transform: 'scale3d(0, 0, 1)',
//       },
//     },
//     '@keyframes keyframesFade': {
//       '0%': {
//         opacity: 0.2,
//       },
//       '39%': {
//         opacity: 0.2,
//       },
//       '40%': {
//         opacity: 1,
//       },
//       '100%': {
//         opacity: 0.2,
//       },
//     },
//     item: {
//       position: 'absolute',
//       top: 0,
//       left: '45%',
//       width: '10%',
//       height: '50%',
//       transformOrigin: '50% 100%',

//       '& div': {
//         height: '55%',
//         margin: '0 auto',
//         animation: '$keyframesFade 1s infinite ease-in-out both',
//       },
//     },

//     fade: {
//       '& div,& svg': {
//         animation: '$keyframesFade 1s infinite ease-in-out both',
//       },
//     },

//     scale: {
//       '& div,& svg': {
//         animation: '$keyframesScale 1s infinite ease-in-out both',
//       },
//     },
//   };
// };

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
    margin: 'auto',
    position: 'relative',
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
        background: '#197AFA',
        borderRadius: 5,
        animation: '$keyframesFade 1s infinite ease-in-out both',
      },

      ...animationDelay,
    },
  };

  return defaultStyle;
};

const spinStyle: JsStyles<SpinClass> = {
  '@keyframes keyframesFade': {
    '0%': {
      opacity: 0.2,
    },
    '39%': {
      opacity: 0.2,
    },
    '40%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.2,
    },
  },
  default: {
    ...Default(),
  },
  dots: {},
  item: {},
};

export default spinStyle;
