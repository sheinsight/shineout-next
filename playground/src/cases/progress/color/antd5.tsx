import { Progress } from 'antd-v5';

const blue = '#7949FF';
const green = '#19A9FA';

export default function Demo() {
  return (
    <div style={{ width: 400 }}>
      <Progress percent={40} strokeColor={{ '0%': green, '100%': blue }} />
      <br />
      <Progress
        percent={75}
        strokeColor={{ from: green, to: blue }}
        percentPosition={{ align: 'center', type: 'inner' }}
        size={['100%', 20]}
      />
      <br />
      <Progress type='circle' percent={60} strokeColor={{ '0%': green, '100%': blue }} />
    </div>
  );
}
