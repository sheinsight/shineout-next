import { ColorStep } from './progress.type';

export default (color: ColorStep) => {
  if (color.from) {
    return [
      { pos: '0%', color: color.from },
      { pos: '100%', color: color.to },
    ];
  }

  return Object.keys(color)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .reduce((p: ColorStep[], v) => {
      p.push({ pos: v, color: color[v] });
      return p;
    }, []);
};
