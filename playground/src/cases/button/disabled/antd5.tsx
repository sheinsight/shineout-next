import { Button } from 'antd-v5';
import { antdProps } from '../_shared/antd-map';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('primary')} disabled style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'outline')} disabled style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'dashed')} disabled style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'text')} disabled style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('danger')} disabled style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'outline')} disabled style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'dashed')} disabled style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'text')} disabled style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('warning')} disabled style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'outline')} disabled style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'dashed')} disabled style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'text')} disabled style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('success')} disabled style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'outline')} disabled style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'dashed')} disabled style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'text')} disabled style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
