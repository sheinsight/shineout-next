import { useState } from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import { antdProps } from '../_shared/antd-map';
import { HelpIcon, TrashIcon } from '../_shared/more';

const iconStyle = { marginRight: 4, width: 12, height: 12 };
const row = { display: 'flex', gap: 8, marginBottom: 12 } as const;

export default function Demo() {
  const [loadings, setLoadings] = useState([false, false, false, false]);

  const mock = (index: number) => {
    setLoadings((prev) => prev.map((v, i) => (i === index ? true : v)));
    message.info('Deleting...', 2);
    setTimeout(() => {
      setLoadings((prev) => prev.map((v, i) => (i === index ? false : v)));
      message.success('Delete success');
    }, 2000);
  };

  return (
    <div style={{ width: 400 }}>
      <div style={row}>
        <Button {...antdProps('primary')} loading>Loading</Button>
        <Button {...antdProps('primary')} loading shape='square'>
          <TrashIcon style={{ ...iconStyle, marginRight: 0 }} />
        </Button>
        <Button {...antdProps('primary')} loading>
          <TrashIcon style={iconStyle} />
          Delete
        </Button>
        <Button {...antdProps('primary')} loading>
          <TrashIcon style={iconStyle} />
          Delete
          <span style={{ display: 'inline-flex', marginLeft: 4 }}><HelpIcon /></span>
        </Button>
      </div>
      <div style={row}>
        <Button {...antdProps('primary')} loading={loadings[0]} onClick={() => mock(0)}>Loading</Button>
        <Button {...antdProps('primary')} loading={loadings[1]} shape='square' onClick={() => mock(1)}>
          <TrashIcon style={{ ...iconStyle, marginRight: 0 }} />
        </Button>
        <Button {...antdProps('primary')} loading={loadings[2]} onClick={() => mock(2)}>
          <TrashIcon style={iconStyle} />
          Delete
        </Button>
        <Button {...antdProps('primary')} loading={loadings[3]} onClick={() => mock(3)}>
          <TrashIcon style={iconStyle} />
          Delete
          <span style={{ display: 'inline-flex', marginLeft: 4 }}><HelpIcon /></span>
        </Button>
      </div>
    </div>
  );
}
