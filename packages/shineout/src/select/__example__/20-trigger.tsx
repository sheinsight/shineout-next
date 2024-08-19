/**
 * cn - 触发方式
 *    -- Select 通过`trigger`属性设置面板的打开方式。设置为`hover`时，鼠标移入时触发，默认为点击触发
 * en - Trigger
 *    -- Set the trigger property to set the way the panel opens. Set to `hover` to trigger on mouse enter, default click trigger
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select
        width={300}
        trigger='hover'
        clearable
        data={primitiveData}
        keygen
        placeholder='Hover Me & Select Color'
      />
    </div>
  );
};
