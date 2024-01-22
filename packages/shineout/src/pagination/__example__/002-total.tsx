/**
 * cn - 带总条数的
 *    -- 通过自定义 layout 属性展示总条数
 * en - Total
 *    -- Show total by custom layout property.
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 500;
  const renderTotal = () => {
    return `total ${total}`;
  };
  const layout = [renderTotal, 'links'] as any;
  return <Pagination total={total} layout={layout} defaultCurrent={1} span={3}></Pagination>;
};
