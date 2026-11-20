import { Cascader } from 'shineout-v2';
import { cities } from '../_shared/data';

// 原示例用 Radio 切换 mode，并在右侧展示 value 的 JSON。这里只渲染 mode 0 / 2 / 4 三个，一次挂载，
// 各自都是 antd 有对应写法的模式（0=级联勾选，2=只要叶子，4=不级联）
export default function Demo() {
  const common = {
    clearable: true,
    multiple: true,
    singleRemove: true,
    width: 300,
    placeholder: 'Please select city',
    data: cities,
    keygen: 'value' as const,
    onChange: () => {},
    renderItem: (n: any) => `${n?.value}`,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader {...common} mode={0} />
      <Cascader {...common} mode={2} />
      <Cascader {...common} mode={4} />
    </div>
  );
}
