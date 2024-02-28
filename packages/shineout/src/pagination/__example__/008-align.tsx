/**
 * cn - 位置
 *    -- 设置`align`属性调整分页器的位置，默认为left
 * en - Align
 *    -- Set the position of pagination by `align` property
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        align='left'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination
        align='center'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination align='right' total={100} defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};
