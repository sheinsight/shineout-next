import DarkTokens from '../dark';
import setToken from '../../utils/token-setter';
import { getConfig, setConfig } from '../../config';

const getTokenText = (selector: string) =>
  document.querySelector(`[data-token-selector='${selector}']`)?.innerHTML || '';

describe('DarkTokens', () => {
  const { prefix } = getConfig();

  afterEach(() => {
    setConfig({ prefix });
    document.head.innerHTML = '';
  });

  test('component tokens keep the global token name', () => {
    expect(DarkTokens.buttonPrimaryDisabledFontColor).toBe('Neutral-text-2');
  });

  test('component tokens follow the prefix configured after import', () => {
    setConfig({ prefix: 'custom' });
    setToken({ selector: 'html[data-theme="dark"]', token: DarkTokens });

    const text = getTokenText('html[data-theme="dark"]');
    expect(text).toContain('--custom-button-primary-disabled-font-color:var(--custom-neutral-text-2,');
    expect(text).toContain('--custom-neutral-text-2:#FFFFFF4D');
    expect(text).not.toContain('--soui-');
  });

  test('dark tokens on another selector do not replace the default tokens on html', () => {
    setToken({ selector: 'html' });
    setToken({ selector: 'html[data-theme="dark"]', token: DarkTokens });

    expect(getTokenText('html')).toContain('--soui-neutral-fill-1:');
    expect(getTokenText('html[data-theme="dark"]')).toContain('--soui-neutral-fill-1:#262626');
  });
});
