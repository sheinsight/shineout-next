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
  },

  '& svg,& div': {
    animation: '$fading-circle 1.2s infinite ease-in-out both',
  },
};
