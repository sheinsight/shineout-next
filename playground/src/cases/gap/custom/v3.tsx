import { Button, Gap } from 'shineout-v3';

export default function Demo() {
  return (
    <div style={{ width: 500, border: '1px solid #e8ebf0', borderRadius: 4, padding: 10 }}>
      <Gap row={20} column={30}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Button type='primary' key={i}>Button</Button>
        ))}
      </Gap>
    </div>
  );
}
