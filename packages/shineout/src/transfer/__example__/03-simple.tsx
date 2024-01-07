/**
 * cn - 简单模式
 *    -- 通过开启 `simple` 属性，可以使用简单模式
 *    -- 简单模式下`selectedKeys`和`onSelectChange`不生效
 * en - Simple
 *    -- By turning on the `simple` property, you can use the simple mode. In simple mode, `selectKeys` and `onSelectChange` are not valid
 *    -- In simple mode, `selectKeys` and `onSelectChange` are not valid
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
      simple
      data={data}
      defaultValue={['id-7', 'id-8', 'id-9']}
      keygen='id'
      format='id'
      listHeight={232}
      renderItem='name'
    ></Transfer>
  );
};
