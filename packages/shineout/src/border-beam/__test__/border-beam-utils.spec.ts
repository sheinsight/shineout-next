import {
  BORDER_BEAM_CSS_VARIABLES,
  getBorderBeamGradient,
  getBorderBeamInset,
  toCssUnit,
} from '../../../../base/src/border-beam/util';

describe('BorderBeam utilities', () => {
  test('builds a solid beam with a transparent tail', () => {
    expect(getBorderBeamGradient('#36cfc9')).toBe(
      'linear-gradient(to left, #36cfc9 0%, #36cfc9 70%, transparent)',
    );
  });

  test('maps gradient stops into the visible seventy percent segment', () => {
    expect(
      getBorderBeamGradient([
        { color: '#1677ff', percent: 0 },
        { color: '#36cfc9', percent: 55 },
        { color: '#95de64', percent: 100 },
      ]),
    ).toBe('linear-gradient(to left, #1677ff 0%, #36cfc9 38.5%, #95de64 70%, transparent)');
  });

  test('fills a missing gradient end and clamps out-of-range stops', () => {
    expect(getBorderBeamGradient([{ color: 'red', percent: 25 }])).toBe(
      'linear-gradient(to left, red 17.5%, red 70%, transparent)',
    );
    expect(
      getBorderBeamGradient([
        { color: 'red', percent: -10 },
        { color: 'blue', percent: 120 },
      ]),
    ).toBe('linear-gradient(to left, red 0%, blue 70%, blue 70%, transparent)');
  });

  test('leaves the CSS default active without a custom color', () => {
    expect(getBorderBeamGradient()).toBeUndefined();
    expect(getBorderBeamGradient([])).toBeUndefined();
  });

  test('normalizes numeric units and inset offsets', () => {
    expect(toCssUnit(5)).toBe('5px');
    expect(toCssUnit('0.25rem')).toBe('0.25rem');
    expect(getBorderBeamInset(undefined, [1, 2, 3, 4])).toBe('-1px -2px -3px -4px');
    expect(getBorderBeamInset(4, [1, 2, 3, 4])).toBe('-4px');
    expect(getBorderBeamInset('2em', [1, 2, 3, 4])).toBe('calc(-1 * 2em)');
    expect(getBorderBeamInset(0, [1, 2, 3, 4])).toBe('-0px');
  });

  test('uses stable private CSS variable names', () => {
    expect(BORDER_BEAM_CSS_VARIABLES).toEqual({
      gradient: '--soui-border-beam-gradient',
      duration: '--soui-border-beam-duration',
      lineWidth: '--soui-border-beam-line-width',
      size: '--soui-border-beam-size',
      insetOffset: '--soui-border-beam-inset-offset',
      borderRadius: '--soui-border-beam-border-radius',
    });
  });
});
