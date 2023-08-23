const delayRange = 0.4;

export default {
  margin: 'auto',
  '& $item': {
    width: '33.33333%',
    height: '33.3333%',
    float: 'left',
    animation: '$cube-grid 1.3s infinite ease-in-out',
    background: '#197AFA',

    '&:nth-child(1)': { animationDelay: `${delayRange * 0.5}s` },
    '&:nth-child(2)': { animationDelay: `${delayRange * 0.75}s` },
    '&:nth-child(3)': { animationDelay: `${delayRange}s` },
    '&:nth-child(4)': { animationDelay: `${delayRange * 0.25}s` },
    '&:nth-child(5)': { animationDelay: `${delayRange * 0.5}s` },
    '&:nth-child(6)': { animationDelay: `${delayRange * 0.75}s` },
    '&:nth-child(7)': { animationDelay: `${delayRange * 0}s` },
    '&:nth-child(8)': { animationDelay: `${delayRange * 0.25}s` },
    '&:nth-child(9)': { animationDelay: `${delayRange * 0.5}s` },
  },
};
