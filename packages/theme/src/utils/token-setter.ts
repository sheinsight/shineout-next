import Token from '../token/token';
import { Tokens as BaseToken } from '../token/type';
import { ThemeTokens } from '../index';
import { camelCaseToDash } from '../utils/css-var';
import { getConfig } from '../config';
import hash from './hash';

export type Tokens = BaseToken & ThemeTokens;
export interface Attributes {
  [key: string]: any;
}

export interface Options {
  /**
   * @cn 承载 token 标签的文档挂载点，默认为 document.head
   * @en The document mount point that carries the token tag, default is document.head
   * @default document.head
   */
  target?: string | HTMLElement | null | undefined;
  /**
   * @cn 承载 token 的标签，默认为 style 标签
   * @en The tag that carries the token, default is the style tag
   * @default 'style'
   */
  tagName?: string;
  /**
   * @cn 生效 token 的选择器，默认为 body，语法为 css 选择器
   * @en The selector of the effective token, default is body, the syntax is css selector
   * @default 'body'
   */
  selector?: string;
  /**
   * @cn token 的名称，将作为自定义属性插入标签，默认为 data-token
   * @en The name of the token, which will be inserted as a custom attribute into the tag, default is data-token
   * @default 'shineout-token'
   */
  tokenName?: string;
  /**
   * @cn 标签的自定义属性
   * @en Custom attributes of the tag
   * @default undefined
   */
  attributes?: Attributes;
  /**
   * @cn 自定义 token 参数
   * @en Custom token parameters
   * @default undefined
   */
  token?: Partial<Tokens> & { [customTokenKey: string]: string };
  /**
   * @cn 是否只生效关键 token，默认为 false
   * @en Whether only the key token is effective, default is false
   * @default false
   */
  onlyExtra?: boolean;
  /**
   * @cn 关键 token 列表
   * @en Key token list
   * @default undefined
   */
  extraToken?: string[];
  /**
   * @cn 是否仅更新 token。默认为 false 直接全部覆盖当前 token，true 时只更新 token
   * @en Whether to update the token only, default is false
   */
  update?: boolean;
  /**
   * @cn 是否忽略额外的 token，默认为 false，即默认加载额外的 token，额外的 token 包括 primary-color、gray-500、primary-color-fade-50
   * @en Whether to ignore extra tokens, default is false
   * @default false
   */
  ignoreExtra?: boolean;
}

const getExtraToken = (prefix: string) => {
  return [
    `--primary-color: var(--${prefix}-brand-6)`,
    `--gray-500: var(--${prefix}-neutral-6)`,
    `--primary-color-fade-50: rgba(25,122,250,0.5)`,
  ];
};

const replaceCssVarValue = (innerHTML: string, cssvar: string, targetValue?: string) => {
  const regex = new RegExp(`(${cssvar}:.*?;)`);
  // 如果没有 token ，则向后插入新的 token
  if (innerHTML.indexOf(cssvar) === -1) {
    return innerHTML.slice(0, -1) + `;${cssvar}: ${targetValue};` + innerHTML.slice(-1);
  }
  return innerHTML.replace(regex, `${cssvar}: ${targetValue};`);
};

const isCustomToken = (key: string) => {
  if (key.startsWith('--')) return true;
  return false;
};

const setToken = (options?: Options) => {
  const {
    tagName = 'style',
    selector = 'body',
    target,
    tokenName = 'shineout-token',
    token,
    attributes,
    onlyExtra,
    update,
    extraToken: customExtraToken,
    ignoreExtra = false,
  } = options || {};

  const { prefix } = getConfig();
  if (typeof window === 'undefined') return;

  const id = `shineout-next-token-${hash(selector)}`;
  const cacheTag = document.querySelector(`[data-token-id="${id}"]`) as HTMLElement;

  const tag: HTMLElement = cacheTag || document.createElement(tagName);
  const tokens: string[] = [];
  const defaultToken = (token || Token) as Tokens;
  const extraToken = getExtraToken(prefix);

  if (update && token) {
    Object.keys(token).forEach((key: string) => {
      const cssvar = isCustomToken(key) ? key : `--${prefix}-${camelCaseToDash(key)}`;
      const targetValue = token[key as keyof Tokens];
      tag.innerHTML = replaceCssVarValue(tag.innerHTML, cssvar, targetValue);
    });

    return;
  }

  if (onlyExtra) {
    Object.keys(defaultToken)
      .filter((item) => (customExtraToken || ['Brand-6', 'Neutral-6']).includes(item))
      .forEach((key: string) => {
        const cssvar = isCustomToken(key) ? key : `--${prefix}-${camelCaseToDash(key)}`;
        const token = `${cssvar}:${defaultToken[key as keyof Tokens]}`;
        tokens.push(token);
      });
  } else {
    Object.keys(defaultToken).forEach((key: string) => {
      const cssvar = isCustomToken(key) ? key : `--${prefix}-${camelCaseToDash(key)}`;
      const token = `${cssvar}:${defaultToken[key as keyof Tokens]}`;
      tokens.push(token);
    });
  }

  if (attributes) {
    Object.keys(attributes).forEach((key: string) => {
      tag.setAttribute(key, attributes[key]);
    });
  }

  tag.setAttribute('data-token', tokenName || '');
  tag.setAttribute('data-token-id', id);
  tag.setAttribute('data-token-selector', selector);

  tag.innerHTML = ignoreExtra
    ? `${selector} {${tokens.join(';')}}`
    : `${selector} {${tokens.concat(extraToken).join(';')}}`;

  if (!target) {
    document.head.appendChild(tag);
    return;
  }

  if (target && target instanceof HTMLElement) {
    target.appendChild(tag);
    return;
  }

  if (typeof target === 'string') {
    const el = document.getElementById(target);
    if (el instanceof HTMLElement) {
      el.appendChild(tag);
      return;
    }
  }
};

export default setToken;
