import { Radio } from 'shineout-v2';
export default function Demo() {
  return (
    <Radio.Group keygen>
      <Radio size='small' htmlValue='a'>
        OptionA
      </Radio>
      <Radio htmlValue='b'>OptionB</Radio>
      <Radio size='large' htmlValue='c'>
        OptionC
      </Radio>
    </Radio.Group>
  );
}
