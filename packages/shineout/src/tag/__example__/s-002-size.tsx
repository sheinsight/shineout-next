/**
 * cn - 标签尺寸
 *    -- 标签尺寸分为 小、中、大 3 种。
 * en - Size
 *    -- The size of the tag is divided into small, default and large.
 */

import { Tag } from 'shineout';
export default () => {
  return (
    <div>
      <Tag size='small'>Smal</Tag>
      <Tag>Default</Tag>
      <Tag size='large' shape='rounded'>
        Large
      </Tag>
    </div>
  );
};
