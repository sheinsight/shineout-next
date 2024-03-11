/**
 * cn - 标签样式
 *    -- 标签样式分为 亮色、填充、线框、亮色线框 4 种
 * en - Mode
 *    -- The mode of the tag is divided into bright, fill, outline, brightOutline line 4 kinds
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['default', 'info', 'danger', 'warning', 'success'];
  const TagMode = ['bright', 'fill', 'outline', 'brightOutline'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {TagMode.map((mode, midx) => {
        return (
          <div key={midx} style={{ marginBottom: midx === TagMode.length - 1 ? 0 : 24 }}>
            {TagColor.map((color, cidx) => (
              <Tag mode={mode as any} key={cidx} color={color as any}>
                {capitalizeFirstLetter(color)}
              </Tag>
            ))}
          </div>
        );
      })}
    </div>
  );
};
