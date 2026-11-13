import { Button, Gap } from 'shineout-v3';

export default function Demo() {
  return (
    <Gap style={{ width: 400, flexDirection: 'column' }} row={10}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Button type='primary' key={i}>Button</Button>
      ))}
    </Gap>
  );
}
