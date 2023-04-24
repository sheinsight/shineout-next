import type { DefTheme } from './default';
export type Theme = DefTheme;

type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

export type OptTheme = DeepPartial<Theme>;
