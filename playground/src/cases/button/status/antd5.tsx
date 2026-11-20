import { Button } from 'antd-v5';
import { antdProps } from '../_shared/antd-map';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('default')} style={buttonStyle}>Default</Button>
        <Button {...antdProps('default', 'outline')} style={buttonStyle}>Default</Button>
        <Button {...antdProps('default', 'dashed')} style={buttonStyle}>Default</Button>
        <Button {...antdProps('default', 'text')} style={buttonStyle}>Default</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('primary')} style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'outline')} style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'dashed')} style={buttonStyle}>Primary</Button>
        <Button {...antdProps('primary', 'text')} style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('danger')} style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'outline')} style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'dashed')} style={buttonStyle}>Danger</Button>
        <Button {...antdProps('danger', 'text')} style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('warning')} style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'outline')} style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'dashed')} style={buttonStyle}>Warning</Button>
        <Button {...antdProps('warning', 'text')} style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button {...antdProps('success')} style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'outline')} style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'dashed')} style={buttonStyle}>Success</Button>
        <Button {...antdProps('success', 'text')} style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
