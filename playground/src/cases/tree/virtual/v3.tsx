import { Tree } from 'shineout-v3';
import { makeNested } from '../_shared/data';

const data = makeNested([100, 10, 10, 10]);

export default function Demo() {
  return (
    <div style={{ height: 300 }}>
      <Tree
        virtual
        line
        data={data}
        defaultExpandAll
        keygen='id'
        renderItem={(node: any) => <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>}
      />
    </div>
  );
}
