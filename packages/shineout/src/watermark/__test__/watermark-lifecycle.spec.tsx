import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { Watermark, useWatermarkTarget } from '../../../../base/src/watermark';

interface CanvasContextMock extends CanvasRenderingContext2D {
  drawImage: jest.Mock;
  fillText: jest.Mock;
  measureText: jest.Mock;
}

class ControlledImage {
  static instances: ControlledImage[] = [];
  static throwOnConstruction = false;
  static throwOnSource = false;

  assignments: string[] = [];
  onload: ((event: Event) => void) | null = null;
  onerror: ((event: Event | string) => void) | null = null;
  private crossOriginValue: string | null = null;
  private referrerPolicyValue = '';
  private source = '';

  constructor() {
    if (ControlledImage.throwOnConstruction) throw new Error('Image constructor failed');
    ControlledImage.instances.push(this);
  }

  get crossOrigin() {
    return this.crossOriginValue;
  }

  set crossOrigin(value: string | null) {
    this.assignments.push('crossOrigin');
    this.crossOriginValue = value;
  }

  get referrerPolicy() {
    return this.referrerPolicyValue;
  }

  set referrerPolicy(value: string) {
    this.assignments.push('referrerPolicy');
    this.referrerPolicyValue = value;
  }

  get src() {
    return this.source;
  }

  set src(value: string) {
    this.assignments.push('src');
    if (ControlledImage.throwOnSource) throw new Error('Image source failed');
    this.source = value;
  }

  load() {
    this.onload?.(new Event('load'));
  }

  error() {
    this.onerror?.(new Event('error'));
  }
}

class MockMutationObserver {
  static instances: MockMutationObserver[] = [];

  readonly callback: MutationCallback;
  active = false;
  records: MutationRecord[] = [];
  observe = jest.fn((_target: Node, _options?: MutationObserverInit) => {
    this.active = true;
  });
  disconnect = jest.fn(() => {
    this.active = false;
    this.records = [];
  });
  takeRecords = jest.fn((): MutationRecord[] => this.records.splice(0));

  constructor(callback: MutationCallback) {
    this.callback = jest.fn(callback);
    MockMutationObserver.instances.push(this);
  }

  emit(records: MutationRecord[]) {
    if (this.active) this.callback(records, this as unknown as MutationObserver);
  }

  queue(records: MutationRecord[]) {
    if (this.active) this.records.push(...records);
  }

  flush() {
    const records = this.takeRecords();
    if (this.active && records.length) {
      this.callback(records, this as unknown as MutationObserver);
    }
  }
}

type GlobalKey = 'Image' | 'MutationObserver';
type WindowKey = 'requestAnimationFrame' | 'cancelAnimationFrame';

let context: CanvasContextMock;
let drawImage: jest.Mock;
let fillText: jest.Mock;
let toDataURL: jest.SpyInstance;
let animationFrames: Map<number, FrameRequestCallback>;
let animationFrameId = 0;
let globalDescriptors: Record<GlobalKey, PropertyDescriptor | undefined>;
let windowDescriptors: Record<WindowKey, PropertyDescriptor | undefined>;
const externalElements = new Set<HTMLElement>();

const restoreProperty = (
  target: typeof globalThis | typeof window,
  key: GlobalKey | WindowKey,
  descriptor: PropertyDescriptor | undefined,
) => {
  if (descriptor) {
    Object.defineProperty(target, key, descriptor);
  } else {
    delete (target as unknown as Record<string, unknown>)[key];
  }
};

const flushAnimationFrames = () => {
  const queued = Array.from(animationFrames.entries());
  animationFrames.clear();
  act(() => {
    queued.forEach(([id, callback]) => callback(id));
  });
};

const getOverlay = (target: HTMLElement) =>
  (Array.from(target.children).find((element) => element.getAttribute('aria-hidden') === 'true') as
    | HTMLElement
    | undefined) || null;

