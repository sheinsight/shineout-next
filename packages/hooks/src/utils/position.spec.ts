import { getPosition } from './position';

const setViewport = (width: number, height: number) => {
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
  Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: height });
};

const createTarget = (left: number, top: number, width = 80, height = 30) => {
  const el = document.createElement('div');
  el.getBoundingClientRect = () =>
    ({ left, top, width, height, right: left + width, bottom: top + height, x: left, y: top } as DOMRect);
  return el;
};

// 模拟弹出层尺寸：clone 出来的节点同样返回该尺寸
const createPopup = (width: number, height: number) => {
  const parent = document.createElement('div');
  const popup = document.createElement('div');
  // 模拟 CSS 类带有 display: none 的关闭状态：只有内联 display: block 时才有尺寸
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return this.style.display === 'block' ? width : 0;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      return this.style.display === 'block' ? height : 0;
    },
  });
  parent.appendChild(popup);
  return popup;
};

describe('getPosition[positionPriority]', () => {
  beforeEach(() => setViewport(1000, 800));

  test('picks the first direction that has enough space', () => {
    const target = createTarget(460, 380);
    const popup = createPopup(100, 60);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['right', 'bottom', 'left', 'top'])).toMatch(
      /^right/,
    );
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['left', 'top'])).toMatch(/^left/);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['bottom'])).toMatch(/^bottom/);
  });

  test('measures a closed popup (display: none by class) with its real size', () => {
    // 上方只有 20px，放不下 60px 高的弹层，应回落到 right 而不是停在 top
    const target = createTarget(460, 20);
    const popup = createPopup(100, 60);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['top', 'right'])).toMatch(/^right/);
  });

  test('skips directions without enough space', () => {
    // 靠近右边缘：right 放不下，回落到下一个
    const target = createTarget(900, 380);
    const popup = createPopup(150, 60);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['right', 'bottom'])).toMatch(/^bottom/);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['right', 'left'])).toMatch(/^left/);
  });

  test('falls back to the direction with the most space when none fits', () => {
    // 弹层比任何一侧都大：top 空间 20，bottom 空间约 750，right 空间 ~20
    const target = createTarget(900, 20);
    const popup = createPopup(2000, 2000);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['top', 'right', 'bottom', 'left'])).toMatch(
      /^left/,
    );
  });

  test('calculates space inside the container instead of the viewport', () => {
    const container = document.createElement('div');
    container.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 500, height: 400, right: 500, bottom: 400, x: 0, y: 0 } as DOMRect);
    const target = createTarget(400, 150);
    const popup = createPopup(150, 40);
    // 视口里 right 有 ~500px，但容器内只剩 20px
    expect(getPosition(target, 'vertical', 'popover', popup, container, ['right', 'left'])).toMatch(/^left/);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['right', 'left'])).toMatch(/^right/);
  });

  test('skips a direction whose popup would overflow on the cross axis', () => {
    // 触发元素的右侧被裁出可用区域（right=1025 > 1000）：top 主轴空间充足，
    // 但按 top-right 对齐后弹层右端会超出，应跳过；right 无空间；bottom 同样超出；最终选 left
    const target = createTarget(930, 380, 95, 30);
    const popup = createPopup(200, 40);
    expect(getPosition(target, 'vertical', 'popover', popup, null, ['top', 'right', 'bottom', 'left'])).toMatch(
      /^left/,
    );
  });

  test('ignores empty priority and keeps priorityDirection behavior', () => {
    const target = createTarget(100, 100);
    const popup = createPopup(100, 60);
    expect(getPosition(target, 'vertical', 'popover', popup, null, [])).toBe(
      getPosition(target, 'vertical', 'popover', popup),
    );
  });

  test('gives alignment suffix based on the target position', () => {
    setViewport(1000, 800);
    const popup = createPopup(100, 60);
    expect(getPosition(createTarget(20, 380), 'vertical', 'popover', popup, null, ['top'])).toBe('top-left');
    expect(getPosition(createTarget(900, 380), 'vertical', 'popover', popup, null, ['top'])).toBe('top-right');
    expect(getPosition(createTarget(460, 380), 'vertical', 'popover', popup, null, ['top'])).toBe('top');
    expect(getPosition(createTarget(460, 20), 'vertical', 'popover', popup, null, ['right'])).toBe('right-top');
    expect(getPosition(createTarget(460, 740), 'vertical', 'popover', popup, null, ['right'])).toBe('right-bottom');
  });
});
