import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BaseExample from '../__example__/01-base';
import ColorExample from '../__example__/02-color';
import CustomContainerExample from '../__example__/03-custom-container';
import DurationExample from '../__example__/04-duration';
import SizeExample from '../__example__/05-size';
import LineWidthExample from '../__example__/06-line-width';
import OutsetExample from '../__example__/07-outset';
import HoverExample from '../__example__/08-hover';
import { collocatorPreset } from '../../../../../docs/theme/components/collocator/preset';

interface ElementProps {
  children?: React.ReactNode;
}

const collectText = (node: React.ReactNode): string[] => {
  if (typeof node === 'string' || typeof node === 'number') return [String(node)];
  if (!React.isValidElement<ElementProps>(node)) return [];
  return React.Children.toArray(node.props.children).flatMap(collectText);
};

const getExampleText = (Example: React.ComponentType) => {
  const renderer = new ShallowRenderer();
  renderer.render(<Example />);
  return collectText(renderer.getRenderOutput()).join(' ');
};

const examples = [
  [BaseExample, ['Example panel', 'Supporting content for the default BorderBeam example.']],
  [
    ColorExample,
    [
      'Blue, cyan, and green',
      'Orange, red, and pink',
      'Violet, cyan, and light cyan',
      'Green, lime, and yellow',
      'Orange, coral, and yellow',
      'Blue, violet, and pink',
    ],
  ],
  [
    CustomContainerExample,
    ['Custom panel', 'Supporting content inside a ref-forwarding container.'],
  ],
  [
    DurationExample,
    ['Fast loop', 'Default loop', 'Slow loop', '3 seconds', '6 seconds', '12 seconds'],
  ],
  [SizeExample, ['Short beam', 'Default beam', 'Long beam', '56px', '100px', '160px']],
  [LineWidthExample, ['Default line', 'Wide line', '1px', '2px']],
  [OutsetExample, ['Clipped panel', 'The beam remains inside this overflow-hidden container.']],
  [HoverExample, ['Hover preview', 'The beam is visible while this container is hovered.']],
] as const;

describe.each(examples)('BorderBeam example copy', (Example, expectedText) => {
  test('uses approved neutral text', () => {
    const text = getExampleText(Example);
    expectedText.forEach((value) => expect(text).toContain(value));
    expect(text).not.toMatch(
      /deploy|production|release|update|recommend|status|healthy|benefit|insight|launch|access/i,
    );
  });
});

test('uses matching neutral copy in the playground preview and generated code', () => {
  const playground = collocatorPreset.BorderBeam.BorderBeam;
  const renderer = new ShallowRenderer();
  renderer.render(playground.element({}));
  const previewText = collectText(renderer.getRenderOutput()).join(' ');

  expect(previewText).toContain('Example panel');
  expect(previewText).toContain('Supporting content for the BorderBeam playground.');
  expect(playground.code).toContain('<strong>Example panel</strong>');
  expect(playground.code).toContain('Supporting content for the BorderBeam playground.');
  expect(playground.code).not.toMatch(/Tune the controls|Border highlight preview/i);
});

const readGuide = (name: string) =>
  fs.readFileSync(path.join(__dirname, '..', '__doc__', name), 'utf8').trim();

test('uses only the approved Chinese guide copy', () => {
  expect(readGuide('guide.cn.md')).toBe(`## 何时使用

### 当页面需要通过装饰性动效提升某个容器的视觉层级时，可以使用 BorderBeam。

### 适用于需要在同类内容中获得更多关注的卡片、面板或展示区域。

### BorderBeam 仅用于视觉强调，不传达状态或交互反馈，也不应替代焦点、选中、校验等必要样式。`);
});

test('uses only the approved English guide copy', () => {
  expect(readGuide('guide.en.md')).toBe(`## When to use

### Use BorderBeam when a container needs additional visual emphasis through decorative motion.

### It is suitable for cards, panels, or showcase areas that should stand out from nearby content.

### BorderBeam is decorative only. It does not communicate status or interaction feedback and should not replace focus, selection, or validation styles.`);
});
