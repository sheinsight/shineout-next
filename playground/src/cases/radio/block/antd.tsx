import { Radio } from 'antd';
import { idColors } from '../_shared/data';

const options = idColors.map((c) => ({ value: c.id, label: c.color }));

export default function Demo() {
  return (
    <>
      <Radio.Group options={options} defaultValue={3} />
      <Radio.Group options={options} defaultValue={3} orientation='vertical' style={{ marginTop: 24 }} />
    </>
  );
}
