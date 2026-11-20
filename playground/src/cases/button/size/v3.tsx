import { Button } from 'shineout-v3';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' size='small' style={buttonStyle}>Primary</Button>
      <Button type='primary' style={buttonStyle}>Primary</Button>
      <Button type='primary' size='large' style={buttonStyle}>Primary</Button>
    </div>
  );
}
