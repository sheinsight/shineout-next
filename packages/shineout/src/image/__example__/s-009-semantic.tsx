/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / img / placeholder / error）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / img / placeholder / error).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Image } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <Image
        fit='fill'
        width={128}
        height={128}
        target='_modal'
        src='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        href='https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png'
        styles={{
          root: { borderRadius: 12, overflow: 'hidden' },
        }}
        classNames={{
          root: 'shineout-image-root',
          img: 'shineout-image-img',
          placeholder: 'shineout-image-placeholder',
          error: 'shineout-image-error',
        }}
        placeholder={<div style={{ textAlign: 'center', lineHeight: '150px' }}>Loading...</div>}
      />
      <Image
        width={128}
        height={128}
        src='invalid-url'
        styles={{
          root: { borderRadius: 12 },
          error: { background: '#fff2f0', color: '#ff4d4f' },
        }}
      />
    </div>
  );
};
