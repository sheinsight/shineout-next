/**
 * cn - 加载中按钮
 *    -- 通过设置 loading 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件
 * en - Loading
 *    -- Set loading to make a button loading. The button in the loading state does not trigger the click event.
 */

import { Button } from 'shineout';
export default () => {
  const buttonStyle = {
    margin: 0,
  };

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <Button type='primary' loading style={buttonStyle}>
        Primary
      </Button>
      <Button type='primary' loading shape='square' style={buttonStyle}></Button>
    </div>
  );
};
