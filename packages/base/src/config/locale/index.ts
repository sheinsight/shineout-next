import type { ObjectType } from '@sheinx/hooks';
import { util } from '@sheinx/hooks';
import cn from './zh-CN';
import en from './en_US';
import { config, setConfig } from '../index';
import type { LanType } from './Props';

const { deepGet, deepMerge, isObject } = util;

const getLocaleObj = (locale: LanType) => {
  if (typeof locale === 'string') {
    return locale === 'zh-CN' ? cn : en;
  }
  if (isObject(locale)) {
    return locale;
  }
  return cn;
};

export function setLocale(arg: LanType) {
  let locale: LanType = getLocaleObj(config.locale);
  if (typeof arg === 'string') {
    locale = arg === 'zh-CN' ? cn : en;
  } else if (typeof arg === 'object') {
    locale = deepMerge(cn, arg, { clone: true });
  }
  setConfig({ locale });
}

export function getLocale(lan: any, name?: string, def?: ObjectType) {
  const localeObj = getLocaleObj(lan);
  if (!name) return localeObj;
  if (def && def[name]) return def[name];
  return deepGet(localeObj, name);
}
