export default {
  title: {
    title: 'Input',
    group: 'Form',
    order: -1,
  },
  header: {
    title: {
      en: 'Input',
      cn: '输入框 Input',
    },
    describe: {
      en: 'Users can input or edit text in the text box.',
      cn: '用户可以在文本框内输入或编辑文字。',
    },
  },
  examples: [
    {
      prop: 'Base',
      propName: {
        en: 'Basic usage',
        cn: '基本用法',
      },
      propDescribe: {
        en: '',
        cn: '',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return <Input placeholder='input something' />;\n};\n",
      component: require('shineout/src/input/__example__/s-001-base.tsx'),
    },
    {
      prop: 'size',
      propName: {
        en: 'Size',
        cn: '尺寸大小',
      },
      propDescribe: {
        en: 'Set the size property to change the size of the input box component. There are three built-in sizes available: small, default (default), and large.',
        cn: '设置 size 属性改变输入框组件的尺寸大小。内置三种尺寸：small、default（默认）、large。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { width: 120, marginInlineEnd: 12 };\n\nconst App: React.FC = () => (\n  <div>\n    <Input size='small' style={style} placeholder='small size' clearable />\n    <Input style={style} placeholder='default size' clearable />\n    <Input size='large' style={style} placeholder='large size' clearable />\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-002-size.tsx'),
    },
    {
      prop: 'number',
      propName: {
        en: 'Numerical data',
        cn: '数字数据',
      },
      propDescribe: {
        en: 'After setting the type attribute to “number”, it enables the handling of numerical data. You can customize different numerical processing results by using the numType, integerLimit, autoFix, and digits attributes.',
        cn: '设置 type 属性为 number 后，将支持数字数据的处理。通过设置 numType、integerLimit、autoFix、digits 属性来定制不同的数值处理结果。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { marginBottom: 12 };\n\nconst App: React.FC = () => (\n  <div style={{ width: 300 }}>\n    <Input style={style} type='tel' placeholder='digits undefined' />\n    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />\n    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />\n    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />\n    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' />\n    <Input style={style} type='number' integerLimit={3} placeholder='integerLimit 3' clearable />\n    <Input\n      style={style}\n      autoFix\n      digits={3}\n      type='number'\n      placeholder='digits 3; autoFix'\n      clearable\n    />\n    <Input\n      style={style}\n      numType='positive'\n      integerLimit={3}\n      type='number'\n      placeholder='positive;integerLimit 3'\n    />\n    <Input.Number numType='positive' integerLimit={3} placeholder='positive; integerLimit 3' />\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-003-number.tsx'),
    },
    {
      prop: 'Input.Group',
      propName: {
        en: 'Built-in group component',
        cn: '内置分组组件',
      },
      propDescribe: {
        en: 'By utilizing the built-in group component, you can combine multiple input components or selection components for joint display.',
        cn: '利用内置的 group 组件可以实现多个 输入组件 或 选择型组件 联合展示。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { width: 300, marginBottom: 12 };\n\nconst App: React.FC = () => (\n  <div>\n    <Input.Group style={style}>\n      <Input placeholder='first name' />\n      -\n      <Input placeholder='last name' />\n    </Input.Group>\n\n    <Input.Group style={style}>\n      <Input style={{ flex: 1 }} placeholder='flex 1' />\n      <Input style={{ flex: 3 }} placeholder='flex 3' />\n    </Input.Group>\n\n    <Input.Group style={style}>\n      <b>e</b>\n      <Input placeholder='email' />\n      <b>.com</b>\n    </Input.Group>\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-004-group.tsx'),
    },
    {
      prop: 'tip',
      propName: {
        en: 'tip',
        cn: '提示',
      },
      propDescribe: {
        en: 'You can customize the prompt message of the component by using the ‘tip’ attribute. You can also render the desired content by passing a custom ReactDOM.',
        cn: '通过 tip 属性，可以自定义配置组件的提示信息。可以通过传入自定义 ReactDOM 来渲染你想要的内容。',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return <Input placeholder='input something' tip={'please input something'} />;\n};\n",
      component: require('shineout/src/input/__example__/s-005-tip.tsx'),
    },
    {
      prop: 'validate',
      propName: {
        en: 'validate',
        cn: '校验',
      },
      propDescribe: {
        en: 'The component supports passing the ‘rules’ attribute to configure validation rules.',
        cn: '组件支持传入 rules 属性来配置校验规则。',
      },
      code: "import React from 'react';\nimport { Input, Form } from 'shineout';\n\nconst App: React.FC = () => (\n  <div>\n    <Input\n      popover\n      rules={[\n        (value, formValue, callback) => {\n          if (!value) {\n            callback(new Error('必填'));\n          }\n          callback(true);\n        },\n      ]}\n    />\n    <Form.Item label={'哈哈哈'}>\n      <Input\n        rules={[\n          (value, formValue, callback) => {\n            if (!value) {\n              callback(new Error('必填'));\n            }\n            callback(true);\n          },\n        ]}\n      />\n    </Form.Item>\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-006-validate.tsx'),
    },
    {
      prop: 'disabled',
      propName: {
        en: 'disabled',
        cn: '禁用',
      },
      propDescribe: {
        en: 'When the disabled attribute is enabled, the component will prevent input.',
        cn: '开启 disabled 属性后，组件将禁止输入。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { width: 300, marginBottom: 12 };\n\nconst App: React.FC = () => (\n  <div>\n    <Input.Group disabled style={style}>\n      <Input placeholder='first name' />\n      -\n      <Input placeholder='last name' />\n    </Input.Group>\n\n    <Input disabled style={style} placeholder='disabled input' />\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-007-disabled.tsx'),
    },
    {
      prop: 'Input.Password',
      propName: {
        en: 'Built-in password component',
        cn: '内置密码组件',
      },
      propDescribe: {
        en: 'We use the built-in password component specifically for handling password-related scenarios.',
        cn: '使用内置 password 组件专门处理密码业务场景。',
      },
      code: "import React from 'react';\nimport { Input, Form } from 'shineout';\n\nconst App: React.FC = () => (\n  <Form>\n    <Input.Password name={'password'} placeholder='input password' />\n  </Form>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-008-password.tsx'),
    },
    {
      prop: 'clearable',
      propName: {
        en: 'Allow clearing',
        cn: '允许删除',
      },
      propDescribe: {
        en: 'Allow clearing the content entered in the input box.',
        cn: '允许清除 input 框内输入的内容。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst App: React.FC = () => (\n  <div>\n    <Input clearable placeholder='input' />\n    <Input\n      clearable\n      clearToUndefined\n      placeholder='input clearToUndefined'\n      onChange={console.log.bind(null, 'change')}\n    />\n    <Input.Number clearable placeholder='number' />\n    <Input.Number\n      clearable\n      allowNull\n      placeholder='number allowNull'\n      onChange={console.log.bind(null, 'change')}\n    />\n    <Input.Number\n      clearable\n      clearToUndefined\n      placeholder='number clearToUndefined'\n      onChange={console.log.bind(null, 'change')}\n    />\n\n    <Input.Password clearable placeholder='password' />\n    <Input.Password\n      clearable\n      clearToUndefined\n      placeholder='password clearToUndefined'\n      onChange={console.log.bind(null, 'change')}\n    />\n  </div>\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-009-clearable.tsx'),
    },
    {
      prop: 'underline',
      propName: {
        en: 'Bottom border',
        cn: '下边框',
      },
      propDescribe: {
        en: 'After enabling the underline attribute, the component will support the bottom border style and display only the border at the bottom.',
        cn: '开启 underline 属性后，组件将支持下边框样式，仅展示下部的边框。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst App: React.FC = () => <Input underline clearable placeholder='Underline' />;\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-0010-underline.tsx'),
    },
    {
      prop: 'autoSelect',
      propName: {
        en: 'Automatically select Input',
        cn: '自动选中',
      },
      propDescribe: {
        en: 'After enabling the autoSelect attribute, when the Input component is focused, the content of the current Input component will be automatically selected.',
        cn: '开启 autoSelect 属性后，当 Input 组件聚焦时，将自动全选当前 Input 组件的内容。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst App: React.FC = () => (\n  <Input defaultValue={'hello world'} placeholder='input something' autoSelect />\n);\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-0011-autoselect.tsx'),
    },
    {
      prop: 'trim',
      propName: {
        en: 'Trim whitespace',
        cn: '清除空格',
      },
      propDescribe: {
        en: 'After enabling the trim attribute, the Input component will remove the whitespace characters at both ends of the content after typing.',
        cn: '开启 trim 属性，Input 组件会在键入内容后去除内容两端的空格字符。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst App: React.FC = () => <Input placeholder='input something' trim />;\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-0012-trim.tsx'),
    },
    {
      prop: 'Keyboard Events',
      propName: {
        en: 'Keyboard events',
        cn: '键盘事件',
      },
      propDescribe: {
        en: 'The Input component supports the onKeyUp (key up), onKeyDown (key down), and onEnterPress (enter key) events.',
        cn: 'Input 组件支持 onKeyUp（键盘弹起）、onKeyDown（键盘按下）、onEnterPress（回车） 事件。',
      },
      code: "import React, { useState } from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { marginBottom: 12 };\n\nconst App: React.FC = () => {\n  const [keyUp, setKeyUp] = useState<number>(0);\n  const [keyDown, setKeyDown] = useState<number>(0);\n  const [keyEnterPress, setKeyEnterPress] = useState<number>(0);\n\n  const onKeyUp = () => setKeyUp(keyUp + 1);\n  const onKeyDown = () => setKeyDown(keyDown + 1);\n  const onEnterPress = () => setKeyEnterPress(keyEnterPress + 1);\n\n  return (\n    <div>\n      <Input.Group style={style}>\n        <Input placeholder='onKeyUp' onKeyUp={onKeyUp} />\n        <b className='onKeyUp'>{`onKeyUp: ${keyUp} times`}</b>\n      </Input.Group>\n\n      <Input.Group style={style}>\n        <Input placeholder='onKeyDown' onKeyDown={onKeyDown} />\n        <b className='onKeyDown'>{`onKeyDown: ${keyDown} times`}</b>\n      </Input.Group>\n\n      <Input.Group style={style}>\n        <Input placeholder='onEnterPress' onEnterPress={onEnterPress} />\n        <b className='onEnterPress'>{`onEnterPress: ${keyEnterPress} times`}</b>\n      </Input.Group>\n    </div>\n  );\n};\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-0013-enter.tsx'),
    },
    {
      prop: 'limit',
      propName: {
        en: 'Input restriction',
        cn: '输入限制',
      },
      propDescribe: {
        en: 'Set min (minimum value), max (maximum value), and maxLength (maximum length) to restrict the input content of the Input component.',
        cn: '通过设置 min（最小值）、 max（最大值）、 maxLength（最大长度）来限制 Input 组件的输入内容。',
      },
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { marginBottom: 12 };\n\nconst App: React.FC = () => {\n  return (\n    <div>\n      <Input.Group style={style}>\n        <b className='min'>min</b>\n        <Input.Number placeholder='100' min={100} />\n      </Input.Group>\n\n      <Input.Group style={style}>\n        <b className='max'>max</b>\n        <Input.Number placeholder='200' max={200} />\n      </Input.Group>\n\n      <Input.Group style={style}>\n        <b className='maxLength'>maxLength</b>\n        <Input placeholder='5' maxLength={5} step={3} />\n      </Input.Group>\n    </div>\n  );\n};\n\nexport default App;\n",
      component: require('shineout/src/input/__example__/s-0014-limit.tsx'),
    },
    {
      prop: 'border',
      propName: {
        en: 'Borderless mode',
        cn: '无边框模式',
      },
      propDescribe: {
        en: 'After enabling the border attribute, the Input component will no longer display a border.',
        cn: '开启 border 属性后，Input 组件将不再显示边框。',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return <Input placeholder='input something' border={false} />;\n};\n",
      component: require('shineout/src/input/__example__/st-0015-no-border.tsx'),
    },
    {
      prop: 'ref',
      propName: {
        en: 'ref',
        cn: '获取ref',
      },
      propDescribe: {
        en: 'ref',
        cn: 'ref',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return (\n    <Input\n      placeholder='input something'\n      forwardRef={(e) => {\n        console.log('ref', e);\n      }}\n    />\n  );\n};\n",
      component: require('shineout/src/input/__example__/st-0016-ref.tsx'),
    },
    {
      prop: 'ref',
      propName: {
        en: 'info',
        cn: 'info',
      },
      propDescribe: {
        en: 'info',
        cn: 'info',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return <Input placeholder='input something' info={5} />;\n};\n",
      component: require('shineout/src/input/__example__/st-0017-info.tsx'),
    },
    {
      prop: 'innerTitle',
      propName: {
        en: 'inner title',
        cn: '内嵌标题',
      },
      propDescribe: {
        en: 'inner title',
        cn: '内嵌标题',
      },
      code: "import { Input } from 'shineout';\nexport default () => {\n  return <Input placeholder='input something' innerTitle={'hello world'} clearable />;\n};\n",
      component: require('shineout/src/input/__example__/st-0018-inner-title.tsx'),
    },
  ],
};
