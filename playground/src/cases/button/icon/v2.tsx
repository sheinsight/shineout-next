import { Button } from 'shineout-v2';
import { Icon01 } from '../_shared/icons';

const buttonStyle = { margin: 0 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' style={buttonStyle}>
        <Icon01 style={{ marginInlineEnd: 4 }} />
        Primary
      </Button>
      <Button type='primary' style={buttonStyle}>
        Primary
        <Icon01 style={{ marginInlineStart: 4 }} />
      </Button>
      <Button type='primary' style={buttonStyle}>
        <Icon01 />
      </Button>
    </div>
  );
}
