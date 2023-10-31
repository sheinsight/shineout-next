// 此文件受脚本控制，修改后将自动同步 type.ts progress.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and progress.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const progressTokenDescription = { progress: 'xxx' };

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts progress.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 progressRules 强关联，非 progressRules 规则内的 token 需手动增加或删减。
 */
const progressTokenValue = {};

const progressTokenExtraValue = {
  font: { size: '14/regular', color: 'Neutral-text-4' },
  background: 'Neutral-fill-3',
  info: { front: { background: { color: 'Brand-6' } } },
  warning: { front: { background: { color: 'Warning-6' } } },
  success: { front: { background: { color: 'Success-6' } } },
  danger: { front: { background: { color: 'Danger-6' } } },
  line: {
    height: 'Size-3',
    gap: 'Margin-8',
    inner: {
      height: 'Size-10',
      gap: 'Margin-8',
      padding: { x: 'Padding-8' },
      font: { color: 'Neutral-text-1', size: '12/regular' },
      right: { font: { color: 'Neutral-text-5' } },
    },
    icon: { size: 'Size-7' },
  },
};

module.exports = {
  progressTokenValue,
  progressTokenExtraValue,
  progressTokenDescription,
};
