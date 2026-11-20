import { Button } from 'shineout-v2';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>Primary</Button>
      <Button type='secondary' style={buttonStyle}>Secondary</Button>
      <Button type='secondary' outline style={buttonStyle}>Outline</Button>
      <Button type='primary' text style={buttonStyle}>Text</Button>
    </div>
  );
}
