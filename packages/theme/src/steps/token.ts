// 此文件受脚本控制，修改后将自动同步 type.ts steps.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and steps.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const stepsTokenDescription = {
  steps: '步骤条',
  wait: '等待状态中的',
  process: '进行状态中的',
  finish: '已完成状态的',
  error: '错误状态的的',
  nearly: '相邻之间的',
  describe: '描述信息的',
  description: '描述信息',
  tail: '尾部连接线',
  arrow: '箭头形状的',
  content: '容器',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts steps.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 stepsRules 强关联，非 stepsRules 规则内的 token 需手动增加或删减。
 */
const stepsTokenValue = {
  icon: { width: 'Size-14', height: 'Size-14', font: { size: '16/regular' } },
  small: {
    icon: { width: 'Size-12', height: 'Size-12', font: { size: '14/regular' } },
    title: { font: { size: '14/medium' } },
    description: { font: { size: '12/regular' } },
    arrow: { padding: { x: 'Padding-16', y: 'Padding-5' } },
  },
  large: {
    icon: { width: 'Size-16', height: 'Size-16', font: { size: '18/regular' } },
    title: { font: { size: '18/medium' } },
    description: { font: { size: '12/regular' } },
    arrow: { padding: { x: 'Padding-16', y: 'Padding-11' } },
  },
  title: { font: { size: '16/regular' } },
  description: { font: { size: '12/regular' } },
  wait: { font: { color: 'Neutral-text-4' }, background: { color: 'Neutral-fill-2' } },
  process: { font: { color: 'Neutral-text-1' }, background: { color: 'Brand-6' } },
  finish: { font: { color: 'Brand-6' }, background: { color: 'Brand-1' } },
  error: { font: { color: 'Neutral-text-1' }, background: { color: 'Danger-6' } },
  arrow: {
    padding: { x: 'Padding-16', y: 'Padding-8' },
  },
  tail: { background: { color: 'Neutral-border-1' }, finish: { background: { color: 'Brand-6' } } },
  nearly: { content: { margin: 'Margin-8' }, describe: { margin: 'Margin-4' } },
};

const stepsTokenExtraValue = {
  description: { font: { color: 'Neutral-text-3' }, title: { margin: { x: 'Margin-4' } } },
};

module.exports = {
  stepsTokenValue,
  stepsTokenExtraValue,
  stepsTokenDescription,
};
