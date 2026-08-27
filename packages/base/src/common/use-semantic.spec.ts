import { useSemantic, SemanticClassNames, SemanticStyles, SemanticGlobalConfig } from './use-semantic';

type TestKey = 'root' | 'arrow' | 'content';

describe('useSemantic', () => {
  describe('basic return', () => {
    it('should return [semClass, semStyle] tuple', () => {
      const result = useSemantic<TestKey>();
      expect(result).toHaveLength(2);
      expect(typeof result[0]).toBe('function');
      expect(typeof result[1]).toBe('function');
    });
  });

  describe('semClass', () => {
    it('should return undefined when no classNames provided', () => {
      const [semClass] = useSemantic<TestKey>();
      expect(semClass('root')).toBeUndefined();
    });

    it('should return user className', () => {
      const userClassNames: SemanticClassNames<TestKey> = { root: 'my-root' };
      const [semClass] = useSemantic<TestKey>(userClassNames);
      expect(semClass('root')).toBe('my-root');
    });

    it('should return global className', () => {
      const globalConfig: SemanticGlobalConfig<TestKey> = {
        classNames: { root: 'global-root' },
      };
      const [semClass] = useSemantic<TestKey>(undefined, undefined, globalConfig);
      expect(semClass('root')).toBe('global-root');
    });

    it('should merge global + user classNames (global first, user second)', () => {
      const userClassNames: SemanticClassNames<TestKey> = { root: 'user-root' };
      const globalConfig: SemanticGlobalConfig<TestKey> = {
        classNames: { root: 'global-root' },
      };
      const [semClass] = useSemantic<TestKey>(userClassNames, undefined, globalConfig);
      expect(semClass('root')).toBe('global-root user-root');
    });

    it('should return undefined for keys not provided in classNames', () => {
      const userClassNames: SemanticClassNames<TestKey> = { root: 'my-root' };
      const [semClass] = useSemantic<TestKey>(userClassNames);
      expect(semClass('arrow')).toBeUndefined();
    });
  });

  describe('semClass with function-style classNames (Info)', () => {
    type Info = { open: boolean };

    it('should call function with info and return resolved className', () => {
      const userClassNames: SemanticClassNames<TestKey, Info> = {
        root: ({ open }) => (open ? 'is-open' : 'is-closed'),
      };
      const [semClass] = useSemantic<TestKey, Info>(
        userClassNames,
        undefined,
        undefined,
        { open: true },
      );
      expect(semClass('root')).toBe('is-open');
    });

    it('should reflect info changes', () => {
      const userClassNames: SemanticClassNames<TestKey, Info> = {
        root: ({ open }) => (open ? 'is-open' : 'is-closed'),
      };
      const [semClass] = useSemantic<TestKey, Info>(
        userClassNames,
        undefined,
        undefined,
        { open: false },
      );
      expect(semClass('root')).toBe('is-closed');
    });

    it('should merge global class with function-resolved user class', () => {
      const userClassNames: SemanticClassNames<TestKey, Info> = {
        root: ({ open }) => (open ? 'user-open' : ''),
      };
      const globalConfig: SemanticGlobalConfig<TestKey> = {
        classNames: { root: 'global-root' },
      };
      const [semClass] = useSemantic<TestKey, Info>(
        userClassNames,
        undefined,
        globalConfig,
        { open: true },
      );
      expect(semClass('root')).toBe('global-root user-open');
    });

    it('should handle function returning undefined', () => {
      const userClassNames: SemanticClassNames<TestKey, Info> = {
        root: () => undefined,
      };
      const [semClass] = useSemantic<TestKey, Info>(
        userClassNames,
        undefined,
        undefined,
        { open: true },
      );
      expect(semClass('root')).toBeUndefined();
    });
  });

  describe('semStyle', () => {
    it('should return undefined when no styles provided', () => {
      const [, semStyle] = useSemantic<TestKey>();
      expect(semStyle('root')).toBeUndefined();
    });

    it('should return user style', () => {
      const userStyles: SemanticStyles<TestKey> = { root: { color: 'red' } };
      const [, semStyle] = useSemantic<TestKey>(undefined, userStyles);
      expect(semStyle('root')).toEqual({ color: 'red' });
    });

    it('should return global style', () => {
      const globalConfig: SemanticGlobalConfig<TestKey> = {
        styles: { root: { fontSize: 14 } },
      };
      const [, semStyle] = useSemantic<TestKey>(undefined, undefined, globalConfig);
      expect(semStyle('root')).toEqual({ fontSize: 14 });
    });

    it('should merge global + user styles (user wins on conflict)', () => {
      const userStyles: SemanticStyles<TestKey> = { root: { color: 'blue', margin: 10 } };
      const globalConfig: SemanticGlobalConfig<TestKey> = {
        styles: { root: { color: 'red', padding: 5 } },
      };
      const [, semStyle] = useSemantic<TestKey>(undefined, userStyles, globalConfig);
      expect(semStyle('root')).toEqual({ color: 'blue', padding: 5, margin: 10 });
    });

    it('should return undefined for keys not provided in styles', () => {
      const userStyles: SemanticStyles<TestKey> = { root: { color: 'red' } };
      const [, semStyle] = useSemantic<TestKey>(undefined, userStyles);
      expect(semStyle('arrow')).toBeUndefined();
    });
  });
});
