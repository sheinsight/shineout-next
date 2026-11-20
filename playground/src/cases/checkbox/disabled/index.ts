import { defineCase } from '../../../core/define';

export default defineCase({
  title: '复选框 禁用',
  description: '来自 shineout 示例 checkbox/007-disabled-1、007-disabled-2，整体禁用与条件禁用，只测挂载',
  notes: [
    '条件禁用：Shineout 传函数 disabled={fn}，antd 在 options 里写 disabled，禁用的都是 yellow 一项',
  ],
});
