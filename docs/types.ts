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
export interface Guide {
  title: string;
  paragraphs: {
    paragraph: string;
    image: string;
  }[];
}

export interface Guides {
  cn: Guide[];
  en: Guide[];
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
export interface MarkdownProps {
  header: {
    name: string;
    group: string;
  };
  title: Local;
  describe: Local;
  examples: Example[];
  guides: Guides;
  api: Array<{
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
  }>;
}
