import { Grid } from 'shineout-v3';

const style = { color: '#fff', lineHeight: '30px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };

export default function Demo() {
  return (
    <Grid style={{ textAlign: 'center' }}>
      <Grid width={1 / 2} style={style}>
        1/2
      </Grid>
      <Grid width={1 / 2} style={{ lineHeight: '30px' }}>
        <div style={{ fontSize: 14 }}>1/2</div>
        <div>
          <Grid style={style} width={1 / 3}>
            1/3
          </Grid>
          <Grid style={{ ...style, background: '#6bb5ff' }} width={1 / 3}>
            1/3
          </Grid>
          <Grid style={style} width={1 / 3}>
            1/3
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
