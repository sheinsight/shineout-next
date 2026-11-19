import { TreeSelect } from 'shineout-v3';
import { data } from '../_shared/data';

export default function Demo() {
  return (
    <div>
      <TreeSelect
        disabled
        width={300}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
      <TreeSelect
        style={{ marginInlineStart: 24 }}
        width={300}
        disabled={(d: any) => d.title.startsWith('2-')}
        clearable
        keygen='id'
        renderItem={(node: any) => `node ${node.title}`}
        data={data}
        placeholder='Please select content'
      />
    </div>
  );
}
