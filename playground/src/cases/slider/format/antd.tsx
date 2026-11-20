import { useState } from 'react';
import { Slider } from 'antd';
import { useBenchState } from '../../../core/define';

const pad = (i: number) => (i < 10 ? `0${i}` : `${i}`);
const format = (v: number) => {
  const value = v + 540;
  const hours = Math.floor(value / 60);
  return `${pad(hours)}:${pad(value - hours * 60)}`;
};
const SCALE = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540];
const marks = Object.fromEntries(SCALE.map((v) => [v, format(v)]));

export default function Demo() {
  const [value, setValue] = useState<number[]>([33, 216]);
  useBenchState({ value });
  return (
    <Slider
      range
      min={0}
      max={540}
      marks={marks}
      tooltip={{ open: true, formatter: (v) => format(v ?? 0) }}
      value={value}
      onChange={(v: number[]) => setValue(v)}
    />
  );
}
