/**
 * cn -
 *    -- `loading`属性支持数组类型，可以对每个列表设置不同的加载状态
 * en -
 *    -- The `loading` property supports array types, which can set different loading states for each list
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return (
    <Transfer
      data={data}
      loading={[true, false]}
      keygen='id'
      listHeight={232}
      renderItem='name'
    ></Transfer>
  );
};
