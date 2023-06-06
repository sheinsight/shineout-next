export default {
  title: {
    title: 'Form',
    group: 'Form',
    order: -1,
  },
  header: {
    title: {
      en: 'Form',
      cn: '表单 Form',
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
      code: "import { Input, Form } from 'shineout';\nexport default () => {\n  return (\n    <div>\n      <Form\n        defaultValue={{ email: 'spana@qq.com' }}\n        onSubmit={(v) => {\n          console.log('form submit', v);\n        }}\n        onChange={(v) => {\n          console.log('form change', v);\n        }}\n        onReset={() => {\n          console.log('form reset');\n        }}\n      >\n        <Form.Item label='name'>\n          <Input\n            rules={[\n              (value, _, callback) => {\n                if (!value) {\n                  callback(new Error('name is required'));\n                }\n                if (value && value.length > 10) {\n                  callback(new Error('name length must less than 10'));\n                }\n                callback(true);\n              },\n            ]}\n            name={'name'}\n            clearable\n            placeholder='please input name'\n          />\n        </Form.Item>\n        <Form.Item label='email'>\n          <Input name={'email'} clearable placeholder='please input email' />\n        </Form.Item>\n\n        <button type={'submit'}>提交</button>\n        <button type={'reset'}>重置</button>\n      </Form>\n    </div>\n  );\n};\n",
      component: require('shineout/form/__example__/s-001-base.tsx'),
    },
  ],
};
