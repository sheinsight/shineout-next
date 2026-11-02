import { resolveTokenAlias } from '../token-alias';
import { getConfig, setConfig } from '../../config';

const tokens: { [key: string]: string } = {
  'Neutral-fill-1': '#FFFFFF',
  'Background-popup': 'Neutral-fill-1',
  'Popup-alias': 'Background-popup',
  'Cycle-a': 'Cycle-b',
  'Cycle-b': 'Cycle-a',
  'Self': 'Self',
};
const lookup = (name: string) => tokens[name];

describe('resolveTokenAlias', () => {
  test('literal values are returned as is', () => {
    expect(resolveTokenAlias('#FFFFFF', lookup)).toBe('#FFFFFF');
    expect(resolveTokenAlias('transparent', lookup)).toBe('transparent');
    // 是 token 名称，但自身不是别名
    expect(resolveTokenAlias('Neutral-fill-1', lookup)).toBe('var(--soui-neutral-fill-1,#FFFFFF)');
  });

  test('alias resolves to css var with the real value as fallback', () => {
    expect(resolveTokenAlias('Background-popup', lookup)).toBe(
      'var(--soui-background-popup,var(--soui-neutral-fill-1,#FFFFFF))',
    );
  });

  test('multi-level alias', () => {
    expect(resolveTokenAlias('Popup-alias', lookup)).toBe(
      'var(--soui-popup-alias,var(--soui-background-popup,var(--soui-neutral-fill-1,#FFFFFF)))',
    );
  });

  test('follows the configured prefix', () => {
    const { prefix } = getConfig();
    setConfig({ prefix: 'custom' });
    try {
      expect(resolveTokenAlias('Neutral-fill-1', lookup)).toBe(
        'var(--custom-neutral-fill-1,#FFFFFF)',
      );
    } finally {
      setConfig({ prefix });
    }
  });

  test('names on Object.prototype are not treated as alias', () => {
    const plain: { [key: string]: string } = {};
    ['constructor', 'toString', '__proto__', 'hasOwnProperty'].forEach((name) => {
      expect(resolveTokenAlias(name, (n) => plain[n])).toBe(name);
    });
  });

  test('circular alias is returned as is and warns', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(resolveTokenAlias('Cycle-a', lookup)).toBe('Cycle-a');
    expect(resolveTokenAlias('Self', lookup)).toBe('Self');
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  test('alias chain deeper than the limit is skipped', () => {
    const deep: { [key: string]: string } = {};
    for (let i = 0; i < 8; i++) deep[`T${i}`] = `T${i + 1}`;
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(resolveTokenAlias('T0', (n) => deep[n])).toBe('T0');
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
