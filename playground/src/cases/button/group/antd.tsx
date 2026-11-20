import { Button, Space } from 'antd';
import { antdProps } from '../_shared/antd-map';
import { Icon01, Icon02, Icon03 } from '../_shared/icons';

// antd 的 Button.Group 已弃用，官方推荐 Space.Compact，这里用它
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flexDirection: 'column' }}>
      <Space.Compact>
        <Button {...antdProps('primary')}>Publish</Button>
        <Button {...antdProps('secondary')}>Publish</Button>
        <Button {...antdProps('secondary')}>Publish</Button>
        <Button {...antdProps('secondary')} disabled>Publish</Button>
      </Space.Compact>

      <Space.Compact>
        <Button {...antdProps('primary')}>Publish</Button>
        <Button {...antdProps('secondary')}>Publish</Button>
        <Button {...antdProps('secondary')}>Publish</Button>
        <Button {...antdProps('secondary')}>Publish</Button>
      </Space.Compact>

      <Space.Compact>
        <Button {...antdProps('secondary', 'outline')}>Publish</Button>
        <Button {...antdProps('secondary', 'outline')}>Publish</Button>
        <Button {...antdProps('secondary', 'outline')}>Publish</Button>
        <Button {...antdProps('secondary', 'outline')}>Publish</Button>
      </Space.Compact>

      <div style={{ display: 'flex', gap: 24 }}>
        <Space.Compact>
          <Button {...antdProps('primary')}>Publish</Button>
          <Button {...antdProps('primary')}><Icon02 /></Button>
        </Space.Compact>

        <Space.Compact>
          <Button {...antdProps('primary')}>Publish</Button>
          <Button {...antdProps('primary')}><Icon01 /></Button>
        </Space.Compact>

        <Space.Compact>
          <Button {...antdProps('secondary')}>Publish</Button>
          <Button {...antdProps('secondary')}><Icon03 color='currentColor' /></Button>
        </Space.Compact>
      </div>
    </div>
  );
}
