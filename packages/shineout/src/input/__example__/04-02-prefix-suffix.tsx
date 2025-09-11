/**
 * cn - 前后缀
 *    -- 通过指定 `prefix` 和 `suffix` 来在输入框内添加前缀和后缀
 * en - Prefix and suffix
 *    -- Set `prefix` and `suffix` to add prefix and suffix to the input box
 */

import React from 'react';
import { Input, icons } from 'shineout';

function MyIcon(props: any){
  const style={
    width: 14,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    color: 'var(--soui-input-icon-color,var(--soui-neutral-text-4,#666C7C))',
    ...props.style
  }
    return <div style={style}>{props.children}</div>;
}


const App: React.FC = () => (
  <Input
    placeholder='please enter'
    width={300}
    prefix={<MyIcon style={{ marginRight: 8, flexShrink: 0 }}>{icons.Calendar}</MyIcon>}
    suffix={<MyIcon style={{ marginLeft: 8, flexShrink: 0 }}>{icons.Search}</MyIcon>}
  />
);

export default App;
