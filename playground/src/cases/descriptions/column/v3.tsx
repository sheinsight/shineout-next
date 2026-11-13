import { Descriptions } from 'shineout-v3';
import { three } from '../_shared/data';

export default function Demo() {
  return (
    <>
      <Descriptions items={three} title='User Info' layout='horizontal' column={1} style={{ marginBottom: 12 }} />
      <Descriptions items={three} title='User Info' layout='horizontal' column={1} labelStyle={{ textAlign: 'end' }} />
    </>
  );
}
