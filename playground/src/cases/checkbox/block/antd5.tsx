import { Checkbox } from 'antd-v5';
import { colors } from '../_shared/data';

// antd 的 Group 没有 block，用 flex 纵向排列实现竖排
export default function Demo() {
  return (
    <>
      <Checkbox.Group options={colors} defaultValue={['blue', 'cyan']} />
      <Checkbox.Group
        options={colors}
        defaultValue={['blue', 'cyan']}
        style={{ marginTop: 24, display: 'inline-flex', flexDirection: 'column' }}
      />
    </>
  );
}
