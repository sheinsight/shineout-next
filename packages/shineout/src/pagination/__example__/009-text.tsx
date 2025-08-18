/**
 * cn - 自定义文案
 *    -- 通过编辑`text`属性的prev、next、jumper、page属性值自定义分页器文案
 *    -- prev 上一页按钮文案
 *    -- next 下一页按钮文案
 *    -- page 每页数量列表选择器文案
 *    -- jumper 跳转输入框文案，其中 {input} 占位符代表输入框
 * en - Jumper
 *    -- Show jumper by setting `jumper` value of `layout` property
 *    -- prev Prev button text
 *    -- next Next button text
 *    -- page Page button text
 *    -- jumper Jumper text, the placeholder {input} represents the input box
 */
import { TYPE, Pagination } from 'shineout';

export default () => {
  const info = (props: TYPE.Pagination.Props) => {
    const current = props.current || props.defaultCurrent || 1;
    const pageSize = props.pageSize || 10;
    const total = props.total || 0;
    let to = current * pageSize;
    if (to > total) to = total;
    const from = (current - 1) * pageSize + 1;
    return `${from} to ${to} of ${total} items`;
  };
  const total = 256;
  const layout: TYPE.Pagination.Props['layout'] = ['links', 'list', info];
  const text = {
    prev: 'Previous',
    next: 'Next',
    page: ' / page',
  };

  return (
    <Pagination total={total} text={text} layout={layout} defaultCurrent={1} span={3} />
  );
};
