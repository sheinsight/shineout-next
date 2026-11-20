import { DatePicker } from 'antd-v5';
import dayjs from 'dayjs';

export default function Demo() {
  return (
    <DatePicker
      cellRender={(current, info) => {
        if (info.type !== 'date') return info.originNode;
        const d = dayjs(current as any);
        const isWeekend = d.day() === 0 || d.day() === 6;
        const isMonday = d.day() === 1;
        return (
          <div
            className='ant-picker-cell-inner'
            style={isWeekend ? { cursor: 'not-allowed', backgroundColor: '#E8EBF0' } : undefined}
          >
            <span style={{ boxSizing: 'content-box', border: isMonday ? '1px solid #1d4ed8' : 'none' }}>{d.date()}</span>
          </div>
        );
      }}
    />
  );
}