const createMutationRecord = (
  type: MutationRecordType,
  target: Node,
  options: {
    addedNodes?: Node[];
    attributeName?: string;
    removedNodes?: Node[];
  } = {},
): MutationRecord => ({
  addedNodes: (options.addedNodes || []) as unknown as NodeList,
  attributeName: options.attributeName || null,
  attributeNamespace: null,
  nextSibling: null,
  oldValue: null,
  previousSibling: null,
  removedNodes: (options.removedNodes || []) as unknown as NodeList,
  target,
  type,
});

const getObserver = () => {
  expect(MockMutationObserver.instances).toHaveLength(1);
  return MockMutationObserver.instances[0];
};

const createExternalElement = () => {
  const element = document.createElement('div');
  document.body.appendChild(element);
  externalElements.add(element);
  return element;
};

beforeEach(() => {
  drawImage = jest.fn();
  fillText = jest.fn();
  context = {
    drawImage,
    fillStyle: '',
    fillText,
    font: '',
    measureText: jest.fn(
      (text: string) =>
        ({
          width: text.length * 8,
          fontBoundingBoxAscent: 10,
          fontBoundingBoxDescent: 6,
        } as TextMetrics),
    ),
    rotate: jest.fn(),
    save: jest.fn(),
    textAlign: 'start',
    textBaseline: 'alphabetic',
    translate: jest.fn(),
  } as unknown as CanvasContextMock;

  jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => context as unknown as CanvasRenderingContext2D);
  toDataURL = jest
    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    .mockImplementation(() => 'data:image/png;base64,watermark');

  animationFrameId = 0;
  animationFrames = new Map();
  windowDescriptors = {
    requestAnimationFrame: Object.getOwnPropertyDescriptor(window, 'requestAnimationFrame'),
    cancelAnimationFrame: Object.getOwnPropertyDescriptor(window, 'cancelAnimationFrame'),
  };
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: jest.fn((callback: FrameRequestCallback) => {
      const id = ++animationFrameId;
      animationFrames.set(id, callback);
      return id;
    }),
  });
  Object.defineProperty(window, 'cancelAnimationFrame', {
    configurable: true,
    value: jest.fn((id: number) => {
      animationFrames.delete(id);
    }),
  });

  ControlledImage.instances = [];
  ControlledImage.throwOnConstruction = false;
  ControlledImage.throwOnSource = false;
  MockMutationObserver.instances = [];
  globalDescriptors = {
    Image: Object.getOwnPropertyDescriptor(globalThis, 'Image'),
    MutationObserver: Object.getOwnPropertyDescriptor(globalThis, 'MutationObserver'),
  };
  Object.defineProperty(globalThis, 'Image', {
    configurable: true,
    value: ControlledImage,
  });
  Object.defineProperty(globalThis, 'MutationObserver', {
    configurable: true,
    value: MockMutationObserver,
  });
});

afterEach(() => {
  cleanup();
  externalElements.forEach((element) => element.remove());
  externalElements.clear();
  jest.restoreAllMocks();
  restoreProperty(globalThis, 'Image', globalDescriptors.Image);
  restoreProperty(globalThis, 'MutationObserver', globalDescriptors.MutationObserver);
  restoreProperty(window, 'requestAnimationFrame', windowDescriptors.requestAnimationFrame);
  restoreProperty(window, 'cancelAnimationFrame', windowDescriptors.cancelAnimationFrame);
});

