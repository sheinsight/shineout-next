// 此文件受脚本控制，修改后将自动同步 type.ts progress.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and progress.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const progressTokenDescription = {
  progress: '进度条',
  gap: '间距',
  info: '基础色',
  front: '已完成进度的',
  inner: '内嵌文案模式',
  right: '右侧的',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts progress.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 progressRules 强关联，非 progressRules 规则内的 token 需手动增加或删减。
 */
const progressTokenValue = {};

const progressTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-4' },
  background: 'Neutral-fill-3',
  info: {
    front: { background: { color: 'Brand-6' } },
    inner: { font: { color: 'Neutral-text-1' } },
  },
  warning: {
    front: { background: { color: 'Warning-6' } },
    inner: { font: { color: 'Neutral-text-1' } },
  },
  success: {
    front: { background: { color: 'Success-6' } },
    inner: { font: { color: 'Neutral-text-1' } },
  },
  danger: {
    front: { background: { color: 'Danger-6' } },
    inner: { font: { color: 'Neutral-text-1' } },
  },
  circle: {
    info: { font: { color: 'Neutral-text-4' } },
    warning: { font: { color: 'Warning-6' } },
    success: { font: { color: 'success-6' } },
    danger: { font: { color: 'danger-6' } },
    font: { weight: 'Weight-regular' },
  },
  line: {
    height: 'Size-3',
    gap: 'Spacing-8',
    inner: {
      height: 'Size-10',
      gap: 'Spacing-8',
      padding: { x: 'Spacing-8' },
      font: { color: 'Neutral-text-1', size: 'Font-12' },
      right: { font: { color: 'Neutral-text-5' } },
      info: { front: { background: { color: 'Brand-6' } } },
      warning: { front: { background: { color: 'Warning-6' } } },
      success: { front: { background: { color: 'Success-6' } } },
      danger: { front: { background: { color: 'Danger-6' } } },
    },
    pop: { font: { color: 'Neutral-text-1' } },
    icon: { size: 'Size-7' },
    background: { color: 'Neutral-fill-9' },
    font: { weight: 'Weight-regular' },
  },
};

module.exports = {
  progressTokenValue,
  progressTokenExtraValue,
  progressTokenDescription,
};
