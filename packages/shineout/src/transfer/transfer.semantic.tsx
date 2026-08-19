/**
 * Transfer Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TransferSemanticKey } from '@sheinx/base';
import { Transfer } from 'shineout';

const data = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

const TransferSemanticDemo: React.FC = () => (
  <Transfer
    data={data}
    keygen='id'
    renderItem='name'
    defaultValue={[4, 5]}
    titles={['Source', 'Target']}
    listHeight={180}
  />
);

const transferSemantic: SemanticSchema<TransferSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Transfer 最外层容器',
      en: 'Transfer outermost wrapper element',
      version: '3.10.0',
      example: `<Transfer
  classNames={{ root: 'my-transfer' }}
  styles={{ root: { border: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'header',
      cn: '面板头部区域（含全选 + 标题）',
      en: 'Panel header area (includes select-all + title)',
      version: '3.10.0',
      example: `<Transfer
  classNames={{ header: 'my-header' }}
  styles={{ header: { background: '#fafafa' } }}
/>`,
    },
    {
      key: 'list',
      cn: '列表容器',
      en: 'List container',
      version: '3.10.0',
      example: `<Transfer
  classNames={{ list: 'my-list' }}
  styles={{ list: { padding: 4 } }}
/>`,
    },
    {
      key: 'item',
      cn: '单个列表项',
      en: 'Individual list item',
      version: '3.10.0',
      example: `<Transfer
  classNames={{ item: 'my-item' }}
  styles={{ item: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'operations',
      cn: '中间操作按钮区',
      en: 'Middle operation buttons area',
      version: '3.10.0',
      example: `<Transfer
  classNames={{ operations: 'my-ops' }}
  styles={{ operations: { padding: '0 12px' } }}
/>`,
    },
  ],
  demo: TransferSemanticDemo,
};

export default transferSemantic;
