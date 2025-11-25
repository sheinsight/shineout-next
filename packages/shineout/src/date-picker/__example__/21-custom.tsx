/**
 * cn - 定制日期单元格
 *    -- 可以通过设置 `renderDate` 属性定制日期单元格的渲染内容
 * en - Custom cell render
 *    -- You can customize the rendering content of the date cell by setting the `renderDate` property
 */
import React from 'react';
import { DatePicker } from 'shineout';


const App: React.FC = () => (
  <div>
    <DatePicker
      type='date'
      renderDate={({ date, className }) => {
        const day = date.getDate();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isMonday = date.getDay() === 1;
        const contentStyle = isWeekend
          ? {
              cursor: 'not-allowed',
              backgroundColor: isWeekend ? 'var(--soui-neutral-fill-3, #E8EBF0)' : undefined,
            }
          : undefined;
        return (
          <div className={className} style={contentStyle}>
            <span
              style={{
                boxSizing: 'content-box',
                border: isMonday ? '1px solid var(--soui-brand-6)' : 'none',
              }}
            >
              {day}
            </span>
          </div>
        );
      }}
    />
  </div>
);

export default App;
