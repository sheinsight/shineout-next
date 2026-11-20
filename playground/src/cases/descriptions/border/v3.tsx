import { Descriptions } from 'shineout-v3';
import { longAddress } from '../_shared/data';

export default function Demo() {
  return (
    <div>
      <Descriptions items={longAddress} title='User Info' layout='horizontal' border tableLayout='fixed' style={{ marginBottom: 24 }} />
      <Descriptions items={longAddress} title='User Info' layout='horizontal' border tableLayout='fixed' labelStyle={{ textAlign: 'end' }} style={{ marginBottom: 24 }} />
      <Descriptions items={longAddress} title='User Info' layout='vertical' border tableLayout='fixed' column={4} />
    </div>
  );
}
