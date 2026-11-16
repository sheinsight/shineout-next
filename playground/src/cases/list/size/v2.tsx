import { List } from 'shineout-v2';
import { PEOPLE4, type Person } from '../_shared/data';

const SIZES = ['small', 'default', 'large'] as const;

// 原示例用 Radio.Group 切换 size（Radio 还没迁移），这里把三种尺寸同时渲染
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {SIZES.map((size) => (
        <List
          key={size}
          keygen='id'
          bordered
          size={size}
          data={PEOPLE4}
          renderItem={(d: Person) => <div>{`Name: ${d.firstName}-${d.lastName}`}</div>}
        />
      ))}
    </div>
  );
}
