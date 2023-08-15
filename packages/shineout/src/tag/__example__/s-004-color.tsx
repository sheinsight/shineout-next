/**
 * cn - 多色标签
 *    -- 除常用 5 种常用的基本功能色外，组件还提供了其他色系的标签。
 *    -- 注意，`type` 属性将弃用，`color` 属性同样支持 type 同属性值的样式。
 * en - Color
 *    -- In addition to the five basic functions of the commonly used tag, the component also provides tags of other colors.
 *    -- Note that the `type` property will be deprecated, and the `color` property also supports the style of the same property value as type.
 */

import { Tag } from 'shineout';
export default () => {
  const TagColor = ['tangerine', 'magenta', 'purple', 'indigo', 'cyan', 'neon', 'lemon', 'orange'];
  const TagMode = ['bright', 'fill', 'outline', 'brightOutline'];

  return (
    <div>
      {TagMode.map((mode, midx) => {
        return (
          <div key={midx} style={{ marginBottom: 24 }}>
            {TagColor.map((color, cidx) => (
              <Tag mode={mode as any} key={cidx} color={color as any}>
                Tag
              </Tag>
            ))}
          </div>
        );
      })}
    </div>
  );
};
