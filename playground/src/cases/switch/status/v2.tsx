import { Switch } from 'shineout-v2';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch value={true} disabled onChange={() => {}} />
      <Switch value={false} disabled onChange={() => {}} />
    </div>
  );
}
