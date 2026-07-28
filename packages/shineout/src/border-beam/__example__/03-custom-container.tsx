/**
 * cn - 自定义容器
 *    -- 使用将 ref 透传到真实 DOM 的自定义组件
 * en - Custom container
 *    -- Use a custom component that forwards its ref to a real DOM element
 */
import React from 'react';
import { BorderBeam } from 'shineout';

const CustomPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />,
);

CustomPanel.displayName = 'CustomPanel';

export default () => (
  <BorderBeam>
    <CustomPanel
      style={{
        position: 'relative',
        width: 420,
        maxWidth: '100%',
        minHeight: 160,
        padding: 24,
        border: '1px solid var(--soui-neutral-border-1)',
        borderRadius: 8,
        background: 'var(--soui-neutral-fill-1)',
        color: 'var(--soui-neutral-text-5)',
        lineHeight: 1.6,
      }}
    >
      <strong>Custom panel</strong>
      <p style={{ margin: '8px 0 0', color: 'var(--soui-neutral-text-4)' }}>
        Supporting content inside a ref-forwarding container.
      </p>
    </CustomPanel>
  </BorderBeam>
);
