import { Checkbox } from 'antd-v5';

export default function Demo() {
  return (
    <div>
      <div style={{ marginBottom: 12, lineHeight: 0 }}>
      <Checkbox checked={false}>not checked</Checkbox>
      <Checkbox checked>checked</Checkbox>
      <Checkbox checked indeterminate>indeterminate</Checkbox>
      </div>
      <div style={{ lineHeight: 0 }}>
      <Checkbox checked={false} disabled>not checked</Checkbox>
      <Checkbox checked disabled>checked</Checkbox>
      <Checkbox checked indeterminate disabled>indeterminate</Checkbox>
      </div>
    </div>
  );
}
