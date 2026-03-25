/**
 * cn - hack: value 仅返回末级
 *    -- 不使用 `final='leaf'`，通过 onChange 手动截取末级 key 实现相同效果
 * en - hack: Value only contains leaf
 *   -- Without `final='leaf'`, manually extract the leaf key in onChange
 */

import React, { useState } from 'react'
import { Cascader } from 'shineout'

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

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>([])

  return (
    <div>
      <Cascader
        final
        finalDismiss
        clearable
        data={data}
        keygen='value'
        value={value}
        onChange={(v) => {
          // hack: onChange 拿到的是完整路径如 ['jiangsu','nanjing','jiangning']，只保留末级
          const leafOnly = v.length > 0 ? [v[v.length - 1]] : v
          console.log('original:', v, '-> leaf only:', leafOnly)
          setValue(leafOnly)
        }}
        showParent
        renderItem={(n) => `${n.value}`}
      />
      <div style={{ marginTop: 16 }}>当前 value: {JSON.stringify(value)}</div>
    </div>
  )
}

export default App
