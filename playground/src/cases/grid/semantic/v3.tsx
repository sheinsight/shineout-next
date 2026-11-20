import { Grid } from 'shineout-v3';

const cell = { padding: 12, background: '#e6f4ff', textAlign: 'center' as const, borderRadius: 4 };

export default function Demo() {
  return (
    <Grid gutter={16} styles={{ root: { padding: 16, background: '#fafafa', borderRadius: 8 } }}>
      <Grid width={1 / 3}><div style={cell}>1/3</div></Grid>
      <Grid width={1 / 3}><div style={cell}>1/3</div></Grid>
      <Grid width={1 / 3}><div style={cell}>1/3</div></Grid>
    </Grid>
  );
}
