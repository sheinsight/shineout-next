/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / track / indicator / scale）。
 *    -- indicator 的滑块圆点由 ::after 伪类绘制，需通过 classNames 挂载自定义 class 配合 CSS 控制。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / track / indicator / scale).
 *    -- The indicator dot is drawn via ::after pseudo-element, use classNames to attach a custom class for CSS control.
 */
import React from 'react';
import { Slider } from 'shineout';

export default () => {
  return (
    <>
      <style>{`
        .square-handle::after {
          border-radius: 0 !important;
          border-width: 4px !important;
          width: 16px !important;
          height: 16px !important;
        }
      `}</style>
      <Slider
        defaultValue={40}
        scale={[0, 25, 50, 75, 100]}
        classNames={{ indicator: 'square-handle' }}
        styles={{
          root: { padding: '20px 10px' },
          track: { height: 6, borderRadius: 3 },
          scale: { marginTop: 8, fontSize: 12 },
        }}
      />
    </>
  );
};
