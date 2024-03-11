/**
 * cn - 大数据性能
 *    -- Transfer 默认开启虚拟列表，支持大数据渲染
 *    -- 本例数据量为10万
 * en - Big data
 *    -- Transfer turns on virtual list by default, supports rendering of large data
 *    -- The amount of data in this example is 100,000
 */
import { Transfer } from 'shineout';

const data: { id: string; name: string }[] = [];

for (let i = 0; i < 100000; i++) {
  data.push({
    id: `id-${i}`,
    name: `name-${i + 1}`,
  });
}

export default () => {
  return <Transfer data={data} keygen='id' listHeight={232} renderItem='name'></Transfer>;
};
