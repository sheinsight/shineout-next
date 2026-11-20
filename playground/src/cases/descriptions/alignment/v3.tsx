import { Descriptions } from 'shineout-v3';
import { base } from '../_shared/data';

const colon = <span style={{ paddingInlineStart: 4 }}>:</span>;

export default function Demo() {
  return (
    <div>
      <Descriptions items={base} title='User Info' layout='horizontal' colon={colon} style={{ marginBottom: 12 }} />
      <Descriptions items={base} title='User Info' layout='horizontal' colon={colon} labelStyle={{ textAlign: 'end' }} style={{ marginBottom: 12 }} />
      <Descriptions items={base} title='User Info' layout='vertical' colon={colon} />
    </div>
  );
}
