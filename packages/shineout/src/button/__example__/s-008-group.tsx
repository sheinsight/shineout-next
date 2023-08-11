/**
 * cn - 组合按钮
 *    -- 可用在同级多项操作，以按钮组合方式出现。
 * en - Group
 *    -- Can be used in the same level of multiple operations, in the form of button group.
 */

import { Button } from 'shineout';
import { Icon02, Icon03 } from './static/icon';

export default () => {
  const iconWarpperStyle = {
    display: 'inline-flex',
    lineHeight: '22px',
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flexDirection: 'column' }}>
      <Button.Group>
        <Button type='primary' mode='outline'>
          Publish
        </Button>
        <Button type='secondary' mode='outline'>
          Publish
        </Button>
        <Button type='secondary' mode='outline'>
          Publish
        </Button>
        <Button type='secondary' mode='outline' disabled>
          Publish
        </Button>
      </Button.Group>

      <Button.Group type='secondary'>
        <Button type='primary'>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
      </Button.Group>

      <Button.Group type='secondary' mode='outline'>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
      </Button.Group>

      <div>
        <Button type='primary'>Primary</Button>
        <Button type='secondary'>Secondary</Button>
        <Button type='secondary'>Secondary</Button>
        <Button type='secondary'>Secondary</Button>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <Button.Group type='primary'>
          <Button>Publish</Button>
          <Button>
            <span style={iconWarpperStyle}>
              <Icon02></Icon02>
            </span>
          </Button>
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Button>
            <span style={iconWarpperStyle}>
              <Icon03 color='#666C7C'></Icon03>
            </span>
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};
