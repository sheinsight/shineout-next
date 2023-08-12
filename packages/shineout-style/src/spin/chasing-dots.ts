const duration = 2;

export default {
  position: 'relative',
  margin: 'auto',
  textAlign: 'center',
  animation: `$keyframesRotate ${duration}s linear infinite`,

  '& $item': {
    position: 'absolute',
    top: 0,
    display: 'inline-block',
    width: '60%',
    height: '60%',
    borderRadius: '100%',
    animation: `$keyframesBounce ${duration}s ease-in-out infinite `,

    '&:last-child': {
      top: 'auto',
      bottom: 0,
      animationDelay: `-${duration / 2}s`,
    },
  },
};
