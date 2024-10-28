/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
 *    -- 其中配置项 `name` 为选项名称 `value` 为选项值 `immediate` 设置为 true 后将会在点击后立即关闭弹窗并触发 onChange
 *    -- 注意，快速选择的选项如果为 new Date 等动态值，选中后的激活交互会失效。如需维持激活状态，需要使用固定值
 *    -- 配置项 `immediate` 在开启 `needConfirm` 后不生效
 * en - Quick select
 *    -- can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format
 *    -- Note that if the quick selection option is a dynamic value such as new Date, the activation interaction after selection will fail. If you need to maintain the activation state, you need to use a fixed value
 */
import React from 'react';
import { DatePicker } from 'shineout';

const QuickSelectDataTime = [
  {
    name: 'Next Week',
    value: () => {
      const now = Date.now();
      return [now, now + 7 * 24 * 60 * 60 * 1000];
    },
  },
  {
    name: 'Last Week',
    value: () => {
      const now = Date.now();
      return [now - 7 * 24 * 60 * 60 * 1000, now];
    },
  },
  {
    name: 'Next Month',
    value: () => {
      const now = Date.now();
      return [now, now + 30 * 24 * 60 * 60 * 1000];
    },
  },
  {
    name: 'Last Month',
    value: () => {
      const now = Date.now();
      return [now - 30 * 24 * 60 * 60 * 1000, now];
    },
  },
  {
    name: 'regular date',
    value: ['2019-01-01 00:00:00', '2019-12-31 23:59:59'],
  },
];

const QuickSelectData = [
  { name: 'Today', value: () => Date.now() },
  {
    name: 'A week later',
    value: () => {
      const now = Date.now();
      return now + 7 * 24 * 60 * 60 * 1000;
    },
  },
  {
    name: 'A month later',
    value: () => {
      const now = Date.now();
      const date = new Date(now);
      const year = date.getFullYear();
      const nextMonth = date.getMonth() + 1;
      const day = date.getDate();
      return new Date(year, nextMonth, day).getTime();
    },
  },
  {
    name: 'A regular date',
    value: () => {
      return '2024-02-22';
    },
  },
];

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <DatePicker
      range
      absolute
      type='datetime'
      onChange={(d) => console.log(d)}
      quickSelect={QuickSelectDataTime}
      placeholder={['Start datetime', 'End datetime']}
      style={{ display: 'block' }}
    />

    <DatePicker placeholder='Quick Date' quickSelect={QuickSelectData} />
  </div>
);

export default App;
