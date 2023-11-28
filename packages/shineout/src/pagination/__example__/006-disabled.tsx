/**
 * cn - 禁用
 *    -- 通过设置`disabled`属性禁用分页器
 * en - Disabled
 *    -- Set `disabled` property to disable pagination.
 */
import { Pagination } from 'shineout';

export default () => {
  const total = 500;
  const renderTotal = () => {
    return `total ${total}`;
  };
  const text = {
    jumper: 'Go to {input} Page',
  };
  const layout = [renderTotal, 'links', 'jumper'];
  return (
    <Pagination
      disabled
      total={total}
      layout={layout}
      text={text}
      defaultCurrent={1}
      span={3}
    ></Pagination>
  );
};
