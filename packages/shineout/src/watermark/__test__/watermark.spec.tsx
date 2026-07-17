import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { Watermark, WatermarkContext, useWatermarkTarget } from '../../../../base/src/watermark';

interface CanvasContextMock extends CanvasRenderingContext2D {
  fillText: jest.Mock;
}

const createCanvasContext = (): CanvasContextMock =>
  ({
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
  } as unknown as CanvasContextMock);

let context: CanvasContextMock;
let getContext: jest.SpyInstance;
let toDataURL: jest.SpyInstance;
let requestAnimationFrameMock: jest.Mock;
let cancelAnimationFrameMock: jest.Mock;
let requestAnimationFrameDescriptor: PropertyDescriptor | undefined;
let cancelAnimationFrameDescriptor: PropertyDescriptor | undefined;
let animationFrameId = 0;
let animationFrames: Map<number, FrameRequestCallback>;
const externalTargets = new Set<HTMLElement>();

const restoreProperty = (
  target: typeof window,
  key: 'requestAnimationFrame' | 'cancelAnimationFrame',
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
  act(() => {
    queued.forEach(([id, callback]) => callback(id));
  });
};

const getOverlay = (target: HTMLElement) =>
  (Array.from(target.children).find((element) => element.getAttribute('aria-hidden') === 'true') as
    | HTMLElement
    | undefined) || null;

const createExternalTarget = () => {
  const target = document.createElement('div');
  document.body.appendChild(target);
  externalTargets.add(target);
  return target;
};

beforeEach(() => {
  context = createCanvasContext();
  getContext = jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => context as any);
  toDataURL = jest
    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    .mockImplementation(() => 'data:image/png;base64,watermark');

  animationFrameId = 0;
  animationFrames = new Map();
  requestAnimationFrameDescriptor = Object.getOwnPropertyDescriptor(
    window,
    'requestAnimationFrame',
  );
  cancelAnimationFrameDescriptor = Object.getOwnPropertyDescriptor(window, 'cancelAnimationFrame');
  requestAnimationFrameMock = jest.fn((callback: FrameRequestCallback) => {
    const id = ++animationFrameId;
    animationFrames.set(id, callback);
    return id;
  });
  cancelAnimationFrameMock = jest.fn((id: number) => {
    animationFrames.delete(id);
  });
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: requestAnimationFrameMock,
  });
  Object.defineProperty(window, 'cancelAnimationFrame', {
    configurable: true,
    value: cancelAnimationFrameMock,
  });
});

afterEach(() => {
  cleanup();
  externalTargets.forEach((target) => target.remove());
  externalTargets.clear();
  jest.restoreAllMocks();
  restoreProperty(window, 'requestAnimationFrame', requestAnimationFrameDescriptor);
  restoreProperty(window, 'cancelAnimationFrame', cancelAnimationFrameDescriptor);
});

