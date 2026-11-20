import { Switch } from 'shineout-v3';

export default function Demo() {
  return (
    <Switch
      defaultValue
      content={['On', 'Off']}
      styles={{
        root: { borderRadius: 4 },
        indicator: { borderRadius: 4 },
        content: { fontSize: 12, fontWeight: 500 },
      }}
    />
  );
}
