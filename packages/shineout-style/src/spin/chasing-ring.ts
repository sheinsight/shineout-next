export default {
  position: 'relative',
  margin: 'auto',

  '& $item': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    borderRadius: '100%',
    transformOrigin: '50% 50%',
    borderTopColor: '#197AFA',

    '&:nth-child(1)': {
      animation: '$chasing-ring-1 2s infinite',
    },
    '&:nth-child(2)': {
      animation: '$chasing-ring-2 2s infinite',
    },
    '&:nth-child(3)': {
      animation: '$chasing-ring-3 2s infinite',
    },
    '&:nth-child(4)': {
      animation: '$chasing-ring-4 2s infinite',
    },
  },
};
