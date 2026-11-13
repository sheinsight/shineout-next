import { DatePicker } from 'antd';

// 节点对应：root ↔ root；header（输入区）↔ input；popup ↔ popup.root；popupHeader ↔ popup.header；
// cell ↔ popup.item；popupFooter ↔ popup.footer
export default function Demo() {
  return (
    <DatePicker
      placeholder='Select date'
      showNow
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        input: { background: '#f0f7ff' },
        popup: {
          root: { borderRadius: 4 },
          header: { background: '#fafafa' },
          item: { borderRadius: 3 },
          footer: { padding: 8 },
        },
      }}
    />
  );
}
