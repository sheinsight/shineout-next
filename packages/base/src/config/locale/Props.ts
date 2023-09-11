import zh from './zh-CN';

type localeType = typeof zh;

export type LocaleObj = localeType;
export type LanType = 'en-US' | 'zh-CN' | Partial<localeType>;
export type Direction = 'ltr' | 'rtl';
