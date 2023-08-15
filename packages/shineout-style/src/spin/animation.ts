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

  // fadeCircle
  '@keyframes fading-circle': {
    '0%,39%,100%': {
      opacity: 0,
    },
    '40%': {
      opacity: 1,
    },
  },

  // scaleCircle
  '@keyframes scale-circle': {
    '0%,80%,100%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '40%': {
      transform: 'scale3d(1, 1, 1)',
    },
  },

  // fourDots
  '@keyframes four-dots-1': {
    '0%': {
      opacity: 0.2,
    },
    '50%': {
      opacity: 0.9,
    },
    '100%': {
      opacity: 0.2,
    },
  },
  '@keyframes four-dots-2': {
    '0%': {
      transform: 'rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateZ(359deg)',
    },
  },

  // plane
  '@keyframes plane': {
    '0%': {
      transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)',
    },
    '50%': {
      transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)',
    },
    '100%': {
      transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)',
    },
  },

  // pulse
  '@keyframes pulse': {
    '0%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '100%': {
      opacity: 0,
      transform: 'scale3d(1, 1, 1)',
    },
  },

  // ring
  '@keyframes ring': {
    '0%': {
      transform: 'rotateZ(0deg)',
    },
    '100%': {
      transform: 'rotateZ(359deg)',
    },
  },

  // treeBounce
  '@keyframes three-bounce': {
    '0%,80%,100%': {
      transform: 'scale3d(0, 0, 1)',
    },
    '40%': {
      transform: 'scale3d(1, 1, 1)',
    },
  },

  // wave
  '@keyframes wave': {
    '0%,40%,100%': {
      transform: 'scale3d(1, 0.4, 1)',
    },
    '20%': {
      transform: 'scale3d(1, 1, 1)',
    },
  },

  // chasingRing
  '@keyframes chasing-ring-1': {
    '0%': {
      transform: 'rotateZ(0deg)',
    },
    '44%': {
      transform: 'rotateZ(225deg)',
    },
    '100%': {
      transform: 'rotateZ(360deg)',
    },
  },
  '@keyframes chasing-ring-2': {
    '0%': {
      transform: 'rotateZ(75deg)',
    },
    '44%': {
      transform: 'rotateZ(225deg)',
    },
    '100%': {
      transform: 'rotateZ(435deg)',
    },
  },
  '@keyframes chasing-ring-3': {
    '0%': {
      transform: 'rotateZ(150deg)',
    },
    '44%': {
      transform: 'rotateZ(225deg)',
    },
    '100%': {
      transform: 'rotateZ(510deg)',
    },
  },
  '@keyframes chasing-ring-4': {
    '0%': {
      transform: 'rotateZ(225deg)',
    },
    '44%': {
      transform: 'rotateZ(225deg)',
    },
    '100%': {
      transform: 'rotateZ(585deg)',
    },
  },
};
