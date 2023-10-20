export default {
  margin: 'auto',
  position: 'relative',
  animation: '$four-dots-2 1.6s linear infinite',
  boxSizing: 'border-box',
  '& $item': {
    position: 'absolute',
    width: '32%',
    height: '32%',
    lineHeight: 0,
    opacity: 0.2,
    animation: '$four-dots-1 1.6s linear infinite',

    '& div': {
      borderRadius: '100%',
    },

    '& svg': {
      fill: '#197AFA',
    },

    '&:nth-child(1)': {
      top: '10%',
      left: '10%',
    },
    '&:nth-child(2)': {
      top: '10%',
      right: '10%',
      animationDelay: '0.4s',
    },
    '&:nth-child(3)': {
      right: '10%',
      bottom: '10%',
      animationDelay: '0.8s',
    },
    '&:nth-child(4)': {
      bottom: '10%',
      left: '10%',
      animationDelay: '1.2s',
    },
  },
};