describe('Watermark image lifecycle', () => {
  test('waits for the preferred image and applies its protected tile after load', () => {
    const { container } = render(<Watermark image='secure.png' content='FALLBACK' />);
    const root = container.firstElementChild as HTMLElement;

    flushAnimationFrames();

    expect(ControlledImage.instances).toHaveLength(1);
    const image = ControlledImage.instances[0];
    expect(image.crossOrigin).toBe('anonymous');
    expect(image.referrerPolicy).toBe('no-referrer');
    expect(image.src).toBe('secure.png');
    expect(image.assignments).toEqual(['crossOrigin', 'referrerPolicy', 'src']);
    expect(toDataURL).not.toHaveBeenCalled();
    expect(getOverlay(root)).toBeNull();

    act(() => image.load());

    expect(drawImage.mock.calls.some(([source]) => source === image)).toBe(true);
    expect(fillText).not.toHaveBeenCalled();
    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(getOverlay(root)).not.toBeNull();
  });

  test('falls back to content when the preferred image fails to load', () => {
    const { container } = render(<Watermark image='broken.png' content='FALLBACK' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();

    expect(ControlledImage.instances).toHaveLength(1);
    act(() => ControlledImage.instances[0].error());

    expect(fillText).toHaveBeenCalledWith('FALLBACK', expect.any(Number), expect.any(Number));
    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(getOverlay(root)).not.toBeNull();
  });

  test('falls back to content when drawing or exporting the loaded image throws', () => {
    toDataURL
      .mockImplementationOnce(() => {
        throw new Error('tainted image');
      })
      .mockImplementation(() => 'data:image/png;base64,fallback');
    const { container } = render(<Watermark image='tainted.png' content='FALLBACK' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();

    expect(ControlledImage.instances).toHaveLength(1);
    expect(() => act(() => ControlledImage.instances[0].load())).not.toThrow();

    expect(toDataURL).toHaveBeenCalledTimes(2);
    expect(fillText).toHaveBeenCalledWith('FALLBACK', expect.any(Number), expect.any(Number));
    expect(getOverlay(root)?.style.backgroundImage).toContain('fallback');
  });

  test('falls back to content when drawing the loaded image throws', () => {
    drawImage.mockImplementationOnce(() => {
      throw new Error('drawImage failed');
    });
    const { container } = render(<Watermark image='undrawable.png' content='FALLBACK' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();

    expect(() => act(() => ControlledImage.instances[0].load())).not.toThrow();

    expect(fillText).toHaveBeenCalledWith('FALLBACK', expect.any(Number), expect.any(Number));
    expect(getOverlay(root)).not.toBeNull();
  });

  test('ignores a stale image load after a new image is requested', () => {
    const { container, rerender } = render(<Watermark image='old.png' content='OLD' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    expect(ControlledImage.instances).toHaveLength(1);
    const oldImage = ControlledImage.instances[0];

    rerender(<Watermark image='new.png' content='NEW' />);
    flushAnimationFrames();
    expect(ControlledImage.instances).toHaveLength(2);
    const newImage = ControlledImage.instances[1];
    expect(oldImage.onload).toBeNull();
    expect(oldImage.onerror).toBeNull();

    act(() => oldImage.load());
    expect(toDataURL).not.toHaveBeenCalled();
    expect(getOverlay(root)).toBeNull();
    expect(drawImage.mock.calls.some(([source]) => source === oldImage)).toBe(false);

    act(() => newImage.load());
    expect(drawImage.mock.calls.some(([source]) => source === newImage)).toBe(true);
    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(getOverlay(root)).not.toBeNull();
    expect(newImage.onload).toBeNull();
    expect(newImage.onerror).toBeNull();
  });

  test('ignores a pending image after unmount', () => {
    const view = render(<Watermark image='pending.png' content='FALLBACK' />);
    const root = view.container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    expect(ControlledImage.instances).toHaveLength(1);
    const image = ControlledImage.instances[0];

    view.unmount();
    expect(image.onload).toBeNull();
    expect(image.onerror).toBeNull();
    act(() => image.load());

    expect(drawImage.mock.calls.some(([source]) => source === image)).toBe(false);
    expect(toDataURL).not.toHaveBeenCalled();
    expect(getOverlay(root)).toBeNull();
  });

  test('falls back to content when the global Image constructor is unavailable', () => {
    Object.defineProperty(globalThis, 'Image', {
      configurable: true,
      value: undefined,
    });
    const { container } = render(<Watermark image='unavailable.png' content='FALLBACK' />);
    const root = container.firstElementChild as HTMLElement;

    expect(() => flushAnimationFrames()).not.toThrow();

    expect(fillText).toHaveBeenCalledWith('FALLBACK', expect.any(Number), expect.any(Number));
    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(getOverlay(root)).not.toBeNull();
    expect(
      drawImage.mock.calls.some(
        ([source]) =>
          source instanceof HTMLCanvasElement && source.width === 120 && source.height === 64,
      ),
    ).toBe(true);
  });

  test.each(['construction', 'source assignment'])(
    'falls back to content when image %s throws',
    (failure) => {
      ControlledImage.throwOnConstruction = failure === 'construction';
      ControlledImage.throwOnSource = failure === 'source assignment';
      const { container } = render(<Watermark image='throwing.png' content='FALLBACK' />);
      const root = container.firstElementChild as HTMLElement;

      expect(() => flushAnimationFrames()).not.toThrow();

      expect(fillText).toHaveBeenCalledWith('FALLBACK', expect.any(Number), expect.any(Number));
      expect(getOverlay(root)).not.toBeNull();
      const sourceAssignments =
        failure === 'source assignment' ? ['crossOrigin', 'referrerPolicy', 'src'] : undefined;
      expect(ControlledImage.instances).toHaveLength(sourceAssignments ? 1 : 0);
      expect(ControlledImage.instances[0]?.assignments).toEqual(sourceAssignments);
    },
  );
});

describe('Watermark tamper lifecycle', () => {
  test('restores a hard-removed overlay before notifying once for the mutation batch', () => {
    let root: HTMLElement;
    let overlay: HTMLElement | null = null;
    const onRemove = jest.fn(() => {
      expect(overlay?.parentElement).toBe(root);
      expect(getOverlay(root)).toBe(overlay);
    });
    const { container } = render(<Watermark content='PROTECTED' onRemove={onRemove} />);
    root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    overlay = getOverlay(root);
    const observer = getObserver();

    overlay?.remove();
    observer.emit([
      createMutationRecord('childList', root, { removedNodes: [overlay!] }),
      createMutationRecord('childList', root, { removedNodes: [overlay!] }),
    ]);

    expect(getOverlay(root)).toBe(overlay);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test('notifies when an overlay is removed and synchronously reinserted', () => {
    const onRemove = jest.fn();
    const { container } = render(<Watermark content='PROTECTED' onRemove={onRemove} />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root)!;

    overlay.remove();
    root.appendChild(overlay);
    getObserver().emit([
      createMutationRecord('childList', root, {
        addedNodes: [overlay],
        removedNodes: [overlay],
      }),
    ]);

    expect(getOverlay(root)).toBe(overlay);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test('does not lose a queued removal when an unrelated rerender happens first', () => {
    const onRemove = jest.fn();
    const style = { height: 40 };
    const { container, rerender } = render(
      <Watermark content='PROTECTED' className='stable-root' style={style} onRemove={onRemove} />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root)!;
    const observer = getObserver();

    overlay.remove();
    observer.queue([createMutationRecord('childList', root, { removedNodes: [overlay] })]);
    rerender(
      <Watermark content='PROTECTED' className='stable-root' style={style} onRemove={onRemove} />,
    );
    observer.flush();

    expect(getOverlay(root)).toBe(overlay);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  test('repairs a queued class tamper when React only changes the root style', () => {
    const { container, rerender } = render(
      <Watermark content='PROTECTED' className='trusted-root' style={{ color: 'red' }} />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const observer = getObserver();

    root.setAttribute('class', 'tampered-root');
    observer.queue([createMutationRecord('attributes', root, { attributeName: 'class' })]);
    rerender(<Watermark content='PROTECTED' className='trusted-root' style={{ color: 'blue' }} />);
    observer.flush();

    expect(root.getAttribute('class')).toBe('trusted-root');
    expect(root.style.color).toBe('blue');
  });

  test('repairs a queued style tamper when React only changes the root class', () => {
    const stableStyle = { color: 'red', height: 20 };
    const { container, rerender } = render(
      <Watermark content='PROTECTED' className='first-root' style={stableStyle} />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const observer = getObserver();

    root.setAttribute('style', 'display: none;');
    observer.queue([createMutationRecord('attributes', root, { attributeName: 'style' })]);
    rerender(<Watermark content='PROTECTED' className='second-root' style={stableStyle} />);
    observer.flush();

    expect(root.getAttribute('class')).toBe('second-root');
    expect(root.style.display).toBe('');
    expect(root.style.color).toBe('red');
    expect(root.style.height).toBe('20px');
  });

  test('removes an injected style when React changes another style property', () => {
    const { container, rerender } = render(
      <Watermark content='PROTECTED' className='trusted-root' style={{ color: 'red' }} />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const observer = getObserver();

    root.style.display = 'none';
    observer.queue([createMutationRecord('attributes', root, { attributeName: 'style' })]);
    rerender(<Watermark content='PROTECTED' className='trusted-root' style={{ color: 'blue' }} />);
    observer.flush();

    expect(root.style.color).toBe('blue');
    expect(root.style.display).toBe('');
    expect(root.getAttribute('style')).toBe('color: blue;');
  });

  test('keeps the root target registered through StrictMode effect replay', () => {
    const { container } = render(
      <React.StrictMode>
        <Watermark content='STRICT MODE' />
      </React.StrictMode>,
    );
    const root = container.firstElementChild as HTMLElement;

    flushAnimationFrames();

    expect(getOverlay(root)).not.toBeNull();
  });

  test('repairs overlay attributes and injected children without notifying removal', () => {
    const onRemove = jest.fn();
    const { container } = render(<Watermark content='PROTECTED' onRemove={onRemove} />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root)!;
    const expectedStyle = overlay.getAttribute('style');
    const injected = document.createElement('span');

    overlay.setAttribute('style', 'display: none;');
    overlay.setAttribute('class', 'tampered');
    overlay.setAttribute('hidden', '');
    overlay.setAttribute('aria-hidden', 'false');
    overlay.appendChild(injected);
    getObserver().emit([
      createMutationRecord('attributes', overlay, { attributeName: 'style' }),
      createMutationRecord('attributes', overlay, { attributeName: 'class' }),
      createMutationRecord('attributes', overlay, { attributeName: 'hidden' }),
      createMutationRecord('attributes', overlay, { attributeName: 'aria-hidden' }),
      createMutationRecord('childList', overlay, { addedNodes: [injected] }),
    ]);

    expect(overlay.getAttribute('style')).toBe(expectedStyle);
    expect(overlay.hasAttribute('class')).toBe(false);
    expect(overlay.hasAttribute('hidden')).toBe(false);
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
    expect(overlay.childNodes).toHaveLength(0);
    expect(overlay.style.visibility).toBe('visible');
    expect(overlay.style.getPropertyPriority('visibility')).toBe('important');
    expect(onRemove).not.toHaveBeenCalled();
  });

  test('restores the current root class and style baseline after each React commit', () => {
    const onRemove = jest.fn();
    const { container, rerender } = render(
      <Watermark
        content='PROTECTED'
        className='first-root'
        style={{ color: 'red', height: 20 }}
        onRemove={onRemove}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const observer = getObserver();
    const firstClass = root.getAttribute('class');
    const firstStyle = root.getAttribute('style');

    root.setAttribute('class', 'external-first');
    root.setAttribute('style', 'display: none;');
    observer.emit([
      createMutationRecord('attributes', root, { attributeName: 'class' }),
      createMutationRecord('attributes', root, { attributeName: 'style' }),
    ]);
    expect(root.getAttribute('class')).toBe(firstClass);
    expect(root.getAttribute('style')).toBe(firstStyle);

    rerender(
      <Watermark
        content='PROTECTED'
        className='second-root'
        style={{ color: 'blue', width: 40 }}
        onRemove={onRemove}
      />,
    );
    const secondClass = root.getAttribute('class');
    const secondStyle = root.getAttribute('style');
    expect(secondClass).not.toBe(firstClass);
    expect(secondStyle).not.toBe(firstStyle);

    root.setAttribute('class', 'external-second');
    root.setAttribute('style', 'visibility: hidden;');
    observer.emit([
      createMutationRecord('attributes', root, { attributeName: 'class' }),
      createMutationRecord('attributes', root, { attributeName: 'style' }),
    ]);
    expect(root.getAttribute('class')).toBe(secondClass);
    expect(root.getAttribute('style')).toBe(secondStyle);
    expect(onRemove).not.toHaveBeenCalled();
  });

  test('uses the latest onRemove callback after a prop-only rerender', () => {
    const firstOnRemove = jest.fn();
    const secondOnRemove = jest.fn();
    const { container, rerender } = render(
      <Watermark content='PROTECTED' onRemove={firstOnRemove} />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root)!;
    const observer = getObserver();

    rerender(<Watermark content='PROTECTED' onRemove={secondOnRemove} />);
    overlay.remove();
    observer.emit([createMutationRecord('childList', root, { removedNodes: [overlay] })]);

    expect(firstOnRemove).not.toHaveBeenCalled();
    expect(secondOnRemove).toHaveBeenCalledTimes(1);
  });

  test('keeps owned cleanup silent and disconnects the observer on unmount', () => {
    const externalTarget = createExternalElement();
    const onRemove = jest.fn();
    const RegisterTarget = () => {
      const getTarget = React.useCallback(() => externalTarget, []);
      useWatermarkTarget(getTarget);
      return null;
    };
    const view = render(
      <Watermark content='VISIBLE' onRemove={onRemove}>
        <RegisterTarget />
      </Watermark>,
    );
    const root = view.container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const observer = getObserver();
    expect(getOverlay(root)).not.toBeNull();
    expect(getOverlay(externalTarget)).not.toBeNull();

    view.rerender(
      <Watermark content='' onRemove={onRemove}>
        <RegisterTarget />
      </Watermark>,
    );
    flushAnimationFrames();
    expect(getOverlay(root)).toBeNull();
    expect(getOverlay(externalTarget)).toBeNull();

    view.rerender(
      <Watermark content='VISIBLE AGAIN' onRemove={onRemove}>
        <RegisterTarget />
      </Watermark>,
    );
    flushAnimationFrames();
    expect(getOverlay(externalTarget)).not.toBeNull();

    view.rerender(<Watermark content='VISIBLE AGAIN' onRemove={onRemove} />);
    expect(getOverlay(externalTarget)).toBeNull();
    view.rerender(<Watermark content='REACT RERENDER' onRemove={onRemove} />);
    flushAnimationFrames();
    view.unmount();

    expect(onRemove).not.toHaveBeenCalled();
    expect(observer.disconnect).toHaveBeenCalled();
    expect(observer.active).toBe(false);
  });

  test('still draws when MutationObserver is unavailable', () => {
    Object.defineProperty(globalThis, 'MutationObserver', {
      configurable: true,
      value: undefined,
    });
    const { container } = render(<Watermark content='UNOBSERVED' />);
    const root = container.firstElementChild as HTMLElement;

    expect(() => flushAnimationFrames()).not.toThrow();
    expect(getOverlay(root)).not.toBeNull();
    expect(MockMutationObserver.instances).toHaveLength(0);
  });

  test('repairs one emitted mutation without observer feedback and resumes observation', () => {
    const { container } = render(<Watermark content='PROTECTED' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root)!;
    const observer = getObserver();
    const callback = observer.callback as jest.Mock;
    const observedBeforeRepair = observer.observe.mock.calls.length;

    overlay.setAttribute('style', 'display: none;');
    observer.emit([createMutationRecord('attributes', overlay, { attributeName: 'style' })]);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(observer.observe.mock.calls.length).toBeGreaterThan(observedBeforeRepair);
    expect(observer.observe).toHaveBeenLastCalledWith(root, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'],
    });
    expect(observer.active).toBe(true);
    expect(overlay.style.display).toBe('');
  });
});
