import { Button } from 'shineout-v2';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='default' style={buttonStyle}>Default</Button>
        <Button type='default' outline style={buttonStyle}>Default</Button>
        <Button type='default' text style={buttonStyle}>Default</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='primary' style={buttonStyle}>Primary</Button>
        <Button type='primary' outline style={buttonStyle}>Primary</Button>
        <Button type='primary' text style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' style={buttonStyle}>Danger</Button>
        <Button type='danger' outline style={buttonStyle}>Danger</Button>
        <Button type='danger' text style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' style={buttonStyle}>Warning</Button>
        <Button type='warning' outline style={buttonStyle}>Warning</Button>
        <Button type='warning' text style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' style={buttonStyle}>Success</Button>
        <Button type='success' outline style={buttonStyle}>Success</Button>
        <Button type='success' text style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
