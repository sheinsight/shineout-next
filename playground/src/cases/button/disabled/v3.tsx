import { Button } from 'shineout-v3';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='primary' disabled style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='outline' disabled style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='dashed' disabled style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='text' disabled style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' disabled style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='outline' disabled style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='dashed' disabled style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='text' disabled style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' disabled style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='outline' disabled style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='dashed' disabled style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='text' disabled style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' disabled style={buttonStyle}>Success</Button>
        <Button type='success' mode='outline' disabled style={buttonStyle}>Success</Button>
        <Button type='success' mode='dashed' disabled style={buttonStyle}>Success</Button>
        <Button type='success' mode='text' disabled style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
