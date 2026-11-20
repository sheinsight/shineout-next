import { Radio } from 'antd-v5';
import { idColors } from '../_shared/data';

const options = idColors.map((c) => ({ value: c.id, label: c.color }));

// antd 5 的 Radio.Group 没有 vertical / orientation，用 inline-flex + column 纵向排列
export default function Demo() {
  return (
    <>
      <Radio.Group options={options} defaultValue={3} />
      <Radio.Group
        options={options}
        defaultValue={3}
        style={{ marginTop: 24, display: 'inline-flex', flexDirection: 'column' }}
      />
    </>
  );
}
