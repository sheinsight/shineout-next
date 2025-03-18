/**
 * cn -
 *    -- 可以通过设置 `info` 为函数去自定义提示信息;
 *    -- 如果 `info` 返回类型为 Error，不会隐藏；
 *    -- 可以通过设置 `popoverProps` 来自定义弹窗的属性， 参考Popover组件的属性。
 * en -
 *    -- can customize the info by setting info as a function;
 *    -- if the functio return an Error , the info doesn't hide;
 *    -- can customize the popover by setting `popoverProps` , reference to Popover component's props.
 */
import React from 'react';
import { Textarea } from 'shineout';

const renderInfo = (value?: string) => {
  if (!value || value.length === 0) return null;
  const text = `total is  ${value.length}`;
  if (value.length <= 20) return text;
  return new Error(text);
};

const App: React.FC = () => (
  <Textarea
    rows={4}
    trim
    placeholder='input something'
    info={renderInfo}
    popoverProps={{
      position: 'bottom-left',
      getPopupContainer: () => document.body,
    }}
  />
);

export default App;
