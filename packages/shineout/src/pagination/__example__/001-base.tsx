/**
 * cn - 基本用法
 *    -- 最基本的使用
 * en - Base
 *    -- The basic usage
 */
import { Pagination } from 'shineout';

export default () => {
  return <Pagination total={10000} defaultCurrent={1} span={3}></Pagination>;
};
