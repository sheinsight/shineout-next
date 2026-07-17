import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { Watermark } from '../../../../base/src/watermark';
import Drawer from '../../drawer';
import Modal from '../../modal';

interface CanvasContextMock extends CanvasRenderingContext2D {
  measureText: jest.Mock;
}

type WindowKey = 'requestAnimationFrame' | 'cancelAnimationFrame';

let animationFrameId = 0;
let animationFrames: Map<number, FrameRequestCallback>;
let tileId = 0;
let windowDescriptors: Record<WindowKey, PropertyDescriptor | undefined>;
const externalContainers = new Set<HTMLElement>();

const restoreProperty = (
  target: typeof window,
  key: WindowKey,
  descriptor: PropertyDescriptor | undefined,
) => {
  if (descriptor) {
    Object.defineProperty(target, key, descriptor);
  } else {
    delete target[key];
  }
};

const flushAnimationFrames = () => {
  const queued = Array.from(animationFrames.entries());
  animationFrames.clear();
  act(() => queued.forEach(([id, callback]) => callback(id)));
};

const getOverlay = (target: HTMLElement) =>
  (Array.from(target.children).find((element) => element.getAttribute('aria-hidden') === 'true') as
    | HTMLElement
    | undefined) || null;

const createExternalContainer = () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  externalContainers.add(container);
  return container;
};

beforeEach(() => {
  const context = {
    drawImage: jest.fn(),
    fillStyle: '',
    fillText: jest.fn(),
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
  jest
    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    .mockImplementation(() => `data:image/png;base64,watermark-${++tileId}`);

  animationFrameId = 0;
  animationFrames = new Map();
  tileId = 0;
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
    value: jest.fn((id: number) => animationFrames.delete(id)),
  });
});

afterEach(() => {
  cleanup();
  externalContainers.forEach((container) => container.remove());
  externalContainers.clear();
  jest.restoreAllMocks();
  restoreProperty(window, 'requestAnimationFrame', windowDescriptors.requestAnimationFrame);
  restoreProperty(window, 'cancelAnimationFrame', windowDescriptors.cancelAnimationFrame);
});

