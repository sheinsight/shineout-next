import { Button } from 'antd-v5';
import { antdProps } from '../_shared/antd-map';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <Button {...antdProps('primary')} size='small' style={buttonStyle}>Primary</Button>
      <Button {...antdProps('primary')} style={buttonStyle}>Primary</Button>
      <Button {...antdProps('primary')} size='large' style={buttonStyle}>Primary</Button>
    </div>
  );
}
