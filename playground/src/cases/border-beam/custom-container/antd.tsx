import { forwardRef, type HTMLAttributes } from 'react';
import { BorderBeam } from 'antd';
import { panel, subText } from '../_shared/panel';

const CustomPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => <div ref={ref} {...props} />);
CustomPanel.displayName = 'CustomPanel';

export default function Demo() {
  return (
    <BorderBeam>
      <CustomPanel style={{ ...panel, width: 420, maxWidth: '100%', minHeight: 160, lineHeight: 1.6 }}>
        <strong>Custom panel</strong>
        <p style={subText}>Supporting content inside a ref-forwarding container.</p>
      </CustomPanel>
    </BorderBeam>
  );
}
