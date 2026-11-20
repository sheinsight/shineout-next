import { Radio } from 'antd';
export default function Demo() {
  return (
    <>
      <Radio checked={false}>OptionA</Radio>
      <Radio checked>OptionB</Radio>
      <Radio checked={false} disabled>
        OptionC
      </Radio>
      <Radio checked disabled>
        OptionD
      </Radio>
    </>
  );
}
