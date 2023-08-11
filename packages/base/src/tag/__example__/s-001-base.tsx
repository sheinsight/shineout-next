/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */

import { Tag } from '@sheinx/base';
import { useTagStyle, useInputStyle } from '@sheinx/shineout-style';

export default () => {
  const tagStyle = useTagStyle();
  const inputStyle = useInputStyle();

  const colors = [
    'info',
    'default',
    'success',
    'warning',
    'danger',
    'orange',
    'magenta',
    'purple',
    'indigo',
    'cyan',
    'neon',
    'lemon',
    'tangerine',
  ];

  const jssStyle = {
    tag: tagStyle,
    input: inputStyle,
  };

  return (
    <div>
      {colors.map((i, idx) => {
        return (
          <Tag size='large' key={idx} jssStyle={jssStyle} color={i} onClose>
            {i}
          </Tag>
        );
      })}
    </div>
  );
};
