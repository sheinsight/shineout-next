/**
 * cn - 基本用法
 *    -- 基础 Transfer 使用
 * en - Base
 *    -- Base Transfer
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
  return <Transfer data={data} keygen='id' listHeight={232} renderItem='name'></Transfer>;
};
