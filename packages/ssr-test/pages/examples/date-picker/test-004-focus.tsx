/**
 * cn - focus blur 事件
 */

import React from 'react';
import { DatePicker } from 'shineout';

const App: React.FC = () => (
  <DatePicker
    showSelNow
    inputable
    range
    absolute
    type={'date'}
    onFocus={() => {
      console.log('focus');
    }}
    onBlur={() => {
      console.log('blur');
    }}
  />
);

export default App;
