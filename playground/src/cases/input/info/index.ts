import { defineCase } from '../../../core/define';

export default defineCase({
  title: '输入框 信息提示',
  description: '来自 shineout 示例 input/05-02-info，字数提示（数字和自定义文案），只测挂载',
  notes: [
    'info={20} ↔ antd 的 count={{ show: true, max: 20 }}（超出都不会截断，只是标红）；自定义文案 ↔ count.show 函数',
    '2.x 的 Input 在 info 是函数时会把 info 透传到 <input> 上，控制台报 React 的 Invalid value for prop info 警告（2.x 自身的问题，不影响渲染）','原示例第 3 项 info={{ content, position: "bottom-left" }}（改变提示位置）antd 没有对应，没有迁移',
    'antd 5.29 / 6 的 count 属性同名，已用 tsc 验证类型',
  ],
});
