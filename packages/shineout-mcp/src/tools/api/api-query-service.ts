import { ComponentData, ComponentExample } from '../../types/index.js';
import { ComponentQuery } from '../queries/index.js';

export interface ComponentAPI {
  props?: Array<{
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
    description: string;
  }>;
  methods?: Array<{
    name: string;
    signature?: string;
    description: string;
    parameters?: Array<{
      name: string;
      type: string;
      description: string;
    }>;
    returns?: string;
  }>;
  events?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  subComponents?: Array<{
    name: string;
    description?: string;
  }>;
}

export interface ComponentAPIWithExamples extends ComponentAPI {
  examples?: ComponentExample[];
  relatedExamples?: {
    prop?: string;
    method?: string;
    example: ComponentExample;
  }[];
}

export class APIQueryService {
  private query: ComponentQuery;

  constructor() {
    this.query = new ComponentQuery();
  }

  /**
   * 获取组件的完整 API 信息
   */
  async getComponentAPI(componentName: string): Promise<ComponentAPI | null> {
    const component = await this.query.getComponent(componentName);
    
    if (!component) {
      return null;
    }

    return this.extractAPIInfo(component);
  }

  /**
   * 获取组件的 API 信息并包含相关示例
   */
  async getComponentAPIWithExamples(componentName: string): Promise<ComponentAPIWithExamples | null> {
    const component = await this.query.getComponent(componentName);
    
    if (!component) {
      return null;
    }

    const api = this.extractAPIInfo(component);
    const apiWithExamples: ComponentAPIWithExamples = {
      ...api,
      examples: component.examples,
      relatedExamples: this.findRelatedExamples(api, component.examples || [])
    };

    return apiWithExamples;
  }

  /**
   * 获取组件的特定 API 类别（如只获取 props 或 methods）
   */
  async getComponentAPIByCategory(componentName: string, category: 'props' | 'methods' | 'events' | 'subComponents'): Promise<any> {
    const api = await this.getComponentAPI(componentName);
    
    if (!api) {
      return null;
    }

    return api[category] || [];
  }

  /**
   * 搜索特定的 API 属性或方法
   */
  async searchAPI(keyword: string, searchIn: 'props' | 'methods' | 'all' = 'all'): Promise<Array<{
    component: string;
    type: 'prop' | 'method' | 'event';
    item: any;
  }>> {
    const components = await this.query.listComponents('all');
    const results: Array<{
      component: string;
      type: 'prop' | 'method' | 'event';
      item: any;
    }> = [];

    // 将查询字符串拆分为多个关键词
    const keywords = keyword.toLowerCase().split(/\s+/).filter(k => k.length > 0);
    console.error(`[MCP API] Searching APIs with keywords: ${keywords.join(', ')}`);

    for (const component of components) {
      // 搜索 props
      if (searchIn === 'all' || searchIn === 'props') {
        if (component.props) {
          for (const prop of component.props) {
            let matches = false;
            
            // 检查是否匹配任何关键词
            for (const kw of keywords) {
              if (
                prop.name.toLowerCase().includes(kw) ||
                prop.description.toLowerCase().includes(kw) ||
                prop.type?.toLowerCase().includes(kw)
              ) {
                matches = true;
                break;
              }
            }
            
            if (matches) {
              results.push({
                component: component.name,
                type: 'prop',
                item: prop
              });
            }
          }
        }
      }

      // 搜索 methods
      if (searchIn === 'all' || searchIn === 'methods') {
        // FormRef methods
        if ((component as any).formRefMethods) {
          for (const method of (component as any).formRefMethods) {
            let matches = false;
            
            for (const kw of keywords) {
              if (
                method.name.toLowerCase().includes(kw) ||
                method.description.toLowerCase().includes(kw) ||
                method.signature?.toLowerCase().includes(kw)
              ) {
                matches = true;
                break;
              }
            }
            
            if (matches) {
              results.push({
                component: component.name,
                type: 'method',
                item: { ...method, category: 'FormRef' }
              });
            }
          }
        }

        // FormDatum methods
        if ((component as any).formDatumMethods) {
          for (const method of (component as any).formDatumMethods) {
            let matches = false;
            
            for (const kw of keywords) {
              if (
                method.name.toLowerCase().includes(kw) ||
                method.description.toLowerCase().includes(kw) ||
                method.signature?.toLowerCase().includes(kw)
              ) {
                matches = true;
                break;
              }
            }
            
            if (matches) {
              results.push({
                component: component.name,
                type: 'method',
                item: { ...method, category: 'FormDatum' }
              });
            }
          }
        }
      }
    }

    console.error(`[MCP API] Found ${results.length} APIs matching "${keyword}"`);
    return results;
  }

  /**
   * 获取多个组件的 API 对比
   */
  async compareComponentsAPI(componentNames: string[]): Promise<Record<string, ComponentAPI | null>> {
    const result: Record<string, ComponentAPI | null> = {};

    for (const name of componentNames) {
      result[name] = await this.getComponentAPI(name);
    }

    return result;
  }

  /**
   * 从组件数据中提取 API 信息
   */
  private extractAPIInfo(component: ComponentData): ComponentAPI {
    const api: ComponentAPI = {};

    // Props
    if (component.props && component.props.length > 0) {
      api.props = component.props;
    }

    // Methods
    const methods: any[] = [];
    
    // FormRef methods
    if ((component as any).formRefMethods) {
      methods.push(...(component as any).formRefMethods.map((m: any) => ({
        ...m,
        category: 'FormRef'
      })));
    }

    // FormDatum methods
    if ((component as any).formDatumMethods) {
      methods.push(...(component as any).formDatumMethods.map((m: any) => ({
        ...m,
        category: 'FormDatum'
      })));
    }

    if (methods.length > 0) {
      api.methods = methods;
    }

    // Sub Components
    if (component.subComponents && component.subComponents.length > 0) {
      api.subComponents = component.subComponents.map(sub => {
        if (typeof sub === 'string') {
          return { name: sub };
        }
        return sub as { name: string; description?: string };
      });
    }

    // Events (如果有的话)
    if ((component as any).events) {
      api.events = (component as any).events;
    }

    return api;
  }

  /**
   * 查找与 API 相关的示例
   */
  private findRelatedExamples(api: ComponentAPI, examples: ComponentExample[]): ComponentAPIWithExamples['relatedExamples'] {
    const relatedExamples: ComponentAPIWithExamples['relatedExamples'] = [];

    // 遍历所有示例，查找与 API 相关的代码
    for (const example of examples) {
      // 检查示例中是否使用了特定的 props
      if (api.props) {
        for (const prop of api.props) {
          if (example.code.includes(prop.name)) {
            relatedExamples.push({
              prop: prop.name,
              example
            });
            break; // 每个示例只添加一次
          }
        }
      }

      // 检查示例中是否使用了特定的 methods
      if (api.methods) {
        for (const method of api.methods) {
          if (example.code.includes(method.name)) {
            relatedExamples.push({
              method: method.name,
              example
            });
            break;
          }
        }
      }
    }

    // 去重
    const uniqueExamples = new Map<string, typeof relatedExamples[0]>();
    for (const item of relatedExamples) {
      const key = `${item.example.title}-${item.prop || item.method}`;
      if (!uniqueExamples.has(key)) {
        uniqueExamples.set(key, item);
      }
    }

    return Array.from(uniqueExamples.values());
  }
}