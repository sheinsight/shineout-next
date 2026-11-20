import { Button } from 'shineout-v3';

const buttonStyle = { margin: 0, width: 72 };
const wrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' } as const;
const buttonWrapperStyle = { gap: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center' } as const;

export default function Demo() {
  return (
    <div style={wrapperStyle}>
      <div style={buttonWrapperStyle}>
        <Button type='default' style={buttonStyle}>Default</Button>
        <Button type='default' mode='outline' style={buttonStyle}>Default</Button>
        <Button type='default' mode='dashed' style={buttonStyle}>Default</Button>
        <Button type='default' mode='text' style={buttonStyle}>Default</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='primary' style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='outline' style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='dashed' style={buttonStyle}>Primary</Button>
        <Button type='primary' mode='text' style={buttonStyle}>Primary</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='danger' style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='outline' style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='dashed' style={buttonStyle}>Danger</Button>
        <Button type='danger' mode='text' style={buttonStyle}>Danger</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='warning' style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='outline' style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='dashed' style={buttonStyle}>Warning</Button>
        <Button type='warning' mode='text' style={buttonStyle}>Warning</Button>
      </div>
      <div style={buttonWrapperStyle}>
        <Button type='success' style={buttonStyle}>Success</Button>
        <Button type='success' mode='outline' style={buttonStyle}>Success</Button>
        <Button type='success' mode='dashed' style={buttonStyle}>Success</Button>
        <Button type='success' mode='text' style={buttonStyle}>Success</Button>
      </div>
    </div>
  );
}
