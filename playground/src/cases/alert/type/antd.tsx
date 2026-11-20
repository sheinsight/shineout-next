import { Alert } from 'antd';

const box = { display: 'flex', flexWrap: 'wrap', gap: 24, width: 800 } as const;
const item = { width: 'calc(50% - 12px)' };

export default function Demo() {
  return (
    <div style={box}>
      <Alert showIcon type='info' style={item} title='This is informative text.' />
      <Alert showIcon type='success' style={item} title='This is success text.' />
      <Alert showIcon type='warning' style={item} title='This is warning text.' />
      <Alert showIcon type='error' style={item} title='This is danger text.' />
    </div>
  );
}
