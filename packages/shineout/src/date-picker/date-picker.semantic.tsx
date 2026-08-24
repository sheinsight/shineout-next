/**
 * DatePicker Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { DatePickerSemanticKey } from '@sheinx/base';
import { DatePicker } from 'shineout';

const DatePickerSemanticDemo: React.FC = () => (
  <DatePicker
    placeholder='Select date'
    type='date'
    style={{ width: 240 }}
    showSelNow
  />
);

const datePickerSemantic: SemanticSchema<DatePickerSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'DatePicker 最外层容器',
      en: 'DatePicker outermost wrapper element',
      version: '3.10.0',
      example: `<DatePicker classNames={{ root: 'my-date-picker' }} styles={{ root: { border: '1px solid #eee' } }} />`,
    },
    {
      key: 'header',
      cn: '结果区域（显示已选值 / placeholder）',
      en: 'Header area (shows selected values / placeholder)',
      version: '3.10.0',
      example: `<DatePicker classNames={{ header: 'my-header' }} styles={{ header: { background: '#f0f7ff' } }} />`,
    },
    {
      key: 'popup',
      cn: '下拉面板',
      en: 'Dropdown popup panel',
      version: '3.10.0',
      example: `<DatePicker classNames={{ popup: 'my-popup' }} styles={{ popup: { background: '#fff' } }} />`,
    },
    {
      key: 'popupHeader',
      cn: '面板头部导航区域（年月切换箭头）',
      en: 'Panel header navigation area (year/month switch arrows)',
      version: '3.10.0',
      example: `<DatePicker classNames={{ popupHeader: 'my-popup-header' }} styles={{ popupHeader: { padding: '8px' } }} />`,
    },
    {
      key: 'cell',
      cn: '日期/时间单元格',
      en: 'Date/time cell',
      version: '3.10.0',
      example: `<DatePicker classNames={{ cell: 'my-cell' }} styles={{ cell: { borderRadius: 4 } }} />`,
    },
    {
      key: 'popupFooter',
      cn: '面板底部区域（确认按钮等）',
      en: 'Panel footer area (confirm button, etc)',
      version: '3.10.0',
      example: `<DatePicker classNames={{ popupFooter: 'my-footer' }} styles={{ popupFooter: { padding: '8px' } }} />`,
    },
  ],
  demo: DatePickerSemanticDemo,
  demoStyle: { display: 'flex', gap: 16, alignItems: 'flex-start' },
};

export default datePickerSemantic;
