import { Button } from 'shineout-v2';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='primary' disabled style={buttonStyle}>Primary</Button>
        <Button type='primary' outline disabled style={buttonStyle}>Primary</Button>
        <Button type='primary' text disabled style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' disabled style={buttonStyle}>Danger</Button>
        <Button type='danger' outline disabled style={buttonStyle}>Danger</Button>
        <Button type='danger' text disabled style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' disabled style={buttonStyle}>Warning</Button>
        <Button type='warning' outline disabled style={buttonStyle}>Warning</Button>
        <Button type='warning' text disabled style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' disabled style={buttonStyle}>Success</Button>
        <Button type='success' outline disabled style={buttonStyle}>Success</Button>
        <Button type='success' text disabled style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
