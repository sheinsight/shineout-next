import { Button } from 'antd';
import { antdProps } from '../_shared/antd-map';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button {...antdProps('primary')} style={buttonStyle}>Primary</Button>
      <Button {...antdProps('secondary')} style={buttonStyle}>Secondary</Button>
      <Button {...antdProps('secondary', 'outline')} style={buttonStyle}>Outline</Button>
      <Button {...antdProps('secondary', 'dashed')} style={buttonStyle}>Dashed</Button>
      <Button {...antdProps('primary', 'text')} style={buttonStyle}>Text</Button>
    </div>
  );
}
