import Token from '../token/token';
import { Tokens } from '../token/type';
import { replaceNonAlphanumeric } from '../utils/css-var';
import { getConfig } from '../config';

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
   * @default 'data-token'
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
  token?: Tokens;
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
}

const getExtraToken = (prefix: string) => {
  return [
    `--primary-color: var(--${prefix}-brand-6)`,
    `--gray-500: var(--${prefix}-neutral-6)`,
    `--primary-color-fade-50: rgba(25,122,250,0.5)`,
  ];
};

const setToken = (options?: Options) => {
  const {
    tagName = 'style',
    selector = 'body',
    target,
    tokenName,
    token,
    attributes,
    onlyExtra,
    extraToken: customExtraToken,
  } = options || {};

  const { prefix } = getConfig();

  const tag: HTMLElement = document.createElement(tagName);
  const tokens: string[] = [];
  const defaultToken = token || Token;
  const extraToken = getExtraToken(prefix);

  if (onlyExtra) {
    Object.keys(defaultToken)
      .filter((item) => (customExtraToken || ['Brand-6', 'Neutral-6']).includes(item))
      .forEach((key: string) => {
        const token = `--${prefix}-${replaceNonAlphanumeric(key)}:${defaultToken[key as keyof Tokens]}`;
        tokens.push(token);
      });
  } else {
    Object.keys(defaultToken).forEach((key: string) => {
      const token = `--${prefix}-${replaceNonAlphanumeric(key)}:${defaultToken[key as keyof Tokens]}`;
      tokens.push(token);
    });
  }

  if (attributes) {
    Object.keys(attributes).forEach((key: string) => {
      tag.setAttribute(key, attributes[key]);
    });
  }

  tag.setAttribute('data-token', tokenName || '');
  tag.innerHTML = `${selector} {${tokens.concat(extraToken).join(';')}}`;

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
