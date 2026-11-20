import { Radio } from 'antd-v5';
import { weekdays } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Radio.Group optionType='button' buttonStyle='outline' options={weekdays} defaultValue='Wednesday' />
      <br />
      <Radio.Group
        optionType='button'
        buttonStyle='outline'
        options={weekdays}
        defaultValue='Wednesday'
        disabled
        style={{ marginTop: 24 }}
      />
    </>
  );
}
