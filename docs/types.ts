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
}
