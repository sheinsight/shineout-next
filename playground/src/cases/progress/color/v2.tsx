import { Progress } from 'shineout-v2';

const blue = '#7949FF';
const green = '#19A9FA';

export default function Demo() {
  return (
    <div style={{ width: 400 }}>
      <Progress value={40} color={{ '0%': green, '100%': blue }}>
        40%
      </Progress>
      <br />
      <Progress value={75} color={{ from: green, to: blue }} shape='line'>
        75%
      </Progress>
      <br />
      <Progress value={60} color={{ '0%': green, '100%': blue }} shape='circle'>
        60%
      </Progress>
    </div>
  );
}
