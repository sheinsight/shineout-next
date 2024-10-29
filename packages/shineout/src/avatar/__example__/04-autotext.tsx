/**
 * cn - 字符大小自适应
 *    -- 头像支持字符自适应，即字符长度过长时，头像可自动调整字符以便呈现完整内容,也可使用 `gap` 来设置字符距离左右两侧边界单位像素
 * en - Auto text size
 *    -- Avatar supports character adaptation, that is, when the character length is too long, the avatar can automatically adjust the character to present the complete content
 */
import React from 'react';
import { Avatar } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <Avatar>J</Avatar>
      <Avatar>Jay</Avatar>
      <Avatar>Janny</Avatar>
    </div>
  );
};
