import { Button } from 'shineout-v3';
import { Icon01 } from '../_shared/icons';

const buttonStyle = { margin: 0 };
const iconWrapper = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 } as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>Primary</Button>
      <Button type='primary' shape='round' style={buttonStyle}>Primary</Button>
      <Button type='primary' shape='square' style={buttonStyle}>
        <span style={iconWrapper}><Icon01 /></span>
      </Button>
      <Button type='primary' shape='circle' style={buttonStyle}>
        <span style={iconWrapper}><Icon01 /></span>
      </Button>
    </div>
  );
}
