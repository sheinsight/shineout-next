import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BorderBeam from '../../../../base/src/border-beam';
import {
  canElementAcceptRef,
  mergeRefs,
} from '../../../../base/src/border-beam/use-child-dom';
import { BORDER_BEAM_CSS_VARIABLES } from '../../../../base/src/border-beam/util';

const classes = {
  rootClass: 'soui-border-beam',
  beam: 'soui-border-beam-beam',
  '@keyframes borderBeamMove': 'borderBeamMove',
};
const jssStyle = { borderBeam: () => classes };

const getEffect = (container: HTMLElement) =>
  container.querySelector<HTMLElement>('.soui-border-beam');

afterEach(cleanup);

describe('BorderBeam unstyled component', () => {
  test('portals an aria-hidden decoration into the child host', async () => {
    const childRef = React.createRef<HTMLDivElement>();
    const { container } = render(
      <BorderBeam jssStyle={jssStyle} className='custom-beam' style={{ opacity: 0.8 }}>
        <div ref={childRef} className='beam-host'>
          content
        </div>
      </BorderBeam>,
    );

    await waitFor(() => expect(getEffect(container)).toBeTruthy());
    const effect = getEffect(container)!;
    expect(effect.parentElement).toBe(childRef.current);
    expect(effect).toHaveClass('soui-border-beam-beam', 'custom-beam');
    expect(effect).toHaveAttribute('aria-hidden', 'true');
    expect(effect).toHaveStyle({ opacity: '0.8' });
    expect(childRef.current).toHaveTextContent('content');
  });

  test('derives host border geometry and applies all custom properties', async () => {
    const { container, rerender } = render(
      <BorderBeam
        jssStyle={jssStyle}
        color={[
          { color: '#1677ff', percent: 0 },
          { color: '#36cfc9', percent: 55 },
          { color: '#95de64', percent: 100 },
        ]}
        duration={12}
        lineWidth='0.25rem'
        size={160}
        style={
          {
            [BORDER_BEAM_CSS_VARIABLES.duration]: '99s',
          } as React.CSSProperties
        }
      >
        <div
          className='beam-host'
          style={{
            borderTop: '1px solid red',
            borderRight: '2px solid red',
            borderBottom: '3px solid red',
            borderLeft: '4px solid red',
            borderRadius: 12,
          }}
        >
          content
        </div>
      </BorderBeam>,
    );

    await waitFor(() => {
      const effect = getEffect(container)!;
      expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.insetOffset)).toBe(
        '-1px -2px -3px -4px',
      );
      expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.borderRadius)).toBe('12px');
    });

    const effect = getEffect(container)!;
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.gradient)).toBe(
      'linear-gradient(to left, #1677ff 0%, #36cfc9 38.5%, #95de64 70%, transparent)',
    );
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.duration)).toBe('12s');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.lineWidth)).toBe('0.25rem');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.size)).toBe('160px');

    rerender(
      <BorderBeam jssStyle={jssStyle} duration={0} outset='2em'>
        <div
          className='beam-host'
          style={{
            border: '1px solid red',
            borderRadius: 12,
          }}
        >
          content
        </div>
      </BorderBeam>,
    );

    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.gradient)).toBe('');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.duration)).toBe('');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.lineWidth)).toBe('');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.size)).toBe('');
    expect(effect.style.getPropertyValue(BORDER_BEAM_CSS_VARIABLES.insetOffset)).toBe(
      'calc(-1 * 2em)',
    );
  });

  test('preserves callback refs on memoized forwardRef children', async () => {
    let resolvedHost: HTMLDivElement | null = null;
    const Forwarded = React.forwardRef<HTMLDivElement>((_, ref) => (
      <div ref={ref} className='beam-host'>
        forwarded
      </div>
    ));
    const MemoForwarded = React.memo(Forwarded);
    const { container } = render(
      <BorderBeam jssStyle={jssStyle}>
        <MemoForwarded
          ref={(node) => {
            resolvedHost = node;
          }}
        />
      </BorderBeam>,
    );

    await waitFor(() => expect(getEffect(container)).toBeTruthy());
    expect(resolvedHost).toBe(container.querySelector('.beam-host'));
    expect(getEffect(container)!.parentElement).toBe(resolvedHost);
  });

  test('matches React 18 and React 19 ref eligibility', () => {
    const FunctionChild = () => <div />;
    const functionElement = <FunctionChild />;
    const fragmentElement = <></>;

    expect(canElementAcceptRef(functionElement, 18)).toBe(false);
    expect(canElementAcceptRef(functionElement, 19)).toBe(true);
    expect(canElementAcceptRef(fragmentElement, 18)).toBe(false);
    expect(canElementAcceptRef(fragmentElement, 19)).toBe(false);
    expect(canElementAcceptRef(<div />, 18)).toBe(true);
  });

  test('resolves an imperative handle that exposes nativeElement', async () => {
    type NativeElementHandle = { nativeElement: HTMLDivElement };
    const HandleChild = React.forwardRef<NativeElementHandle>((_, ref) => {
      const nativeRef = React.useRef<HTMLDivElement>(null);
      React.useImperativeHandle(ref, () => ({ nativeElement: nativeRef.current! }), []);
      return (
        <div ref={nativeRef} className='native-element-host'>
          handled
        </div>
      );
    });

    const { container } = render(
      <BorderBeam jssStyle={jssStyle}>
        <HandleChild />
      </BorderBeam>,
    );

    await waitFor(() => expect(getEffect(container)).toBeTruthy());
    expect(getEffect(container)!.parentElement).toBe(
      container.querySelector('.native-element-host'),
    );
  });

  test('cleans up callback refs when React replaces or unmounts the host', () => {
    const disposedHosts: HTMLElement[] = [];
    const childRef = (node: HTMLElement | null) => {
      if (!node) return undefined;
      return () => {
        disposedHosts.push(node);
      };
    };
    const internalRef = { current: null as HTMLElement | null };
    const mergedRef = mergeRefs(childRef, internalRef);
    const firstHost = document.createElement('div');
    const secondHost = document.createElement('section');

    // React 18 ignores callback-ref cleanup returns. Invoke the returned functions
    // directly to simulate React 19 replacing a host and then unmounting it.
    const firstCleanup = mergedRef(firstHost);
    expect(internalRef.current).toBe(firstHost);
    firstCleanup?.();

    const secondCleanup = mergedRef(secondHost);
    expect(internalRef.current).toBe(secondHost);
    secondCleanup?.();

    expect(disposedHosts).toEqual([firstHost, secondHost]);
    expect(internalRef.current).toBeNull();
  });

  test('silently skips children that cannot provide an HTMLElement host', async () => {
    const FunctionChild = () => <div className='function-child'>function</div>;
    class ClassChild extends React.Component {
      render() {
        return <div className='class-child'>class</div>;
      }
    }
    const { container, rerender } = render(<BorderBeam jssStyle={jssStyle}>plain text</BorderBeam>);
    expect(getEffect(container)).toBeNull();

    rerender(
      <BorderBeam jssStyle={jssStyle}>
        <>
          <span>fragment</span>
        </>
      </BorderBeam>,
    );
    expect(getEffect(container)).toBeNull();

    rerender(
      <BorderBeam jssStyle={jssStyle}>
        <FunctionChild />
      </BorderBeam>,
    );
    expect(container.querySelector('.function-child')).toBeTruthy();
    expect(getEffect(container)).toBeNull();

    rerender(
      <BorderBeam jssStyle={jssStyle}>
        <ClassChild />
      </BorderBeam>,
    );
    expect(container.querySelector('.class-child')).toBeTruthy();
    expect(getEffect(container)).toBeNull();

    rerender(
      <BorderBeam jssStyle={jssStyle}>
        <svg data-testid='svg-host' />
      </BorderBeam>,
    );
    await waitFor(() => expect(container.querySelector('[data-testid="svg-host"]')).toBeTruthy());
    expect(getEffect(container)).toBeNull();
  });

  test('moves and removes the Portal when the host changes or unmounts', async () => {
    const { container, rerender, unmount } = render(
      <BorderBeam jssStyle={jssStyle}>
        <div key='first' className='first-host'>
          first
        </div>
      </BorderBeam>,
    );
    await waitFor(() => expect(getEffect(container)).toBeTruthy());
    const firstHost = container.querySelector<HTMLElement>('.first-host')!;

    rerender(
      <BorderBeam jssStyle={jssStyle}>
        <section key='second' className='second-host'>
          second
        </section>
      </BorderBeam>,
    );

    await waitFor(() => {
      const secondHost = container.querySelector<HTMLElement>('.second-host')!;
      expect(getEffect(secondHost)?.parentElement).toBe(secondHost);
    });
    expect(getEffect(firstHost)).toBeNull();

    const secondHost = container.querySelector<HTMLElement>('.second-host')!;
    unmount();
    expect(getEffect(secondHost)).toBeNull();
  });
});
