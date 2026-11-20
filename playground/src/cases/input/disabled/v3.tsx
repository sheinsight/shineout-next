import { Input } from 'shineout-v3';

export default function Demo() {
  const style = { width: 300 };
  return (
    <div>
      <Input.Group disabled style={{ ...style, marginBottom: 24 }}>
        <Input placeholder='first name' />
        -
        <Input placeholder='last name' />
      </Input.Group>
      <Input disabled style={style} placeholder='disabled input' />
    </div>
  );
}