describe('Watermark portal inheritance', () => {
  test('targets each modal wrapper instead of its holder or the shared root', () => {
    render(
      <Watermark content='CONFIDENTIAL'>
        <Modal visible rootClassName='watermark-modal-target'>
          Modal content
        </Modal>
      </Watermark>,
    );

    flushAnimationFrames();

    const wrapper = document.querySelector('.watermark-modal-target') as HTMLElement;
    const holder = wrapper.parentElement as HTMLElement;
    const sharedRoot = holder.parentElement as HTMLElement;
    expect(getOverlay(wrapper)).not.toBeNull();
    expect(getOverlay(holder)).toBeNull();
    expect(getOverlay(sharedRoot)).toBeNull();
  });

  test('adds one cached watermark tile to every declarative modal', () => {
    render(
      <Watermark content='CONFIDENTIAL'>
        <Modal visible rootClassName='first-watermark-modal'>
          First
        </Modal>
        <Modal visible rootClassName='second-watermark-modal'>
          Second
        </Modal>
      </Watermark>,
    );

    flushAnimationFrames();

    const first = document.querySelector('.first-watermark-modal') as HTMLElement;
    const second = document.querySelector('.second-watermark-modal') as HTMLElement;
    expect(getOverlay(first)).not.toBeNull();
    expect(getOverlay(second)).not.toBeNull();
    expect(getOverlay(first)?.style.backgroundImage).toBe(
      getOverlay(second)?.style.backgroundImage,
    );
    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledTimes(1);
  });

  test('does not inherit into a modal when inherit is false', () => {
    const { container } = render(
      <Watermark content='LOCAL ONLY' inherit={false}>
        <Modal visible rootClassName='non-inherited-modal'>
          Modal content
        </Modal>
      </Watermark>,
    );

    flushAnimationFrames();

    const root = container.firstElementChild as HTMLElement;
    const wrapper = document.querySelector('.non-inherited-modal') as HTMLElement;
    expect(getOverlay(root)).not.toBeNull();
    expect(getOverlay(wrapper)).toBeNull();
  });

  test('uses the nearest watermark provider for a nested modal', () => {
    const { container } = render(
      <Watermark content='OUTER'>
        <Watermark content='INNER' className='inner-watermark'>
          <Modal visible rootClassName='nested-watermark-modal'>
            Modal content
          </Modal>
        </Watermark>
      </Watermark>,
    );

    flushAnimationFrames();

    const outerRoot = container.firstElementChild as HTMLElement;
    const innerRoot = outerRoot.querySelector('.inner-watermark') as HTMLElement;
    const wrapper = document.querySelector('.nested-watermark-modal') as HTMLElement;
    const outerBackground = getOverlay(outerRoot)?.style.backgroundImage;
    const innerBackground = getOverlay(innerRoot)?.style.backgroundImage;
    expect(getOverlay(wrapper)?.style.backgroundImage).toBe(innerBackground);
    expect(innerBackground).not.toBe(outerBackground);
  });

  test('inherits into a modal rendered in a custom container', () => {
    const portalContainer = createExternalContainer();
    render(
      <Watermark content='CUSTOM CONTAINER'>
        <Modal visible container={portalContainer} rootClassName='custom-container-modal'>
          Modal content
        </Modal>
      </Watermark>,
    );

    flushAnimationFrames();

    const wrapper = portalContainer.querySelector('.custom-container-modal') as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(getOverlay(wrapper)).not.toBeNull();
  });

  test('keeps the root watermark when custom-container inheritance is disabled', () => {
    const portalContainer = createExternalContainer();
    const { container, rerender } = render(
      <Watermark content='CUSTOM TOGGLE'>
        <Modal visible container={portalContainer} rootClassName='custom-toggle-modal'>
          Modal content
        </Modal>
      </Watermark>,
    );

    flushAnimationFrames();
    const root = container.firstElementChild as HTMLElement;
    const wrapper = portalContainer.querySelector('.custom-toggle-modal') as HTMLElement;
    const rootOverlay = getOverlay(root);
    expect(rootOverlay).not.toBeNull();
    expect(getOverlay(wrapper)).not.toBeNull();

    rerender(
      <Watermark content='CUSTOM TOGGLE' inherit={false}>
        <Modal visible container={portalContainer} rootClassName='custom-toggle-modal'>
          Modal content
        </Modal>
      </Watermark>,
    );
    flushAnimationFrames();

    expect(getOverlay(root)).toBe(rootOverlay);
    expect(getOverlay(wrapper)).toBeNull();
  });

  test('inherits into Drawer through the shared Modal implementation', () => {
    render(
      <Watermark content='DRAWER'>
        <Drawer visible rootClassName='watermark-drawer-target'>
          Drawer content
        </Drawer>
      </Watermark>,
    );

    flushAnimationFrames();

    const wrapper = document.querySelector('.watermark-drawer-target') as HTMLElement;
    expect(wrapper.className).toContain('drawer');
    expect(getOverlay(wrapper)).not.toBeNull();
  });

  test('removes the owned overlay silently when a modal unmounts', () => {
    const onRemove = jest.fn();
    const { rerender } = render(
      <Watermark content='TEMPORARY' onRemove={onRemove}>
        <Modal visible rootClassName='temporary-watermark-modal'>
          Modal content
        </Modal>
      </Watermark>,
    );
    flushAnimationFrames();
    const wrapper = document.querySelector('.temporary-watermark-modal') as HTMLElement;
    expect(getOverlay(wrapper)).not.toBeNull();

    rerender(<Watermark content='TEMPORARY' onRemove={onRemove} />);

    expect(getOverlay(wrapper)).toBeNull();
    expect(wrapper.isConnected).toBe(false);
    expect(onRemove).not.toHaveBeenCalled();
  });
});
