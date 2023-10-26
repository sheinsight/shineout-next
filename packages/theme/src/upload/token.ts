// 此文件受脚本控制，修改后将自动同步 type.ts upload.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and upload.ts files.

/**
 * 描述词典
 * 用于生成文本。
 * 描述词典变量名称为 组件名称 + TokenDescription。请勿修改变量命名，否则将导致 token 无法生成。
 */
const uploadTokenDescription = {
  upload: '上传',
  result: '结果',
  gap: '内间距',
  deleted: '被删除',
  uploading: '上传中',
  image: '图片',
  handler: '操作区',
  btn: '按钮',
  close: '关闭',
  recover: '恢复',
  mask: '遮罩',
  tip: '提示',
};

/**
 * token 值映射表
 * 用于生成 token 的值，修改保存后将自动同步 type.ts upload.ts 的内容。
 * 值映射表变量名称为 组件名称 + TokenValue。请勿修改变量命名，否则将导致 token 无法生成。
 * 该映射表将根据规则自动生成，并与公共 token 进行合并。若有相同 token，将覆盖公共 token。默认不包含公共 token，除非在映射表中添加覆盖。
 * 注意，该映射表的内容不与 uploadRules 强关联，非 uploadRules 规则内的 token 需手动增加或删减。
 */
const uploadTokenValue = { font: { size: '14/regular' } };

const uploadTokenExtraValue = {
  result: {
    padding: { x: 'Padding-12', y: 'Padding-5' },
    background: { color: 'Neutral-fill-2' },
    gap: 'Margin-8',
    margin: { y: 'Margin-8' },
    icon: {
      size: 'Size-7',
      color: 'Neutral-text-4',
      hover: { background: { color: 'Neutral-fill-2' } },
    },
    font: { size: '14/regular', color: 'Neutral-text-5' },
    border: { radius: 'Radius-4' },
    error: {
      font: { color: 'Danger-6' },
      icon: { color: 'Danger-6' },
    },
    success: {
      icon: { color: 'Success-6' },
    },
    deleted: {
      font: {
        color: 'Neutral-text-3',
      },
    },
    uploading: {
      icon: {
        color: 'Brand-6',
      },
    },
  },
  image: {
    border: { radius: 'Radius-4' },
    handler: {
      border: { color: 'Neutral-border-2' },
      background: { color: 'Neutral-fill-1' },
      font: { color: 'Neutral-text-3' },
      hover: {
        border: { color: 'Brand-6' },
        font: { color: 'Brand-6' },
      },
      error: {
        border: { color: 'Danger-6' },
        font: { color: 'Danger-6' },
      },
    },
    result: {
      border: { color: 'Neutral-border-1' },
      btn: {
        size: 'Size-7',
        close: { color: 'Danger-6' },
        recover: { color: 'Brand-6' },
      },
      mask: {
        background: { color: 'Mask-fill-1' },
        icon: { size: 'Size-8', color: 'Neutral-text-1' },
      },
      error: {
        border: { color: 'Danger-6' },
        font: { color: 'Danger-6' },
      },
      tip: {
        background: { color: 'Neutral-fill-1' },
        font: { size: '12/regular' },
      },
    },
  },
};

module.exports = {
  uploadTokenValue,
  uploadTokenExtraValue,
  uploadTokenDescription,
};
