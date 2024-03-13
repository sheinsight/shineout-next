/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项, 日期可以是 Date, 时间戳, 或者字符串,字符串需要和所格式填写的 format 一致
 * en - Quick select
 *    -- can configure some options for quick selection. The date can be Date, timestamp, or string. The string needs to be in the same format as the format
 */
import React from 'react';
import { DatePicker } from 'shineout';

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
      return now + 30 * 24 * 60 * 60 * 1000;
    },
  },
];
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
    name: 'special date',
    value: ['2019-01-01 00:00:00', '2019-12-31 23:59:59'],
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
