/** 三个实现共用的数据和状态逻辑（不 import 任何组件库） */
import { useState } from 'react';
import { useBenchState } from '../../../core/define';

export const COUNT = 500;

export const OPTIONS = Array.from({ length: COUNT }, (_, i) => `选项 ${String(i + 1).padStart(3, '0')}`);

export interface State {
  tick: number;
  checked: number;
}

export function useGroupState() {
  const [value, setValue] = useState<string[]>([]);
  const [tick, setTick] = useState(0);
  useBenchState<State>({ tick, checked: value.length });
  const actions = [
    { name: 'tick', label: '父组件无关更新', onClick: () => setTick(tick + 1) },
    { name: 'all', label: '全选 / 清空', onClick: () => setValue(value.length ? [] : OPTIONS) },
  ];
  return { value, setValue, tick, actions };
}
