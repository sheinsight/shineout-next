import { DatePicker } from 'shineout-v3';

export default function Demo() {
  return (
    <DatePicker
      type='date'
      renderDate={({ date, className }: any) => {
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isMonday = date.getDay() === 1;
        return (
          <div
            className={className}
            style={isWeekend ? { cursor: 'not-allowed', backgroundColor: '#E8EBF0' } : undefined}
          >
            <span style={{ boxSizing: 'content-box', border: isMonday ? '1px solid #1d4ed8' : 'none' }}>
              {date.getDate()}
            </span>
          </div>
        );
      }}
    />
  );
}
