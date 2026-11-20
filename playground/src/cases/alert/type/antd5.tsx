import { Alert } from 'antd-v5';

const box = { display: 'flex', flexWrap: 'wrap', gap: 24, width: 800 } as const;
const item = { width: 'calc(50% - 12px)' };

export default function Demo() {
  return (
    <div style={box}>
      <Alert showIcon type='info' style={item} message='This is informative text.' />
      <Alert showIcon type='success' style={item} message='This is success text.' />
      <Alert showIcon type='warning' style={item} message='This is warning text.' />
      <Alert showIcon type='error' style={item} message='This is danger text.' />
    </div>
  );
}
