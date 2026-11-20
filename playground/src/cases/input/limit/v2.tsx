import { Input } from 'shineout-v2';

export default function Demo() {
  const style = { marginBottom: 24 };
  return (
    <div style={{ width: 300 }}>
      <Input.Group style={style}>
        <b>min</b>
        <Input.Number placeholder='100' min={100} />
      </Input.Group>
      <Input.Group style={style}>
        <b>max</b>
        <Input.Number placeholder='200' max={200} />
      </Input.Group>
      <Input.Group style={style}>
        <b>maxLength</b>
        <Input placeholder='5' maxLength={5} />
      </Input.Group>
    </div>
  );
}
