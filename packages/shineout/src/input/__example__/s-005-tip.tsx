/**
 * cn - 提示
 *    -- 通过 tip 属性，可以自定义配置组件的提示信息。可以通过传入自定义 ReactDOM 来渲染你想要的内容。
 * en - tip
 *    -- You can customize the prompt message of the component by using the 'tip' attribute. You can also render the desired content by passing a custom ReactDOM.
 */

import { Input } from 'shineout';
export default () => {
  return <Input placeholder='input something' tip={'please input something'} />;
};
