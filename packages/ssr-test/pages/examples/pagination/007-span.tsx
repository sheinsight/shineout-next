/**
 * cn - 按钮数量
 *    -- 通过`span`属性设置按钮数量
 * en - Span
 *    -- Set the number of buttons by `span` property
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination total={100} defaultCurrent={1} span={5} style={{ marginBottom: 24 }}></Pagination>
      <Pagination total={1000} defaultCurrent={10} span={10}></Pagination>
    </div>
  );
};
