import { Button, Dropdown } from 'antd-v5';
import { simpleAntd } from '../_shared/data';
import { antdProps } from '../../button/_shared/antd-map';

const items = simpleAntd(3);
const col = { display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 24 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
    <div style={col}>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('primary', 'solid')}>Default</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('secondary', 'solid')}>Default</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('danger', 'solid')}>Default</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('warning', 'solid')}>Default</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('success', 'solid')}>Default</Button>
      </Dropdown>
    </div>
    <div style={col}>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('primary', 'outline')}>Outline</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('secondary', 'outline')}>Outline</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('danger', 'outline')}>Outline</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('warning', 'outline')}>Outline</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('success', 'outline')}>Outline</Button>
      </Dropdown>
    </div>
    <div style={col}>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('primary', 'text')}>Text</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('secondary', 'text')}>Text</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('danger', 'text')}>Text</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('warning', 'text')}>Text</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button {...antdProps('success', 'text')}>Text</Button>
      </Dropdown>
    </div>
    </div>
  );
}
