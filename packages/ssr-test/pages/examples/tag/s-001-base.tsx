/**
 * cn - 基本用法
 *    -- 标签常用的 5 种基本功能，默认、信息、危险、警告、成功
 *    -- 注意，`type` 属性将弃用，请使用 `color` 属性
 * en - Base
 *    -- The five basic functions of the tag, default, info, danger, warning, success
 *   -- Note that the `type` property will be deprecated, please use the `color` property
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['default', 'info', 'danger', 'warning', 'success'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div>
      {TagColor.map((item, index) => (
        <Tag key={index} color={item as any}>
          {capitalizeFirstLetter(item)}
        </Tag>
      ))}
    </div>
  );
};
