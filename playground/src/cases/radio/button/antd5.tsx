import { Radio } from 'antd-v5';
import { weekdays } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Radio.Group optionType='button' buttonStyle='solid' options={weekdays} defaultValue='Wednesday' />
      <br />
      <Radio.Group
        optionType='button'
        buttonStyle='solid'
        options={weekdays}
        defaultValue='Wednesday'
        disabled
        style={{ marginTop: 24 }}
      />
    </>
  );
}
