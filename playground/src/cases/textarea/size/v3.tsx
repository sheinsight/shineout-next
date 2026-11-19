import { Textarea } from 'shineout-v3';

const style = { width: 120, marginInlineEnd: 24 };

export default function Demo() {
  return (
    <div>
      <Textarea size='small' rows={3} style={style} placeholder='small size' />
      <Textarea rows={3} style={style} placeholder='default size' />
      <Textarea size='large' rows={3} style={style} placeholder='large size' />
    </div>
  );
}
