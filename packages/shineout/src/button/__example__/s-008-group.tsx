/**
 * cn - 组合按钮
 *    -- 可用在同级多项操作，以按钮组合方式出现。
 * en - Group
 *    -- Can be used in the same level of multiple operations, in the form of button group.
 */

import { Button } from 'shineout';
export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flexDirection: 'column' }}>
      <Button.Group mode='text' type='secondary'>
        <Button type='primary'>Publish</Button>
        <Button>Publish</Button>
        <Button>Publish</Button>
        <Button disabled>Publish</Button>
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
          <Button>1</Button>
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Button>...</Button>
        </Button.Group>
      </div>
    </div>
  );
};
