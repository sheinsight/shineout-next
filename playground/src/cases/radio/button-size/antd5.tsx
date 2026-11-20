import { Radio } from 'antd-v5';
import { colors } from '../_shared/data';

export default function Demo() {
  const data = colors.slice(0, 3);
  return (
    <div>
      <Radio.Group size='small' optionType='button' buttonStyle='solid' options={data} defaultValue='red' />
      <br />
      <Radio.Group size='middle' optionType='button' buttonStyle='solid' options={data} defaultValue='red' style={{ marginTop: 24 }} />
      <br />
      <Radio.Group size='large' optionType='button' buttonStyle='solid' options={data} defaultValue='red' style={{ marginTop: 24 }} />
      <br />
    </div>
  );
}
