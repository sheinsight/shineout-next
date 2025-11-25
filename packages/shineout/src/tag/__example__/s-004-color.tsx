/**
 * cn - 多色标签
 *    -- 除常用 5 种常用的基本功能色外，组件还提供了其他色系的标签
 *    -- 注意，`type` 属性将弃用，`color` 属性同样支持 type 同属性值的样式
 * en - Color
 *    -- In addition to the five basic functions of the commonly used tag, the component also provides tags of other colors
 *    -- Note that the `type` property will be deprecated, and the `color` property also supports the style of the same property value as type
 */

import { TYPE, Tag } from 'shineout';

type TagColorType = Exclude<TYPE.Tag.Props['color'], undefined>
type TagModeType = Exclude<TYPE.Tag.Props['mode'], undefined>

export default () => {
  const TagColor: TagColorType[] = ['tangerine', 'magenta', 'purple', 'indigo', 'cyan', 'neon', 'lemon', 'brown', 'orange'];
  const TagMode: TagModeType[] = ['bright', 'fill', 'outline', 'brightOutline'];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      {TagMode.map((mode, midx) => {
        return (
          <div key={midx} style={{ marginBottom: 24 }}>
            {TagColor.map((color, cidx) => (
              <Tag mode={mode} key={cidx} color={color}>
                {capitalizeFirstLetter(color)}
              </Tag>
            ))}
          </div>
        );
      })}
    </div>
  );
};
