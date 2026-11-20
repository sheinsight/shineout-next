import { Checkbox } from 'antd';
import { colors } from '../_shared/data';

// antd 把渲染内容写进 options 的 label
const options = colors.map((color) => ({
  value: color,
  label: <span style={{ borderBottom: `solid 1px ${color}` }}>{color}</span>,
}));

export default function Demo() {
  return <Checkbox.Group options={options} defaultValue={['blue', 'cyan']} />;
}
