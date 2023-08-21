import { isNumber } from '../../utils/is';

export function useStyleUnitValue(value?: string | number) {
  if (value === undefined) return;

  if (isNumber(value)) {
    return {
      value,
      unit: 'px',
    };
  }

  if (typeof value === 'string') {
    const match = value.match(/(\d+)(px|rem|em|vh|vw|vmin|vmax|%)$/);

    if (match) {
      return {
        value: Number(match[1]),
        unit: match[2],
      };
    }

    return {
      value: Number(value),
      unit: 'px',
    };
  }
}
