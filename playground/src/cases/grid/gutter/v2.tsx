import { Grid } from 'shineout-v2';

const a = { color: '#fff', lineHeight: '30px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };
const b = { ...a, background: '#6bb5ff' };

export default function Demo() {
  return (
    <div style={{ background: '#e8ebf0' }}>
      <Grid gutter={8}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid key={i} width={1 / 8}>
            <div style={(i + 1) % 2 === 0 ? b : a}>1/8</div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
