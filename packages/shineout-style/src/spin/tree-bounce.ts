export default {
  margin: 'auto',
  textAlign: 'center',

  '& $item': {
    display: 'inline-block',
    '& div': {
      borderRadius: '100%',
    },
    animation: '$three-bounce 1.4s ease-in-out 0s infinite both',

    '& svg': {
      fill: '#197AFA',
    },

    '&:nth-child(1)': {
      animationDelay: '-0.32s',
    },
    '&:nth-child(2)': {
      animationDelay: '-0.16s',
    },
  },
};
