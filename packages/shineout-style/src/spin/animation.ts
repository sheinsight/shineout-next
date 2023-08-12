export default {
  // defualt
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
  '@keyframes keyframesScale': {
    '0%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '40%': {
      transform: 'scale3d(1, 1, 1)',
    },
    '80%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '100%': {
      transform: 'scale3d(0, 0, 1)',
    },
  },

  // chasingDots
  '@keyframes chasing-dots-1': {
    '100%': {
      transform: 'rotateZ(360deg)',
    },
  },
  '@keyframes chasing-dots-2': {
    '0%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '50%': {
      transform: 'scale3d(1, 1, 1)',
    },
    '100%': {
      transform: 'scale3d(0, 0, 1)',
    },
  },

  // cubeGrid
  '@keyframes cube-grid': {
    '0%,70%,100%': {
      transform: 'scale3d(1, 1, 1)',
    },
    '35%': {
      transform: 'scale3d(0, 0, 1)',
    },
  },

  // doubleBounce
  '@keyframes double-bounce': {
    '0%,100%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '50%': {
      transform: 'scale3d(1, 1, 1)',
    },
  },
};
