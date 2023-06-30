import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from '.';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  function getHook<T>(initialValue?: T) {
    return renderHook(({ val }) => usePrevious<T>(val as T), {
      initialProps: {
        val: initialValue || 0,
      } as { val?: T },
    });
  }

  it('should return undefined on init', () => {
    expect(getHook().result.current).toBeUndefined();
  });

  it('should update previous value only after render with different value', () => {
    const hook = getHook(0);

    expect(hook.result.current).toBeUndefined();
    hook.rerender({ val: 1 });
    expect(hook.result.current).toBe(0);

    hook.rerender({ val: 2 });
    expect(hook.result.current).toBe(1);

    hook.rerender({ val: 3 });
    expect(hook.result.current).toBe(2);

    hook.rerender({ val: 4 });
    expect(hook.result.current).toBe(3);

    hook.rerender({ val: 5 });
    expect(hook.result.current).toBe(4);
  });

  it('should work fine with `undefined` values', () => {
    const hook = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: undefined as undefined | number },
    });

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: 1 });
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: undefined });
    expect(hook.result.current).toBe(1);

    hook.rerender({ value: 2 });
    expect(hook.result.current).toBeUndefined();
  });
});
