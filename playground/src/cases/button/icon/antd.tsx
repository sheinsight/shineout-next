import { Button } from 'antd';
import { antdProps } from '../_shared/antd-map';
import { Icon01 } from '../_shared/icons';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button {...antdProps('primary')} style={buttonStyle}>
        <Icon01 style={{ marginInlineEnd: 4 }} />
        Primary
      </Button>
      <Button {...antdProps('primary')} style={buttonStyle}>
        Primary
        <Icon01 style={{ marginInlineStart: 4 }} />
      </Button>
      <Button {...antdProps('primary')} shape='square' style={buttonStyle}>
        <Icon01 />
      </Button>
    </div>
  );
}
