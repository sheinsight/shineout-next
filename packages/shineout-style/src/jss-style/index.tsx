import { createUseStyles, JssProvider, SheetsRegistry, jss } from 'react-jss';
import { JssStyle, GenerateId, Classes, Plugin } from 'jss';
import handleStyle from './handleStyle';
import version from '../version';

export { JssProvider, SheetsRegistry, jss };
export const prefix = 'soui';

interface JssConfig {
  generateId?: GenerateId;
  styleAttributes?: Record<string, string>;
  // 组件样式表挂载后常驻，不随最后一个使用者卸载而移除
  keepStyleSheet?: boolean;
}

const config: JssConfig = {};

export const setJssConfig = (newConfig: JssConfig) => {
  Object.assign(config, newConfig);
};

export const getJssConfig = () => config;

// react-jss 在样式表引用计数归零时会 detach，把 style 标签移出文档，下次挂载再插回
// 每次插入/移除样式表都会让浏览器重新处理整套样式（Message、Modal.confirm 这类每次打开都新建 root 的组件尤其明显，拖慢 INP）
// 开启 keepStyleSheet 后跳过 detach，类名带版本哈希，常驻不会影响其它元素
const shineoutElements = new WeakSet<HTMLStyleElement>();
const keepStyleSheetPlugin: Plugin = {
  onProcessSheet: (sheet) => {
    if (!sheet) return;
    const element = (sheet.options as { element?: HTMLStyleElement }).element;
    if (!element || !shineoutElements.has(element)) return;
    const detach = sheet.detach.bind(sheet);
    sheet.detach = () => (config.keepStyleSheet ? sheet : detach());
  },
};
jss.use(keepStyleSheetPlugin);

const stringToHash = (str: string) => {
  let hash = 0;
  if (str.length === 0) return '';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'c' + hash.toString(36);
};

const camelToDash = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export function generateClassName(version: string, prefix: string, ns: string, key: string) {
  const name = `${version}-${prefix}-${ns}-${key}`;
  return stringToHash(name);
  // return `${prefix}-${ns}${key}`;
}

const createClassname = (rule: any, sheet: any) => {
  const options = sheet.options;
  const ns = options.classNamePrefix;
  if (!ns) {
    console.warn('[sheinx/base]: styled should give namespace');
  }

  if (config.generateId) return config.generateId(rule, sheet);
  return generateClassName(version, prefix, ns, rule.key);
  // return `${prefix}${ns}${camelToDash(rule.key)}`;
};
// export const StyleProvider: FC<{ children?: any; prefix?: string }> = function ({ children }) {
//   return <JssProvider generateId={createClassname}>{children}</JssProvider>;
// };

export type JsStyles<Name extends string = string> = Record<Name, JssStyle<undefined> | string>;

export type ClassStyle<K extends Record<string, any>> = {
  [P in keyof K]: Record<string, any>;
};

export const styled = <C extends string>(style: JsStyles<C>, ns: string) => {
  const styleElement = typeof window !== 'undefined' ? document.createElement('style') : undefined;
  if (styleElement) shineoutElements.add(styleElement);
  const hoc = createUseStyles(handleStyle(style), { name: ns, generateId: createClassname, element: styleElement });
  const styledCacheMap: Record<string, any> = {};

  let attributesApplied = false;
  const getClassName = () => {
    if (!attributesApplied && styleElement) {
      const jssConfig = getJssConfig();
      if (jssConfig.styleAttributes) {
        Object.entries(jssConfig.styleAttributes).forEach(([key, value]) => {
          styleElement.setAttribute(key, value);
        });
      }
      attributesApplied = true;
    }

    const classes = hoc();
    if (styledCacheMap[ns]) {
      return styledCacheMap[ns] as Classes<C>;
    }
    return styledCacheMap[ns] = Object.keys(classes).reduce((acc, key) => {
      const k = key as keyof typeof classes;

      let value = ''
      // 给每个组件的root类名添加命名空间
      if(k === 'rootClass') {
        value = `${prefix}-${camelToDash(ns)}${value}`
      }else{
        const oldClass = classes[k];
        const constClass = `${prefix}-${ns}-${camelToDash(k)}`;
        value = constClass === oldClass ? oldClass : `${oldClass} ${constClass}`;
      }
      acc[k] = value;
      return acc;
    }, {} as Classes<C>);
  };
  return getClassName;
};
