export default {
  title: {
    title: 'Form',
    group: 'Form',
    order: -1,
  },
  header: {
    title: {
      en: 'Form',
      cn: '表单',
    },
    describe: {
      en: 'Users can input or edit text in the text box.',
      cn: '高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。',
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
      component: require('shineout/src/Form/__example__/s-001-base.tsx'),
    },
  ],
};
