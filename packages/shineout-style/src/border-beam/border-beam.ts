import type { BorderBeamClasses } from '@sheinx/base';
import { CommonToken } from '@sheinx/theme';
import type { JsStyles } from '../jss-style';

const MASK_SUPPORT = '@supports (mask-composite: exclude)';
const PATH_SUPPORT = '@supports (offset-path: rect(0 auto auto 0 round 1px))';
const gradient =
  'linear-gradient(to left, ' +
  CommonToken['Brand-6'] +
  ' 0%, ' +
  CommonToken['Brand-5'] +
  ' 70%, transparent)';

const borderBeamStyle: JsStyles<keyof BorderBeamClasses> = {
  rootClass: {},
  beam: {
    boxSizing: 'border-box',
    display: 'none',
    position: 'absolute',
    inset: 'var(--soui-border-beam-inset-offset, 0px)',
    borderRadius: 'var(--soui-border-beam-border-radius, 0px)',
    zIndex: 1,
    overflow: 'hidden',
    pointerEvents: 'none',
    padding: 'var(--soui-border-beam-line-width, 1px)',
    [MASK_SUPPORT]: {
      maskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
      maskClip: 'content-box, border-box',
      maskComposite: 'exclude',
      [PATH_SUPPORT]: {
        display: 'block',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'var(--soui-border-beam-size, 100px)',
          aspectRatio: '1 / 1',
          opacity: 0.95,
          backgroundImage: 'var(--soui-border-beam-gradient, ' + gradient + ')',
          offsetAnchor: '90% 50%',
          offsetDistance: '0%',
          offsetPath: 'rect(0 auto auto 0 round var(--soui-border-beam-size, 100px))',
          offsetRotate: 'auto',
          animationName: '$borderBeamMove',
          animationDuration: 'var(--soui-border-beam-duration, 6s)',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'offset-distance',
        },
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      '&::before': {
        display: 'none',
      },
    },
  },
  '@keyframes borderBeamMove': {
    from: {
      offsetDistance: '0%',
    },
    to: {
      offsetDistance: '100%',
    },
  },
};

export default borderBeamStyle;
