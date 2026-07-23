import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Watermark } from 'shineout';
import BaseExample from '../__example__/01-base';
import MultilineExample from '../__example__/02-multiline';
import ImageExample from '../__example__/03-image';
import CustomExample from '../__example__/04-custom';
import PopupExample from '../__example__/05-popup';
import { collocatorPreset } from '../../../../../docs/theme/components/collocator/preset';

const examples = [
  ['Basic watermark', BaseExample],
  ['Multi-line watermark', MultilineExample],
  ['Image watermark', ImageExample],
  ['Custom watermark', CustomExample],
  ['Popup inheritance', PopupExample],
] as const;
const watermarkColor = 'rgba(153, 157, 168, 0.55)';

interface ExampleElementProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const findContentElement = (
  node: React.ReactNode,
): React.ReactElement<ExampleElementProps> | null => {
  if (!React.isValidElement<ExampleElementProps>(node)) return null;
  if (node.props.style?.background) return node;

  for (const child of React.Children.toArray(node.props.children)) {
    const contentElement = findContentElement(child);
    if (contentElement) return contentElement;
  }

  return null;
};

const findWatermarkElement = (
  node: React.ReactNode,
): React.ReactElement<{ font?: { color?: string } }> | null => {
  if (!React.isValidElement(node)) return null;
  if (node.type === Watermark) {
    return node as React.ReactElement<{ font?: { color?: string } }>;
  }

  for (const child of React.Children.toArray((node.props as ExampleElementProps).children)) {
    const watermarkElement = findWatermarkElement(child);
    if (watermarkElement) return watermarkElement;
  }

  return null;
};

describe.each(examples)('%s example', (content, Example) => {
  test('uses theme-aware content colors', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Example />);

    const contentElement = findContentElement(renderer.getRenderOutput());

    expect(contentElement).not.toBeNull();
    expect(contentElement?.props.style?.background).toBe('var(--soui-neutral-fill-2)');
    expect(contentElement?.props.style?.color).toBe('var(--soui-neutral-text-5)');
  });

  test('uses a watermark color visible on light and dark backgrounds', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Example />);

    expect(findWatermarkElement(renderer.getRenderOutput())?.props.font?.color).toBe(
      watermarkColor,
    );
  });
});

describe('Watermark playground', () => {
  test('uses theme-aware content colors in the preview and generated code', () => {
    const playground = collocatorPreset.Watermark.Watermark;
    const renderer = new ShallowRenderer();
    renderer.render(playground.element({ content: 'Shineout' }));

    const contentElement = findContentElement(renderer.getRenderOutput());

    expect(contentElement).not.toBeNull();
    expect(contentElement?.props.style?.background).toBe('var(--soui-neutral-fill-2)');
    expect(contentElement?.props.style?.color).toBe('var(--soui-neutral-text-5)');
    expect(playground.code).toContain("background: 'var(--soui-neutral-fill-2)'");
    expect(playground.code).toContain("color: 'var(--soui-neutral-text-5)'");

    const fontProperty = playground.properties.find(
      (property: { name: string }) => property.name === 'font',
    );
    expect(fontProperty.defaultValue).toEqual({ color: watermarkColor, fontSize: 16 });
    expect(fontProperty.notHideDefaultValue).toBe(true);
  });
});
