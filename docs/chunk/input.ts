export default {
  title: {
    title: 'Input',
    group: 'Form',
    order: -1,
  },
  header: {
    title: {
      en: 'Input',
      cn: '输入框',
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
      code: "import React from 'react';\nimport { Input } from 'shineout';\n\nconst style: React.CSSProperties = { marginBottom: 12 };\n\nconst App: React.FC = () => (\n  <div style={{ width: 300 }}>\n    <Input style={style} type='tel' placeholder='digits undefined' />\n    <Input style={style} digits={0} type='number' placeholder='digits 0' clearable />\n    <Input style={style} digits={1} type='number' placeholder='digits 1' clearable />\n    <Input style={style} digits={2} type='number' placeholder='digits 2' clearable />\n    <Input style={style} numType='non-negative' type='number' placeholder='non-negative' />\n    <Input style={style} type='number' integerLimit={3} placeholder='integerLimit 3' clearable />\n    <Input\n      style={style}\n      autoFix\n      digits={3}\n      type='number'\n      placeholder='digits 3; autoFix'\n      clearable\n    />\n    <Input\n      style={style}\n      numType='positive'\n      integerLimit={3}\n      type='number'\n      placeholder='positive;integerLimit 3'\n    />\n  </div>\n);\n\nexport default App;\n",
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
  ],
};
