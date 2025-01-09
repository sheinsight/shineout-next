/**
 * cn - 组合按钮
 *    -- 可用在同级多项操作，以按钮组合方式出现
 * en - Group
 *    -- Can be used in the same level of multiple operations, in the form of button group
 */

import { Button, Dropdown, TYPE } from 'shineout';
import { Icon02 } from './static/icon';

type DropdownItem = TYPE.Dropdown.Item;

const menu: DropdownItem[] = [
  {
    content: 'First',
  },
  {
    content: 'Second',
  },
];

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
          <Dropdown
            data={menu}
            position='bottom-right'
            onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
          />
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Dropdown
            data={menu}
            position='bottom-right'
            onClick={(data: any) => console.info(`The Dropdown clicked ${data.content}.`)}
          />
        </Button.Group>
      </div>
    </div>
  );
};
