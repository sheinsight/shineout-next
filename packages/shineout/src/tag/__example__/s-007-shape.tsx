/**
 * cn - 标签形状
 *    -- 通过设置 `shape` 属性可以设置标签的形状，可选值为 rounded 全圆角形
 * en - Shape
 *    -- The shape of the tag can be set by setting the `shape` property. The optional value is rounded.
 */

import { Tag } from 'shineout';
export default () => {
  return (
    <div>
      <Tag>Default</Tag>
      <Tag shape='rounded'>Rounded</Tag>
    </div>
  );
};
