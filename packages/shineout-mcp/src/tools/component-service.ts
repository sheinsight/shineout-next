import { ComponentFormatter } from './formatters/index.js';
import { ComponentQuery } from './queries/index.js';
import { APIQueryService, APIFormatter } from './api/index.js';
import { SearchHelper } from './helpers/index.js';
import { TipsService, TipsFormatter } from './tips/index.js';

export class ComponentService {
  private formatter: ComponentFormatter;
  private query: ComponentQuery;
  private apiQuery: APIQueryService;
  private apiFormatter: APIFormatter;
  private tipsService: TipsService;
  private tipsFormatter: TipsFormatter;

  constructor() {
    this.formatter = new ComponentFormatter();
    this.query = new ComponentQuery();
    this.apiQuery = new APIQueryService();
    this.apiFormatter = new APIFormatter();
    this.tipsService = new TipsService();
    this.tipsFormatter = new TipsFormatter();
  }

  async getComponent(name: string) {
    const component = await this.query.getComponent(name);
    
    if (!component) {
      return {
        content: [
          {
            type: 'text',
            text: `组件 "${name}" 未找到。请检查组件名称是否正确。`,
          },
        ],
      };
    }

    const content = this.formatter.formatComponentDoc(component);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async searchComponents(query: string, category?: string) {
    const validComponents = await this.query.searchComponents(query, category);
    
    if (validComponents.length === 0) {
      // 获取所有组件名称用于提供建议
      const allComponents = await this.query.listComponents();
      const componentNames = allComponents.map(c => c.name);
      const suggestions = SearchHelper.generateSearchSuggestions(query, componentNames);
      const suggestionText = SearchHelper.formatSuggestions(suggestions);
      
      return {
        content: [
          {
            type: 'text',
            text: `没有找到与 "${query}" 相关的组件。${suggestionText}`,
          },
        ],
      };
    }

    const content = this.formatter.formatSearchResultsWithAPI(validComponents);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async listComponents(category: string = 'all') {
    const components = await this.query.listComponents(category);
    const content = this.formatter.formatComponentList(components);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async getExamples(componentName: string, scenario?: string) {
    const result = await this.query.getComponentExamples(componentName, scenario);
    
    if (!result) {
      return {
        content: [
          {
            type: 'text',
            text: `组件 "${componentName}" 的示例未找到。`,
          },
        ],
      };
    }

    const content = this.formatter.formatExamples(result.componentName, result.examples);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async getComponentAPI(componentName: string, category?: string) {
    if (category) {
      const categoryData = await this.apiQuery.getComponentAPIByCategory(
        componentName, 
        category as 'props' | 'methods' | 'events' | 'subComponents'
      );
      
      if (!categoryData || (Array.isArray(categoryData) && categoryData.length === 0)) {
        return {
          content: [
            {
              type: 'text',
              text: `组件 "${componentName}" 的 ${category} 未找到。`,
            },
          ],
        };
      }

      // 获取完整 API 信息以便查找相关示例
      const fullAPIWithExamples = await this.apiQuery.getComponentAPIWithExamples(componentName);
      
      // 根据类别格式化输出
      let content = `# ${componentName} - ${category}\n\n`;
      if (category === 'props') {
        content += this.apiFormatter.formatProps(categoryData);
      } else if (category === 'methods') {
        content += this.apiFormatter.formatMethods(categoryData);
      } else if (category === 'subComponents') {
        content += this.apiFormatter.formatSubComponents(categoryData);
      } else if (category === 'events') {
        content += this.apiFormatter.formatEvents(categoryData);
      }

      // 添加相关示例
      if (fullAPIWithExamples?.examples && fullAPIWithExamples.examples.length > 0) {
        content += `\n## 相关使用示例\n\n`;
        const relevantExamples = fullAPIWithExamples.examples.slice(0, 2);
        for (const example of relevantExamples) {
          content += `### ${example.title}\n`;
          if (example.description) {
            content += `${example.description}\n\n`;
          }
          const cleanCode = example.code.replace(/^\/\*\*[\s\S]*?\*\/\s*\n/, '').trim();
          const truncatedCode = cleanCode.length > 400 ? cleanCode.substring(0, 400) + '\n// ...' : cleanCode;
          content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    }

    // 获取带示例的完整 API
    const apiWithExamples = await this.apiQuery.getComponentAPIWithExamples(componentName);
    
    if (!apiWithExamples) {
      return {
        content: [
          {
            type: 'text',
            text: `组件 "${componentName}" 的 API 未找到。`,
          },
        ],
      };
    }

    const content = this.apiFormatter.formatComponentAPIWithExamples(componentName, apiWithExamples);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async searchAPI(keyword: string, searchIn: 'props' | 'methods' | 'all' = 'all') {
    const results = await this.apiQuery.searchAPI(keyword, searchIn);
    
    if (results.length === 0) {
      // 提供搜索建议
      const allComponents = await this.query.listComponents();
      const componentNames = allComponents.map(c => c.name);
      const suggestions = SearchHelper.generateSearchSuggestions(keyword, componentNames);
      const suggestionText = SearchHelper.formatSuggestions(suggestions);
      
      return {
        content: [
          {
            type: 'text',
            text: `没有找到与 "${keyword}" 匹配的 API。${suggestionText}`,
          },
        ],
      };
    }
    
    let content = this.apiFormatter.formatAPISearchResults(results);
    
    // 为每个找到的组件添加相关示例
    if (results.length > 0) {
      content += `\n## 相关示例代码\n\n`;
      
      const processedComponents = new Set<string>();
      for (const result of results.slice(0, 3)) { // 只显示前3个组件的示例
        if (!processedComponents.has(result.component)) {
          processedComponents.add(result.component);
          
          const apiWithExamples = await this.apiQuery.getComponentAPIWithExamples(result.component);
          if (apiWithExamples?.examples && apiWithExamples.examples.length > 0) {
            content += `### ${result.component} 组件示例\n\n`;
            
            // 查找包含关键词的示例
            const relevantExample = apiWithExamples.examples.find(ex => 
              ex.code.toLowerCase().includes(keyword.toLowerCase())
            ) || apiWithExamples.examples[0];
            
            content += `#### ${relevantExample.title}\n`;
            if (relevantExample.description) {
              content += `${relevantExample.description}\n\n`;
            }
            
            const cleanCode = relevantExample.code.replace(/^\/\*\*[\s\S]*?\*\/\s*\n/, '').trim();
            const truncatedCode = cleanCode.length > 500 ? cleanCode.substring(0, 500) + '\n// ...' : cleanCode;
            content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
          }
        }
      }
    }
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async compareComponentsAPI(componentNames: string[]) {
    const comparison = await this.apiQuery.compareComponentsAPI(componentNames);
    const content = this.apiFormatter.formatAPIComparison(comparison);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  async getTips(componentName?: string) {
    // 如果没有指定组件名或者是 'all'，返回所有组件的摘要
    if (!componentName || componentName.toLowerCase() === 'all') {
      const summary = await this.tipsService.getAllTipsSummary();
      const content = this.tipsFormatter.formatTipsSummary(summary);
      
      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    }
    
    // 获取指定组件的 tips
    const tips = await this.tipsService.getComponentTips(componentName);
    
    if (!tips) {
      // 获取可用的组件列表
      const availableComponents = await this.tipsService.listComponentsWithTips();
      
      let message = `组件 "${componentName}" 的使用提示未找到。\n\n`;
      if (availableComponents.length > 0) {
        message += `目前有以下组件包含使用提示：\n`;
        message += availableComponents.map(c => `- ${c}`).join('\n');
      }
      
      return {
        content: [
          {
            type: 'text',
            text: message,
          },
        ],
      };
    }
    
    const content = this.tipsFormatter.formatComponentTips(tips);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }
}