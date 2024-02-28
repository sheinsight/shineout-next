// 此文件受脚本控制，修改后将自动同步 type.ts cascader.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and cascader.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const cascaderTokenDescription = {
  cascader: '级联选择器',
  placeholder: '占位符',
  result: '结果',
  text: '文本',
  option: '选项',
  right: '(右侧)',
  inner: '内部容器的',
  clear: '清除按钮的',
  more: '折叠内容的',
  header: '列表头部的',
  group: '分组',
  title: '标题的',
  column: '多列模式下',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts cascader.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 cascaderRules 强关联，非 cascaderRules 规则内的 token 需手动增加或删减。
 */
const cascaderTokenValue = { font: { size: '14/regular' } };

const cascaderTokenExtraValue = {
  width: 'Size-120',
  font: { size: '14/regular', color: 'Neutral-text-5' },
  border: { radius: 'Radius-4', color: 'Neutral-border-2' },
  padding: { x: 'Padding-8', y: 'Padding-2' },
  icon: { size: 'Size-7', color: 'Neutral-text-4' },
  small: {
    font: { size: '12/regular' },
    border: { radius: '' },
    padding: { x: 'Padding-8', y: 'Padding-1' },
    option: {
      inner: {
        padding: { x: 'Padding-8', y: 'Padding-2' },
      },
    },
  },
  large: {
    font: { size: '16/regular' },
    padding: { x: 'Padding-12', y: 'Padding-3' },
    option: {
      inner: {
        padding: { x: 'Padding-12', y: 'Padding-8' },
      },
    },
    placeholder: {
      margin: { y: 'Padding-4' },
    },
  },
  inner: {
    padding: { x: 'Padding-8', y: 'Padding-5' },
  },
  placeholder: { color: 'Neutral-text-2', margin: { y: 'Padding-2' } },
  background: { color: 'Neutral-fill-1' },
  clear: { color: 'Neutral-text-3', padding: 'Padding-8' },
  hover: { border: { color: 'Brand-6' }, clear: { color: 'Neutral-text-4' } },
  focus: { border: { color: 'Brand-7' }, shadow: 'Brand-2' },
  disabled: {
    font: { color: 'Neutral-text-2' },
    placeholder: { color: 'Neutral-text-2' },
    border: { color: 'Neutral-border-2' },
    background: { color: 'Neutral-fill-2' },
  },
  result: {
    text: {
      border: { radius: 'Radius-4' },
      padding: { x: 'Padding-4' },
      small: { padding: { x: 'Padding-4' } },
      large: { padding: { x: 'Padding-10' } },
      active: { background: { color: 'Brand-1' } },
    },
    item: {
      hover: {
        color: 'Brand-5',
      },
      active: {
        color: 'Brand-7',
      },
      checked: {
        color: 'Brand-6',
      },
    },
  },
  error: { border: { color: 'Danger-6' }, focus: { shadow: 'Danger-1' } },
  panel: {
    color: 'Neutral-text-5',
    background: { color: 'Neutral-fill-1' },
    shadow: 'Shadow-2',
    radius: 'Radius-4',
  },
  option: {
    height: 'Size-16',
    padding: { x: 'Padding-4', y: 'Padding-1' },
    active: {
      color: 'Brand-6',
      background: { color: 'Brand-1' },
    },
    inner: {
      padding: { x: 'Padding-8', y: 'Padding-5', right: 'Size-15' },
      border: { radius: 'Radius-2' },
    },
    icon: {
      color: 'Neutral-text-4',
    },
    hover: { background: { color: 'Neutral-fill-2' } },
    disabled: { color: 'Neutral-text-2', background: { color: 'Neutral-fill-1' } },
  },
  more: {
    padding: {
      x: 'Padding-16',
      y: 'Padding-14',
    },
  },
  header: {
    padding: 'Padding-8',
    border: {
      color: 'Neutral-border-1',
    },
  },
  group: {
    title: {
      font: { color: 'Neutral-text-3', size: '12/regular' },
      padding: { x: 'Padding-12', y: 'Padding-6' },
    },
  },
  column: {
    padding: 'Padding-8',
    option: {
      margin: 'Margin-8',
    },
  },
  list: {
    border: { color: 'Neutral-border-1' },
  },
};

module.exports = {
  cascaderTokenValue,
  cascaderTokenExtraValue,
  cascaderTokenDescription,
};
