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
      component: require('shineout/src/input/__example__/s-008-password.tsx'),
    },
  ],
};
