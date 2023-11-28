/**
 * cn - 尺寸
 *    -- 通过`size`属性设置分页器的尺寸
 * en - Size
 *    -- Set the size of pagination by `size` property.
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        size='small'
        total={100}
        defaultCurrent={1}
        span={3}
        style={{ marginBottom: 24 }}
      ></Pagination>
      <Pagination total={100} defaultCurrent={1} span={3} style={{ marginBottom: 24 }}></Pagination>
      <Pagination size='large' total={100} defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};
