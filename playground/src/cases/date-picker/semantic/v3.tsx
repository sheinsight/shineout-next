import { DatePicker } from 'shineout-v3';

export default function Demo() {
  return (
    <DatePicker
      type='date'
      placeholder='Select date'
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 6 },
        header: { background: '#f0f7ff' },
        popup: { borderRadius: 4 },
        popupHeader: { background: '#fafafa' },
        cell: { borderRadius: 3 },
        popupFooter: { padding: 8 },
      }}
      showSelNow
    />
  );
}
