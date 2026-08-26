/**
 * Avatar Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { AvatarGroupSemanticKey } from '@sheinx/base';
import { Avatar } from 'shineout';

const AvatarSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png' />
    <Avatar shape='square'>U</Avatar>
    <Avatar.Group>
      <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png' />
      <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/02.png' />
      <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/03.png' />
    </Avatar.Group>
  </div>
);

const avatarSemantic: SemanticSchema<AvatarGroupSemanticKey> = {
  keys: [
    {
      key: 'group',
      cn: 'Avatar.Group 容器元素',
      en: 'Avatar.Group container element',
      version: '3.10.0',
      example: `<Avatar.Group classNames={{ group: 'my-group' }} styles={{ group: { gap: 8 } }}>...</Avatar.Group>`,
    },
    {
      key: 'root',
      cn: 'Avatar 最外层容器（可从 Avatar.Group 向子 Avatar 传递）',
      en: 'Avatar outermost wrapper (can be passed from Avatar.Group to child Avatars)',
      version: '3.10.0',
      example: `<Avatar classNames={{ root: 'my-avatar' }} styles={{ root: { border: '2px solid #1890ff' } }} />`,
    },
  ],
  demo: AvatarSemanticDemo,
};

export default avatarSemantic;
