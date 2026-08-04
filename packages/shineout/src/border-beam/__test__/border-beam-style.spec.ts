import { borderBeamStyle } from '@sheinx/shineout-style';

const MASK_SUPPORT = '@supports (mask-composite: exclude)';
const PATH_SUPPORT = '@supports (offset-path: rect(0 auto auto 0 round 1px))';

test('defines progressive enhancement and reduced-motion styles', () => {
  const beam = borderBeamStyle.beam as Record<string, any>;
  const maskSupport = beam[MASK_SUPPORT];
  const pathSupport = maskSupport[PATH_SUPPORT];

  expect(beam).toMatchObject({
    display: 'none',
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
    pointerEvents: 'none',
  });
  expect(maskSupport).toMatchObject({
    maskComposite: 'exclude',
  });
  expect(pathSupport.display).toBe('block');
  expect(pathSupport['&::before']).toMatchObject({
    content: '""',
    position: 'absolute',
    offsetDistance: '0%',
    animationName: '$borderBeamMove',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    willChange: 'offset-distance',
  });
  expect(pathSupport['&::before'].backgroundImage).toContain('--soui-brand-6');
  expect(pathSupport['&::before'].backgroundImage).toContain('--soui-brand-5');
  expect(beam['@media (prefers-reduced-motion: reduce)']['&::before']).toEqual({
    display: 'none',
  });
  expect(borderBeamStyle['@keyframes borderBeamMove']).toEqual({
    from: { offsetDistance: '0%' },
    to: { offsetDistance: '100%' },
  });
});
