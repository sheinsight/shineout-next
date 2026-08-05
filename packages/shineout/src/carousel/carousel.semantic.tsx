/**
 * Carousel Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { CarouselSemanticKey } from '@sheinx/base';
import { Carousel } from 'shineout';

const CarouselSemanticDemo: React.FC = () => (
  <Carousel style={{ width: 400, height: 200 }} showArrow='always' interval={0}>
    <div style={{ background: '#364d79', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Slide 1</div>
    <div style={{ background: '#263c5a', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Slide 2</div>
    <div style={{ background: '#1a2d47', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Slide 3</div>
  </Carousel>
);

const carouselSemantic: SemanticSchema<CarouselSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Carousel 最外层容器',
      en: 'Carousel outermost wrapper element',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ root: 'my-carousel' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'slider',
      cn: '滑动区域容器',
      en: 'Slider container with overflow hidden',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ slider: 'my-slider' }}
  styles={{ slider: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'item',
      cn: '每个轮播项',
      en: 'Each carousel slide item',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ item: 'my-item' }}
  styles={{ item: { padding: 16 } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '指示器容器',
      en: 'Indicator dots/numbers container',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { bottom: 16 } }}
/>`,
    },
    {
      key: 'indicatorItem',
      cn: '每个指示器元素（支持函数式 classNames 接收 { active } 状态）',
      en: 'Each indicator element (supports functional classNames with { active } state)',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ indicatorItem: ({ active }) => active ? 'dot-active' : 'dot' }}
  styles={{ indicatorItem: { width: 8, height: 8 } }}
/>`,
    },
    {
      key: 'arrow',
      cn: '箭头按钮',
      en: 'Arrow buttons (prev/next)',
      version: '3.10.0',
      example: `<Carousel
  classNames={{ arrow: 'my-arrow' }}
  styles={{ arrow: { opacity: 0.8 } }}
/>`,
    },
  ],
  demo: CarouselSemanticDemo,
};

export default carouselSemantic;
