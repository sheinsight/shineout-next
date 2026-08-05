/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / slider / item / indicator / arrow）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / slider / item / indicator / arrow).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Carousel } from 'shineout';

export default () => {
  return (
    <Carousel
      style={{ width: '100%', height: 200 }}
      showArrow='always'
      interval={0}
      classNames={{ root: 'my-carousel' }}
      styles={{
        root: { borderRadius: 8, overflow: 'hidden' },
        slider: { borderRadius: 8 },
        indicator: { bottom: 12 },
        arrow: { opacity: 0.9 },
      }}
    >
      <div style={{ background: '#364d79', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 1</div>
      <div style={{ background: '#263c5a', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 2</div>
      <div style={{ background: '#1a2d47', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Slide 3</div>
    </Carousel>
  );
};
