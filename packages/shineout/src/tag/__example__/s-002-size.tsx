/**
 * cn - 标签尺寸
 *    -- 标签尺寸分为 小、中、大 3 种
 * en - Size
 *    -- The size of the tag is divided into small, default and large.
 */

import { Tag } from 'shineout';
export default () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Tag size='small'>Small</Tag>
        <Tag>Default</Tag>
        <Tag size='large'>Large</Tag>
      </div>
      <div>
        <Tag size='small' onClose>
          Small
        </Tag>
        <Tag onClose>Default</Tag>
        <Tag size='large' onClose>
          Large
        </Tag>
      </div>
    </div>
  );
};