describe('Watermark', () => {
  test('keeps the root content and appends one non-interactive repeating overlay', () => {
    const { container } = render(
      <Watermark
        content='CONFIDENTIAL'
        className='custom'
        style={{ height: 200 }}
        jssStyle={{ watermark: () => ({ rootClass: 'wm-root', wrapper: 'wm-wrapper' }) }}
      >
        <span>report</span>
      </Watermark>,
    );
    const root = container.firstElementChild as HTMLElement;

    flushAnimationFrames();

    const overlay = getOverlay(root);
    expect(root.classList).toEqual(
      expect.objectContaining({ 0: 'wm-root', 1: 'wm-wrapper', 2: 'custom' }),
    );
    expect(root.style.height).toBe('200px');
    expect(root.querySelector('span')?.textContent).toBe('report');
    expect(overlay).not.toBeNull();
    expect(root.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    expect(overlay?.style.pointerEvents).toBe('none');
    expect(overlay?.style.backgroundRepeat).toBe('repeat');
    expect(overlay?.style.backgroundImage).toContain('data:image/png;base64,watermark');
    expect(overlay?.style.visibility).toBe('visible');
    expect(overlay?.style.getPropertyPriority('visibility')).toBe('important');
  });

  test('moves positive offsets into the overlay and negative offsets into the background', () => {
    const { container } = render(
      <Watermark
        content='GEOMETRY'
        gap={[80, 60]}
        offset={[60, -10]}
        width={40}
        height={20}
        rotate={0}
        zIndex={321}
      />,
    );
    const root = container.firstElementChild as HTMLElement;

    flushAnimationFrames();

    const overlay = getOverlay(root)!;
    expect(overlay.style.left).toBe('20px');
    expect(overlay.style.top).toBe('0px');
    expect(overlay.style.width).toBe('calc(100% - 20px)');
    expect(overlay.style.height).toBe('100%');
    expect(overlay.style.backgroundPosition).toBe('0px -40px');
    expect(overlay.style.zIndex).toBe('321');
  });

  test.each([Number.NaN, Number.POSITIVE_INFINITY])(
    'falls back to the default z-index for %s',
    (zIndex) => {
      const { container } = render(<Watermark content='Z-INDEX' zIndex={zIndex} />);
      const root = container.firstElementChild as HTMLElement;
      flushAnimationFrames();

      const overlay = getOverlay(root);
      expect(overlay).not.toBeNull();
      expect(overlay?.style.zIndex).toBe('999');
    },
  );

  test('keeps fractional DPR background geometry aligned with the exported bitmap', () => {
    const devicePixelRatioDescriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
    let exportedBitmapSize: [number, number] = [0, 0];
    Object.defineProperty(window, 'devicePixelRatio', {
      configurable: true,
      value: 1.5,
    });
    toDataURL.mockImplementation(function (this: HTMLCanvasElement) {
      exportedBitmapSize = [this.width, this.height];
      return 'data:image/png;base64,fractional';
    });

    try {
      const { container } = render(
        <Watermark content='FRACTIONAL' width={41} height={19} rotate={120} gap={[11.25, 17.25]} />,
      );
      const root = container.firstElementChild as HTMLElement;
      flushAnimationFrames();

      const backgroundSize = getOverlay(root)!
        .style.backgroundSize.split(' ')
        .map((value) => Number.parseFloat(value));
      expect(backgroundSize[0] * 1.5).toBe(exportedBitmapSize[0]);
      expect(backgroundSize[1] * 1.5).toBe(exportedBitmapSize[1]);
    } finally {
      if (devicePixelRatioDescriptor) {
        Object.defineProperty(window, 'devicePixelRatio', devicePixelRatioDescriptor);
      } else {
        delete (window as { devicePixelRatio?: number }).devicePixelRatio;
      }
    }
  });

  test('redraws equivalent props on the next React render when devicePixelRatio changes', () => {
    const devicePixelRatioDescriptor = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
    Object.defineProperty(window, 'devicePixelRatio', {
      configurable: true,
      value: 1,
    });

    try {
      const { rerender } = render(<Watermark content={{ text: 'DPR' }} />);
      flushAnimationFrames();
      expect(toDataURL).toHaveBeenCalledTimes(1);

      Object.defineProperty(window, 'devicePixelRatio', {
        configurable: true,
        value: 2,
      });
      rerender(<Watermark content={{ text: 'DPR' }} className='dpr-rerender' />);

      expect(animationFrames.size).toBe(1);
      flushAnimationFrames();
      expect(toDataURL).toHaveBeenCalledTimes(2);
    } finally {
      if (devicePixelRatioDescriptor) {
        Object.defineProperty(window, 'devicePixelRatio', devicePixelRatioDescriptor);
      } else {
        delete (window as { devicePixelRatio?: number }).devicePixelRatio;
      }
    }
  });

  test('deduplicates equivalent drawing values and retains the overlay when content changes', () => {
    const { container, rerender } = render(
      <Watermark
        content={[{ text: 'SAME', font: { fontSize: 18 } }]}
        font={{ color: '#123456', fontFamily: 'serif' }}
        gap={[80, 60]}
        offset={[40, 30]}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root);
    expect(toDataURL).toHaveBeenCalledTimes(1);

    rerender(
      <Watermark
        content={[{ text: 'SAME', font: { fontSize: 18 } }]}
        font={{ color: '#123456', fontFamily: 'serif' }}
        gap={[80, 60]}
        offset={[40, 30]}
      />,
    );
    flushAnimationFrames();

    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(getOverlay(root)).toBe(overlay);

    rerender(
      <Watermark
        content={[{ text: 'CHANGED', font: { fontSize: 18 } }]}
        font={{ color: '#123456', fontFamily: 'serif' }}
        gap={[80, 60]}
        offset={[40, 30]}
      />,
    );
    flushAnimationFrames();

    expect(toDataURL).toHaveBeenCalledTimes(2);
    expect(getOverlay(root)).toBe(overlay);
  });

  test('removes the previous overlay when the next measurement context is unavailable', () => {
    const { container, rerender } = render(<Watermark content='VISIBLE' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root);
    expect(overlay).not.toBeNull();

    getContext.mockImplementationOnce(() => null);
    rerender(<Watermark content='NO CONTEXT' />);

    expect(() => flushAnimationFrames()).not.toThrow();
    expect(getOverlay(root)).toBeNull();
    expect(overlay?.isConnected).toBe(false);
  });

  test('removes the previous overlay when the next canvas export throws', () => {
    const { container, rerender } = render(<Watermark content='VISIBLE' />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root);
    expect(overlay).not.toBeNull();

    toDataURL.mockImplementationOnce(() => {
      throw new Error('export failed');
    });
    rerender(<Watermark content='EXPORT FAILURE' />);

    expect(() => flushAnimationFrames()).not.toThrow();
    expect(getOverlay(root)).toBeNull();
    expect(overlay?.isConnected).toBe(false);
  });

  test('retries the same drawing props after a transient canvas export failure', () => {
    toDataURL.mockImplementationOnce(() => {
      throw new Error('transient');
    });
    const { container, rerender } = render(<Watermark content='RETRY' />);
    const root = container.firstElementChild as HTMLElement;

    expect(() => flushAnimationFrames()).not.toThrow();
    expect(getOverlay(root)).toBeNull();
    expect(toDataURL).toHaveBeenCalledTimes(1);

    rerender(<Watermark content='RETRY' className='retry-rerender' />);

    expect(animationFrames.size).toBe(1);
    flushAnimationFrames();
    expect(getOverlay(root)).not.toBeNull();
    expect(toDataURL).toHaveBeenCalledTimes(2);
  });

  test('compares canvas fill objects by identity in the drawing signature', () => {
    const firstColor = {} as CanvasGradient;
    const secondColor = {} as CanvasGradient;
    const { rerender } = render(<Watermark content='IDENTITY' font={{ color: firstColor }} />);
    flushAnimationFrames();

    rerender(<Watermark content='IDENTITY' font={{ color: firstColor }} />);
    flushAnimationFrames();
    expect(toDataURL).toHaveBeenCalledTimes(1);

    rerender(<Watermark content='IDENTITY' font={{ color: secondColor }} />);
    flushAnimationFrames();
    expect(toDataURL).toHaveBeenCalledTimes(2);
  });

  test('coalesces consecutive renders into one frame using the latest content', () => {
    const { rerender } = render(<Watermark content='A' />);
    expect(animationFrames.size).toBe(1);

    rerender(<Watermark content='B' />);

    expect(animationFrames.size).toBe(1);
    flushAnimationFrames();
    expect(toDataURL).toHaveBeenCalledTimes(1);
    expect(context.fillText).toHaveBeenCalledTimes(1);
    expect(context.fillText).toHaveBeenCalledWith('B', expect.any(Number), expect.any(Number));
  });

  test('cancels an unflushed frame and never exports or appends after unmount', () => {
    const view = render(<Watermark content='UNMOUNTED' />);
    const root = view.container.firstElementChild as HTMLElement;
    const delayedFrame = Array.from(animationFrames.values())[0];
    expect(animationFrames.size).toBe(1);

    view.unmount();
    flushAnimationFrames();
    act(() => delayedFrame(1));

    expect(cancelAnimationFrameMock).toHaveBeenCalledTimes(1);
    expect(toDataURL).not.toHaveBeenCalled();
    expect(getOverlay(root)).toBeNull();
  });

  test('uses a cancellable timeout when requestAnimationFrame is unavailable', () => {
    const timeoutCallbacks = new Map<number, TimerHandler>();
    let timeoutId = 0;
    Object.defineProperty(window, 'requestAnimationFrame', {
      configurable: true,
      value: undefined,
    });
    const setTimeoutMock = jest.spyOn(window, 'setTimeout').mockImplementation(((
      handler: TimerHandler,
    ) => {
      const id = ++timeoutId;
      timeoutCallbacks.set(id, handler);
      return id;
    }) as typeof window.setTimeout);
    const clearTimeoutMock = jest.spyOn(window, 'clearTimeout').mockImplementation((id) => {
      timeoutCallbacks.delete(Number(id));
    });

    const view = render(<Watermark content='FALLBACK' />);
    const root = view.container.firstElementChild as HTMLElement;
    const delayedTimeout = Array.from(timeoutCallbacks.values())[0];
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);

    view.unmount();
    if (typeof delayedTimeout === 'function') act(() => delayedTimeout());

    expect(clearTimeoutMock).toHaveBeenCalledTimes(1);
    expect(toDataURL).not.toHaveBeenCalled();
    expect(getOverlay(root)).toBeNull();
  });

  test('does not render empty content and removes an existing overlay when content is cleared', () => {
    const { container, rerender } = render(<Watermark />);
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    expect(getOverlay(root)).toBeNull();

    rerender(<Watermark content='' />);
    flushAnimationFrames();
    expect(getOverlay(root)).toBeNull();
    expect(toDataURL).not.toHaveBeenCalled();

    rerender(<Watermark content='VISIBLE' />);
    flushAnimationFrames();
    const overlay = getOverlay(root);
    expect(overlay).not.toBeNull();

    rerender(<Watermark content='' />);
    flushAnimationFrames();
    expect(getOverlay(root)).toBeNull();
    expect(overlay?.isConnected).toBe(false);
  });

  test('adds inherited targets without redrawing and unregisters them when inheritance is disabled', () => {
    const externalTarget = createExternalTarget();

    const RegisterTarget = ({ target }: { target: HTMLElement }) => {
      const getTarget = React.useCallback(() => target, [target]);
      useWatermarkTarget(getTarget);
      return null;
    };

    const { container, rerender } = render(
      <Watermark content='INHERITED'>
        <RegisterTarget target={externalTarget} />
      </Watermark>,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();

    expect(getOverlay(root)).not.toBeNull();
    expect(getOverlay(externalTarget)).not.toBeNull();
    expect(toDataURL).toHaveBeenCalledTimes(1);

    rerender(
      <Watermark content='INHERITED' inherit={false}>
        <RegisterTarget target={externalTarget} />
      </Watermark>,
    );

    expect(getOverlay(externalTarget)).toBeNull();
    expect(getOverlay(root)).not.toBeNull();
  });

  test('immediately applies an existing tile to a newly registered inherited target', () => {
    const externalTarget = createExternalTarget();

    const RegisterTarget = () => {
      const getTarget = React.useCallback(() => externalTarget, []);
      useWatermarkTarget(getTarget);
      return null;
    };

    try {
      const { rerender } = render(<Watermark content='CACHED' />);
      flushAnimationFrames();
      expect(toDataURL).toHaveBeenCalledTimes(1);

      rerender(
        <Watermark content='CACHED'>
          <RegisterTarget />
        </Watermark>,
      );

      expect(getOverlay(externalTarget)).not.toBeNull();
      expect(animationFrames.size).toBe(0);
      expect(toDataURL).toHaveBeenCalledTimes(1);
    } finally {
      externalTarget.remove();
    }
  });

  test('blocks an outer watermark context when inheritance is disabled', () => {
    const externalTarget = createExternalTarget();
    const outerContext = { add: jest.fn(), remove: jest.fn() };

    const RegisterTarget = () => {
      const getTarget = React.useCallback(() => externalTarget, []);
      useWatermarkTarget(getTarget);
      return null;
    };

    try {
      render(
        <WatermarkContext.Provider value={outerContext}>
          <Watermark content='BLOCKED' inherit={false}>
            <RegisterTarget />
          </Watermark>
        </WatermarkContext.Provider>,
      );
      flushAnimationFrames();

      expect(outerContext.add).not.toHaveBeenCalled();
      expect(getOverlay(externalTarget)).toBeNull();
    } finally {
      externalTarget.remove();
    }
  });

  test('keeps the root registered when an inherited root registration is cleaned up', () => {
    const RegisterRoot = () => {
      const getRoot = React.useCallback(
        () => document.querySelector<HTMLElement>('.registered-root'),
        [],
      );
      useWatermarkTarget(getRoot);
      return null;
    };
    const { container, rerender } = render(
      <Watermark content='ROOT' className='registered-root'>
        <RegisterRoot />
      </Watermark>,
    );
    const root = container.firstElementChild as HTMLElement;
    flushAnimationFrames();
    const overlay = getOverlay(root);

    rerender(
      <Watermark content='ROOT' className='registered-root' inherit={false}>
        <RegisterRoot />
      </Watermark>,
    );

    expect(getOverlay(root)).toBe(overlay);
  });

  test('keeps a shared target until its final inherited registration is removed', () => {
    const externalTarget = createExternalTarget();

    const RegisterTarget = ({ registration }: { registration: string }) => {
      const getTarget = React.useCallback(() => externalTarget, []);
      useWatermarkTarget(getTarget);
      return <span>{registration}</span>;
    };

    const { rerender } = render(
      <Watermark content='SHARED'>
        <RegisterTarget key='first' registration='first' />
        <RegisterTarget key='second' registration='second' />
      </Watermark>,
    );
    flushAnimationFrames();
    const overlay = getOverlay(externalTarget);

    rerender(
      <Watermark content='SHARED'>
        <RegisterTarget key='second' registration='second' />
      </Watermark>,
    );

    expect(getOverlay(externalTarget)).toBe(overlay);

    rerender(<Watermark content='SHARED' />);

    expect(getOverlay(externalTarget)).toBeNull();
  });
});
