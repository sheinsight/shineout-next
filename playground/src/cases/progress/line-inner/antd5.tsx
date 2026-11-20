import { Progress } from 'antd-v5';

const COLOR = { info: undefined, warning: '#faad14', success: '#52c41a', danger: '#ff4d4f' };

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <Progress percent={0} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
      <Progress percent={5} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
      <Progress percent={40} format={() => '10%'} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
      <Progress percent={50} strokeColor={COLOR.warning} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
      <Progress percent={100} strokeColor={COLOR.success} format={() => '100%'} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
      <Progress percent={60} strokeColor={COLOR.danger} percentPosition={{ align: 'center', type: 'inner' }} size={['100%', 20]} />
    </div>
  );
}
