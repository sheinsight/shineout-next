// loading 用例里用到的图标。原示例用 FontAwesome（从 CDN 加载字体样式）和 Shineout 自带的 icons，
// 前者会把网络加载混进计时，后者只有 Shineout 有，这里统一换成内联 svg，四个库用同一份
export const TrashIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} width='12' height='12' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M9 3h6l1 2h5v2H3V5h5l1-2zm-3 6h12l-1 12H7L6 9z' />
  </svg>
);

export const HelpIcon = () => (
  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
    <circle cx='12' cy='12' r='9' />
    <path d='M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01' />
  </svg>
);
