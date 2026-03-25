/**
 * cn - 只能选末级
 *    -- 设置 `final` 为 true，仅末级节点可触发选择，value 包含完整路径
 * en - Can only choose the last level
 *   -- Set `final` to true, only the last level node can trigger selection, and the value contains the full path
 */

import React from 'react'
import { Cascader, Form } from 'shineout'

const data = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
]

const App: React.FC = () => (
  <div>
    <Form.Item label="Single">
      <Cascader
        onFilter={text => d => d.value.indexOf(text) >= 0}
        final
        finalDismiss
        data={data}
        keygen="value"
        renderItem={n => `${n.value}`}
      />
    </Form.Item>
    <Form.Item label="multiple">
      <Cascader
        mode={2}
        final
        onFilter={text => d => d.value.indexOf(text) >= 0}
        data={data}
        keygen="value"
        renderItem={n => `${n.value}`}
      />
    </Form.Item>
  </div>
)

export default App
