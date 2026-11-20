// Shineout 的 type 翻译成 antd 的 picker + showTime（antd 没有 datetime / time 这种合并类型）
export type SoType = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'time' | 'datetime';
export const TYPES: SoType[] = ['date', 'week', 'month', 'quarter', 'year', 'time', 'datetime'];

export const antdPicker = (type: SoType) => {
  if (type === 'datetime') return { picker: 'date' as const, showTime: true };
  return { picker: type };
};
