import { Button, Gap } from 'shineout-v3';

export default function Demo() {
  return (
    <Gap style={{ width: 400 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Button type='primary' key={i}>Button</Button>
      ))}
    </Gap>
  );
}
