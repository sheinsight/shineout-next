/**
 * cn - 任意等分
 *    -- Grid 的栅格体系是动态生成，可以实现任意等份
 * en - Arbitrary
 *    -- Grid system is dynamic generated and can be any number
 */
import React, { useState } from 'react';
import { Grid, Slider, TYPE } from 'shineout';

type SliderProps = TYPE.Slider.Props<number>;
type SliderOnChange = SliderProps['onChange'];

const gridStyle: React.CSSProperties = {
  color: '#fff',
  paddingInlineStart: 8,
  background: '#197afa',
  fontSize: 14,
};
const style: React.CSSProperties = { background: '#e8ebf0', marginBottom: 4, lineHeight: '30px' };

const App: React.FC = () => {
  const [count, setCount] = useState(5);

  const handleCountChange: SliderOnChange = (v) => {
    setCount(v);
  };
  return (
    <div>
      <Grid stretch>
        {Array.from({ length: 8 })
          .map((_, i) => i + 1)
          .map((i) => (
            <Grid key={i} width={1 / 8}>
              {123123}
            </Grid>
          ))}
      </Grid>

      {/* <Slider
        step={0}
        value={count}
        formatValue={false}
        onChange={handleCountChange}
        scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}
      />

      <div style={{ height: 20 }} />

      {Array.from({ length: count }).map((_n, i) => (
        <div key={i} style={style}>
          <Grid width={(i + 1) / count} style={gridStyle}>
            {`${i + 1}/${count}`}
          </Grid>
        </div>
      ))} */}
    </div>
  );
};

export default App;
