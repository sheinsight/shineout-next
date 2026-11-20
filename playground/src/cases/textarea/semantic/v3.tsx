import { Textarea } from 'shineout-v3';

export default function Demo() {
  return (
    <Textarea
      placeholder='Please input'
      rows={3}
      styles={{
        root: { borderRadius: 8, border: '2px solid #1890ff' },
        textarea: { fontFamily: 'monospace', fontSize: 14 },
      }}
    />
  );
}
