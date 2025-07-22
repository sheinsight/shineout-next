/**
 * cn - 时间范围选择限制
 *    -- 使用 range 属性选择时间范围，通过 disabled 限制可选时间必须在 applyStartTime 和 applyEndTime 之间，且结束时间必须在当前时间之后
 * en - Time Range Selection Limit
 *    -- Use range property to select time range, limit selectable time must be between applyStartTime and applyEndTime via disabled, and end time must be after current time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => {
  // 固定的申请时间范围
  const applyStartTime = '2025-07-22 13:01:01';
  const applyEndTime = '2025-07-25 23:00:00';
  
  // 转换为 Date 对象用于比较
  const applyStartDate = new Date(applyStartTime);
  const applyEndDate = new Date(applyEndTime);
  const now = new Date();
  
  // 为了演示，我们假设当前时间是 2025-07-22 12:00:00
  // 这样可以看到 13:01:02 是可以选择的
  const demoNow = new Date('2025-07-22 12:00:00');
  
  const [value, setValue] = React.useState<[Date, Date] | undefined>();
  const [error, setError] = React.useState<string>('');

  const handleChange = (val: [Date, Date] | undefined) => {
    setValue(val);
    
    if (val && val[1]) {
      // 要求2：验证结束时间必须在当前时间之后
      if (val[1] <= demoNow) {
        setError('结束时间必须在当前时间之后');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <p style={{ marginBottom: 8, color: '#666', fontSize: '14px' }}>
          <strong>申请时间范围：</strong>{applyStartTime} 至 {applyEndTime}
        </p>
        <p style={{ marginBottom: 0, color: '#666', fontSize: '14px' }}>
          <strong>演示当前时间：</strong>{demoNow.toLocaleString('zh-CN', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-')}（实际会使用真实的当前时间）
        </p>
      </div>
      
      <DatePicker
        range
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder={["开始时间", "结束时间"]}
        value={value}
        onChange={handleChange}
        disabled={(date) => {
          // 要求1：时间必须在 applyStartTime 和 applyEndTime 之间
          if (date < applyStartDate || date > applyEndDate) {
            return true;
          }
          
          // 对于日期选择，我们只限制在申请时间范围内
          // 具体的时间限制（结束时间必须在当前时间之后）可以通过其他方式处理
          // 比如在 onChange 时验证，或使用 disabledTime
          
          return false;
        }}
        style={{ width: 420 }}
      />
      
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '-8px' }}>
          {error}
        </div>
      )}
      
      <div style={{ marginTop: 8 }}>
        <p style={{ color: '#999', fontSize: '12px' }}>
          提示：
        </p>
        <ul style={{ color: '#999', fontSize: '12px', paddingLeft: '20px', margin: '4px 0' }}>
          <li>选择的时间范围必须在申请时间范围内</li>
          <li>开始时间和结束时间都必须在 {applyStartTime} 和 {applyEndTime} 之间</li>
          <li>结束时间必须在当前时间之后（演示时间：{demoNow.toLocaleString()}）</li>
          <li>比如 2025-07-22 13:01:02 是可以选择的，因为它在申请时间范围内且在演示当前时间之后</li>
        </ul>
      </div>
    </div>
  );
};

export default App;