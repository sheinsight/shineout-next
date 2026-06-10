import type React from 'react';

export interface Local {
  cn: string;
  en: string;
}
export interface Locals {
  cn: string[];
  en: string[];
}

export interface Header {
  title: Local;
  describe: Local;
  guides: Guides;
  /** 透传给子组件 Tabs，用于决定是否显示 Semantic tab */
  hasSemantic?: boolean;
}

export interface Example {
  propName: Local;
  propDescribe: Locals;
  component: React.FC;
  code: string;
  index: number;
  className?: string;
  hash?: string;
}

export interface Images {
  type?: 'success' | 'warning';
  description: string;
  image: string;
}

export interface Guide {
  title: string;
  paragraphs: {
    paragraph: string;
    image: Images[];
  }[];
}

export interface Guides {
  cn: Guide[];
  en: Guide[];
}

export interface Changelog {
  version: string;
  time: string;
  changes: { [key: string]: string }[];
}

// name: property.getName(),
//   tag: {
//   cn: convertQuotes(propertyJsDocTags.cn),
//     en: convertQuotes(propertyJsDocTags.en),
// default: convertQuotes(propertyJsDocTags.default),
//     version: convertQuotes(propertyJsDocTags.version),
// },
// required: !optional,
//   type: convertQuotes(typeText),
export type Api = Array<{
  isLast: boolean;
  title: string;
  cn: string;
  en: string;
  subTitle: string;
  isDetail: boolean;
  properties: Array<{
    name: string;
    type: string;
    required?: boolean;
    tag: {
      cn: string;
      en: string;
      default: string;
      version: string;
    };
  }>;
}>

/**
 * Semantic DOM 一个 key 的元数据
 */
export interface SemanticKeyMeta {
  /** 语义 key 名称，如 'root' / 'arrow' / 'content' */
  key: string;
  /** 中文说明 */
  cn: string;
  /** 英文说明 */
  en: string;
}

/**
 * 组件 Semantic DOM 元数据。
 * 由 `packages/base/src/<comp>/<comp>.semantic.ts` 导出，文档站构建时被 chunk 模板引入。
 */
export interface SemanticSchema {
  /** key 列表（中英说明）*/
  keys: SemanticKeyMeta[];
  /**
   * 渲染该组件并把所有 semantic 节点都激活的演示组件。
   * 文档站 Semantic tab 左侧渲染它，右侧根据 keys 列表对应高亮。
   */
  demo: React.FC;
}

export interface MarkdownProps {
  header: {
    name: string;
    group: string;
  };
  title: Local;
  describe: Local;
  examples: Example[];
  guides: Guides;
  changelog: {
    cn: Changelog[];
    en: Changelog[];
  };
  api: Api;
  playground: {
    api: Api;
    name: string
    examples: Example;
  }
  /** Semantic DOM 元数据；不存在时 Semantic tab 不显示 */
  semantic?: SemanticSchema;
}
