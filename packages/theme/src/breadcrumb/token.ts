// 此文件受脚本控制，修改后将自动同步 type.ts breadcrumb.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and breadcrumb.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const breadcrumbTokenDescription = {
  breadcrumb: '面包屑',
  list: '下拉列表的',
  shadow: '阴影',
  item: '选项',
  wrapper: '外部容器',
  separator: '分隔符',
  prev: '上级',
  down: '下拉',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts breadcrumb.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 breadcrumbRules 强关联，非 breadcrumbRules 规则内的 token 需手动增加或删减。
 */
const breadcrumbTokenValue = {};

const breadcrumbTokenExtraValue = {
  font: { size: 'Font-14', color: 'Neutral-text-5', weight: 'Weight-regular' },
  link: {
    color: 'Neutral-text-3',
    hover: {
      color: 'Brand-5',
    },
  },
  default: {
    link: {
      color: 'Brand-6',
      hover: {
        color: 'Brand-5',
      },
      active: {
        color: 'Brand-7',
      }
    },
  },
  list: {
    padding: { y: 'Spacing-4' },
    item: {
      border: {
        radius: 'Radius-default',
      },
      wrapper: {
        padding: { x: 'Spacing-4' },
      },
      padding: { x: 'Spacing-8', y: 'Spacing-5' },
      hover: {
        background: { color: 'Neutral-fill-2' },
        font: { color: 'Neutral-text-3' },
      },
    },
  },
  prev: {
    font: {
      weight: 'Weight-regular',
    },
  },
  separator: {
    margin: {
      x: 'Spacing-8',
    },
  },
  icon: {
    background: { color: 'Neutral-text-4' },
  },
  down: {
    icon: {
      size: 'Font-14',
    }
  }
};

module.exports = {
  breadcrumbTokenValue,
  breadcrumbTokenExtraValue,
  breadcrumbTokenDescription,
};
