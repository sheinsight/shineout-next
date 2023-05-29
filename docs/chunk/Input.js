export default {
  title: {
    title: 'Input',
    group: 'Input',
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
      component: require('shineout/src/Input/__example__/s-001-base.tsx'),
    },
    {
      prop: 'disabled',
      propName: {
        en: 'disabled',
        cn: '禁用',
      },
      propDescribe: {
        en: 'When the disabled attribute is enabled, the component will prevent input.',
        cn: '开启 disabled 属性后，组件将禁止输入',
      },
      component: require('shineout/src/Input/__example__/s-002-disabled.tsx'),
    },
    {
      prop: 'clearable',
      propName: {
        en: 'Allow content clearing',
        cn: '允许清除内容',
      },
      propDescribe: {
        en: 'Allow clearing input field content and display a clear icon.',
        cn: '允许清除输入框内容，并展示清空图标。',
      },
      component: require('shineout/src/Input/__example__/s-002-disabled.tsx'),
    },
  ],
};
