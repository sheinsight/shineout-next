import { Grid } from 'shineout-v3';

const COUNT = 5;
const gridStyle = { color: '#fff', paddingInlineStart: 8, background: '#197afa', fontSize: 14 };
const style = { background: '#e8ebf0', marginBottom: 4, lineHeight: '30px' };

export default function Demo() {
  return (
    <div>
      {Array.from({ length: COUNT }).map((_, i) => (
        <div key={i} style={style}>
          <Grid width={(i + 1) / COUNT} style={gridStyle}>
            {`${i + 1}/${COUNT}`}
          </Grid>
        </div>
      ))}
    </div>
  );
}
