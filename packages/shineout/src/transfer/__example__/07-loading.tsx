/**
 * cn - 加载中
 *    -- 设置`loading`属性可以显示加载中状态
 * en - Loading
 *    -- Set the `loading` property to display the loading state
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
  return <Transfer data={data} loading keygen='id' listHeight={232} renderItem='name'></Transfer>;
};
