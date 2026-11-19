import { defineCase } from '../../../core/define';
import { transferScenarios } from '../_shared/scenarios';

export default defineCase({
  title: '穿梭框 基本用法',
  description: '来自 shineout 示例 transfer/01-base（并合并 09-control 的受控写法），10 条数据，带「勾选」「移到右侧」两个交互场景',
  scenarios: transferScenarios(3, 'name-8'),
  notes: [
    '原示例是不受控的；为了能在每次测量前还原状态、校验交互生效，这里把目标列表（Shineout 的 value + format=\'id\'，antd 的 targetKeys）和勾选状态（selectedKeys）都改成受控，等于同时覆盖了 09-control',
    '初始：目标列表为空，左侧预先勾选前 3 项（name-1 ~ name-3）；自动测试里状态偏离初始 400ms 后自动还原',
    '「勾选一项」场景：点击左侧 name-8 的条目，勾选数 3 → 4；2.x 点条目的 label，3.x 点 .soui-checkbox-wrapper，antd 点整个 li 条目（读 DOM 得到，是否生效由 check 校验）',
    '「移到右侧」场景：点击向右的按钮，把已勾选的 3 项移到右侧，校验目标列表条数 0 → 3；2.x 取第一个 .so-transfer-btns-button，3.x 取 .soui-transfer-right，antd 取 .ant-transfer-actions 里第一个按钮（读 DOM 得到：2.x、antd 的第一个按钮是向右，这一点由 check 校验）',
    '数据格式：Shineout 是 { id, name } + keygen=\'id\' + renderItem=\'name\'；antd 是 { key, title } + render。条数、文字一样',
    '列表高度：Shineout 设 listHeight=232；antd 没有同名属性，用 listStyle 设固定高度 232，只是视觉上近似，没有逐像素核对',
    '头部「全选」的文案、计数的展示方式各库不同（2.x「Select All」，3.x「0/10」，antd「10 项」），按各库默认，没有统一',
  ],
});
