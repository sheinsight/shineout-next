// 此文件受脚本控制，修改后将自动同步 type.ts date-picker.ts 的内容
// This file is script-controlled and any changes made will be automatically synchronized with the type.ts and date-picker.ts files.

/**
 * token 规则
 * 用于生成 token 的规则，修改保存后将自动更新 token。
 * 规则变量名称为 组件名称 + Rules。请勿修改变量命名，否则将导致 token 无法生成。
 */
const datePickerRules = {
  size: [
    ['', 'small', 'large'],
    ['font-size', 'border-radius', 'padding-x', 'padding-y', 'icon-size'],
  ],
  type: [['date', 'datetime'], ['', 'range'], ['width']],
  color: [
    ['', 'disabled', 'error'],
    ['', 'hover', 'focus'],
    [
      'font-color',
      'placeholder-color',
      'border-color',
      'background-color',
      'shadow',
      'clear-color',
      'icon-color',
    ],
  ],
  pickerCommon: [['picker'], ['color', 'background-color', 'shadow', 'radius']],
  pickerBodyCommon: [['picker-body'], ['padding-x', 'padding-y', 'font-size']],
  cellColor: [['cell'], ['', 'hover', 'active', 'disabled'], ['color', 'background-color']],
  cellColor2: [['cell'], ['other'], ['color']],
  cellColorCommon: [['cell'], ['header'], ['color']],
  cellSize: [['cell'], ['margin-y']],
  dayCellSize: [['day-cell'], ['size', 'hot-size']],
};

module.exports = {
  datePickerRules,
};
