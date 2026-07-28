import type { BorderBeamColor, BorderBeamGradient } from './border-beam.type';

export type BorderWidth = readonly [number, number, number, number];

export const DEFAULT_BORDER_BEAM_DURATION = 6;
export const MAX_BEAM_COLOR_STOP_PERCENT = 70;

export const BORDER_BEAM_CSS_VARIABLES = {
  gradient: '--soui-border-beam-gradient',
  duration: '--soui-border-beam-duration',
  lineWidth: '--soui-border-beam-line-width',
  size: '--soui-border-beam-size',
  insetOffset: '--soui-border-beam-inset-offset',
  borderRadius: '--soui-border-beam-border-radius',
} as const;

const fillGradientEnd = (items: BorderBeamGradient): BorderBeamGradient => {
  const lastItem = items[items.length - 1];
  if (!lastItem || lastItem.percent === 100) return items;
  return [...items, { ...lastItem, percent: 100 }];
};

const mapStopPercent = (percent: number) =>
  Number(((Math.min(Math.max(percent, 0), 100) / 100) * MAX_BEAM_COLOR_STOP_PERCENT).toFixed(2));

export const getBorderBeamGradient = (value?: BorderBeamColor) => {
  const source = typeof value === 'string' ? [{ color: value, percent: 0 }] : value || [];
  const stops = fillGradientEnd(source).map(
    (item) => item.color + ' ' + mapStopPercent(item.percent) + '%',
  );
  return stops.length
    ? 'linear-gradient(to left, ' + stops.join(', ') + ', transparent)'
    : undefined;
};

export const toCssUnit = (value: number | string) =>
  typeof value === 'number' ? value + 'px' : value;

const getInset = (value: number | string) =>
  typeof value === 'string' ? 'calc(-1 * ' + value + ')' : '-' + value + 'px';

export const getBorderBeamInset = (
  outset: number | string | null | undefined,
  borderWidth: BorderWidth,
) =>
  outset === undefined || outset === null ? borderWidth.map(getInset).join(' ') : getInset(outset);
