/**
 * cn - 样式
 *    -- 配置`mode`属性切换不同风格的分页器，有文字、线框两种样式
 * en - Mode
 *    -- Set `mode` property to change the style of pagination
 */
import { Pagination } from 'shineout';

export default () => {
  return (
    <div>
      <Pagination
        style={{ marginBottom: 24 }}
        total={100}
        mode='text'
        defaultCurrent={1}
        span={3}
      ></Pagination>
      <Pagination total={100} mode='outline' defaultCurrent={1} span={3}></Pagination>
    </div>
  );
};
