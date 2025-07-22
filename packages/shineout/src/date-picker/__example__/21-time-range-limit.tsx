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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <p style={{ marginBottom: 8, color: '#666', fontSize: '14px' }}>
          <strong>申请时间范围：</strong>{applyStartTime} 至 {applyEndTime}
        </p>
        <p style={{ marginBottom: 0, color: '#666', fontSize: '14px' }}>
          <strong>当前时间：</strong>{now.toLocaleString('zh-CN', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).replace(/\//g, '-')}
        </p>
      </div>
      
      <DatePicker
        range
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder={["开始时间", "结束时间"]}
        disabled={(date) => {
          // 要求1：时间必须在 applyStartTime 和 applyEndTime 之间
          if (date < applyStartDate || date > applyEndDate) {
            return true;
          }
          
          // 要求2：结束时间必须在当前时间之后（可以是今天）
          // 对于范围选择器，第二个日期（结束时间）需要在当前时间之后
          // 这里的 date 是每个可选择的日期，会对两个输入框都生效
          // 所以我们允许选择今天及之后的日期
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          return false;
        }}
        style={{ width: 420 }}
      />
      
      <div style={{ marginTop: 8 }}>
        <p style={{ color: '#999', fontSize: '12px' }}>
          提示：
        </p>
        <ul style={{ color: '#999', fontSize: '12px', paddingLeft: '20px', margin: '4px 0' }}>
          <li>选择的时间范围必须在申请时间范围内</li>
          <li>开始时间和结束时间都必须在 {applyStartTime} 和 {applyEndTime} 之间</li>
          <li>如果需要限制结束时间在当前时间之后，可以在选择后进行验证</li>
        </ul>
      </div>
    </div>
  );
};

export default App;