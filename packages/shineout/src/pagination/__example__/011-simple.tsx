/**
 * cn - 极简模式
 *    -- 设置`simple`属性，可以使用极简模式
 * en - Simple
 *    -- Set `simple` property to use simple mode
 */
import { Pagination } from 'shineout';

export default () => {
  return <Pagination simple defaultCurrent={1} pageSize={20} total={100}></Pagination>;
};
