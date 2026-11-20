import { Button } from 'shineout-v3';
import { Icon01, Icon02, Icon03 } from '../_shared/icons';

export default function Demo() {
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
            <Icon02 />
          </Button>
        </Button.Group>

        <Button.Group type='primary'>
          <Button>Publish</Button>
          <Button shape='square'>
            <Icon01 />
          </Button>
        </Button.Group>

        <Button.Group type='secondary'>
          <Button>Publish</Button>
          <Button>
            <Icon03 color='currentColor' />
          </Button>
        </Button.Group>
      </div>
    </div>
  );
}
