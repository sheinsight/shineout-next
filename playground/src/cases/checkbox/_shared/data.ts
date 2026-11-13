export const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

export const idColors = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
];

export const fruits = ['Option1', 'Option2', 'Option3'];

/** 全选 / 半选 的状态计算 */
export const getChecked = (value: string[], num: number) => {
  if (value.length === num) return true;
  if (value.length === 0) return false;
  return 'indeterminate' as const;
};
