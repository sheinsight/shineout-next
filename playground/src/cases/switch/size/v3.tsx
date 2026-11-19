import { Switch } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch size={'small'} />
      <Switch />
      <Switch size={'large'} />
    </div>
  );
}
