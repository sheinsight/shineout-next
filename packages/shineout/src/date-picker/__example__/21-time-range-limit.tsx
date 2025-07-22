/**
 * cn - 时间范围限制
 *    -- 限制选择时间必须在 applyStartTime 和 applyEndTime 之间，结束时间必须在当前时间之后
 * en - Time Range Limit
 *    -- Limit the selection time must be between applyStartTime and applyEndTime, and the end time must be after the current time
 */
import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => {
  // 申请开始时间（示例：7天前）
  const applyStartTime = new Date();
  applyStartTime.setDate(applyStartTime.getDate() - 7);
  
  // 申请结束时间（示例：7天后）
  const applyEndTime = new Date();
  applyEndTime.setDate(applyEndTime.getDate() + 7);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: 8, color: '#666' }}>
          申请时间范围：{applyStartTime.toLocaleString()} - {applyEndTime.toLocaleString()}
        </p>
        <p style={{ marginBottom: 16, color: '#666' }}>
          当前时间：{new Date().toLocaleString()}
        </p>
      </div>
      
      <DatePicker
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择时间（必须在申请时间范围内）"
        disabled={(date) => {
          // 要求1：时间必须在 applyStartTime 和 applyEndTime 之间
          if (date < applyStartTime || date > applyEndTime) {
            return true;
          }
          return false;
        }}
      />
      
      <DatePicker
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择结束时间（必须在当前时间之后）"
        disabled={(date) => {
          const now = new Date();
          // 要求2：结束时间必须在当前时间之后（可以是今天）
          // 设置为当天的开始时间进行比较
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          // 同时满足两个要求
          if (date < applyStartTime || date > applyEndTime) {
            return true;
          }
          if (date < todayStart) {
            return true;
          }
          return false;
        }}
      />
      
      <DatePicker
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="综合示例：同时满足两个条件"
        disabled={(date) => {
          const now = new Date();
          
          // 要求1：时间必须在 applyStartTime 和 applyEndTime 之间
          if (date < applyStartTime || date > applyEndTime) {
            return true;
          }
          
          // 要求2：结束时间必须在当前时间之后
          if (date < now) {
            return true;
          }
          
          return false;
        }}
      />
    </div>
  );
};

export default App;