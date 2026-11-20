// 把 Shineout 的 type + mode 翻译成 antd 的 color + variant（antd 5.29 和 6 都支持这两个属性）
// 对应关系是近似的：antd 没有 secondary / warning / success 类型，只能用 color 预设色或 variant 对应，
// 色调与 Shineout 的语义色不完全相同，对应关系写在各用例的 notes 里
export type SoType = 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
export type SoMode = 'solid' | 'outline' | 'dashed' | 'text';

type AntdColor = 'default' | 'primary' | 'danger' | 'orange' | 'green';
type AntdVariant = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text';

const COLOR: Record<SoType, AntdColor> = {
  default: 'default',
  primary: 'primary',
  secondary: 'default',
  danger: 'danger',
  warning: 'orange',
  success: 'green',
};

export const antdProps = (type: SoType, mode: SoMode = 'solid'): { color: AntdColor; variant: AntdVariant } => {
  const color = COLOR[type];
  if (mode === 'outline') return { color, variant: 'outlined' };
  if (mode === 'dashed') return { color, variant: 'dashed' };
  if (mode === 'text') return { color, variant: 'text' };
  // 实心：default 和 secondary 在 Shineout 里是浅灰底，对应 antd 的 filled；其余是实色（solid）
  if (type === 'secondary' || type === 'default') return { color, variant: 'filled' };
  return { color, variant: 'solid' };
};
