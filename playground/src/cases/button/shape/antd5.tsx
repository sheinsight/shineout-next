import { Button } from 'antd-v5';
import { antdProps } from '../_shared/antd-map';
import { Icon01 } from '../_shared/icons';

const buttonStyle = { margin: 0 };
const iconWrapper = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 } as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button {...antdProps('primary')} style={buttonStyle}>Primary</Button>
      <Button {...antdProps('primary')} shape='round' style={buttonStyle}>Primary</Button>
      <Button {...antdProps('primary')} shape='circle' style={buttonStyle}>
        <span style={iconWrapper}><Icon01 /></span>
      </Button>
    </div>
  );
}
