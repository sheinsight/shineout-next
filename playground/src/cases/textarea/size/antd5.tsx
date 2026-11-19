import { Input } from 'antd-v5';

const style = { width: 120, marginInlineEnd: 24 };

export default function Demo() {
  return (
    <div>
      <Input.TextArea size='small' rows={3} style={style} placeholder='small size' />
      <Input.TextArea size='middle' rows={3} style={style} placeholder='default size' />
      <Input.TextArea size='large' rows={3} style={style} placeholder='large size' />
    </div>
  );
}
