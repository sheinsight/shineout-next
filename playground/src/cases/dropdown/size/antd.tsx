import { Button, Dropdown } from 'antd';
import { simpleAntd } from '../_shared/data';
import { antdProps } from '../../button/_shared/antd-map';

const items = simpleAntd(4);

export default function Demo() {
  return (
    <div>
      {(['small', 'middle', 'large'] as const).map((size) => (
        <Dropdown key={size} menu={{ items }}>
          <Button {...antdProps('primary', 'outline')} size={size} style={{ marginInlineEnd: 24 }}>
            Dropdown
          </Button>
        </Dropdown>
      ))}
    </div>
  );
}
