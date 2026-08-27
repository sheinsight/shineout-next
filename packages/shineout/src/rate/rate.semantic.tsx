/**
 * Rate Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { RateSemanticKey } from '@sheinx/base';
import { Rate } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

const RateSemanticDemo: React.FC = () => (
  <StarRate defaultValue={3} text={['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful']} />
);

const rateSemantic: SemanticSchema<RateSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Rate 最外层容器',
      en: 'Rate outermost wrapper element',
      version: '3.10.0',
      example: `<Rate
  classNames={{ root: 'my-rate' }}
  styles={{ root: { padding: '8px 0' } }}
/>`,
    },
    {
      key: 'star',
      cn: '每个评分项（星形图标）',
      en: 'Each rating item (star icon)',
      version: '3.10.0',
      example: `<Rate
  classNames={{ star: 'my-star' }}
  styles={{ star: { marginRight: 4 } }}
/>`,
    },
    {
      key: 'text',
      cn: '附加文字区域',
      en: 'Auxiliary text area',
      version: '3.10.0',
      example: `<Rate
  classNames={{ text: 'my-text' }}
  styles={{ text: { color: '#faad14' } }}
/>`,
    },
  ],
  demo: RateSemanticDemo,
};

export default rateSemantic;
