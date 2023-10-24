const duration = 2;

export default {
  position: 'relative',
  margin: 'auto',
  textAlign: 'center',
  animation: `$chasing-dots-1 ${duration}s linear infinite`,
  boxSizing: 'border-box',
  '& $item': {
    position: 'absolute',
    top: 0,
    display: 'inline-block',
    width: '60%',
    height: '60%',
    borderRadius: '100%',
    animation: `$chasing-dots-2 ${duration}s ease-in-out infinite `,
    fill: '#197AFA',

    '&:last-child': {
      top: 'auto',
      bottom: 0,
      animationDelay: `-${duration / 2}s`,
    },
  },
};
