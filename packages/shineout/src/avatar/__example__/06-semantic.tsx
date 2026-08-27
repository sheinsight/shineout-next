/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点。
 *    -- Avatar.Group 的 `root` key 会传递给所有子 Avatar，子 Avatar 可通过自身 prop 覆盖。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes.
 *    -- Avatar.Group's `root` key is passed to all child Avatars. Individual Avatar can override via its own prop.
 */
import React from 'react';
import { Avatar } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {/* 单独使用 Avatar */}
      <Avatar
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png'
        styles={{
          root: { border: '2px solid #1890ff', boxShadow: '0 2px 8px rgba(24,144,255,0.3)' },
        }}
      />

      {/* Avatar.Group 通过 root key 统一设置子 Avatar 样式 */}
      <Avatar.Group
        styles={{
          group: { gap: 8 },
          root: { border: '2px solid #52c41a' },
        }}
      >
        <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/01.png' />
        <Avatar src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/02.png' />
        {/* 子 Avatar 自身 prop 可覆盖 Group 的设置 */}
        <Avatar
          src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/avatar/03.png'
          styles={{ root: { border: '2px solid #ff4d4f' } }}
        />
      </Avatar.Group>
    </div>
  );
};
