/**
 * cn - 组合按钮
 *    -- 可用在同级多项操作，以按钮组合方式出现
 * en - Group
 *    -- Can be used in the same level of multiple operations, in the form of button group
 */

import { Button } from 'shineout';
import { Icon01, Icon02, Icon03 } from './static/icon';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flexDirection: 'column' }}>
      <Button.Group mode='text'>
        <Button type='primary'>Publish</Button>
        <Button type='secondary'>Publish</Button>
        <Button type='secondary'>Publish</Button>
        <Button type='secondary' disabled>
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

      <div style={{ display: 'flex', gap: 24 }}>
        <Button.Group type='primary'>
          <Button>Publish</Button>
          <Button>
            <Icon02></Icon02>
          </Button>
        </Button.Group>

        <Button.Group type='primary'>
          <Button>Publish</Button>
          <Button shape='square'>
            <Icon01></Icon01>
          </Button>
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Button>
            <Icon03 color='currentColor'></Icon03>
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};
