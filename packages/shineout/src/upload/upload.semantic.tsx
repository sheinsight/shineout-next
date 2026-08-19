/**
 * Upload Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { UploadSemanticKey } from '@sheinx/base';
import { Upload } from 'shineout';

const UploadSemanticDemo: React.FC = () => (
  <Upload.Image
    action='/api/upload'
    defaultValue={['https://via.placeholder.com/80']}
    renderResult={(f: any) => f}
  />
);

const uploadSemantic: SemanticSchema<UploadSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Upload 最外层容器',
      en: 'Upload outermost wrapper element',
      version: '3.10.0',
      example: `<Upload
  classNames={{ root: 'my-upload' }}
  styles={{ root: { gap: 12 } }}
/>`,
    },
    {
      key: 'handler',
      cn: '上传触发器区域（按钮 / 图片添加框）',
      en: 'Upload trigger area (button / image add box)',
      version: '3.10.0',
      example: `<Upload
  classNames={{ handler: 'my-handler' }}
  styles={{ handler: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'item',
      cn: '已上传文件结果项',
      en: 'Uploaded file result item',
      version: '3.10.0',
      example: `<Upload
  classNames={{ item: 'my-item' }}
  styles={{ item: { borderRadius: 4 } }}
/>`,
    },
  ],
  demo: UploadSemanticDemo,
};

export default uploadSemantic;
