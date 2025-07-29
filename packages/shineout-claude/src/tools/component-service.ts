import { ComponentData, ComponentExample, SearchResult } from '../types/index.js';
import { getComponentData, getAllComponents, searchInComponents } from '../data/loader.js';

export class ComponentService {
  async getComponent(name: string) {
    const component = await getComponentData(name);
    
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

    const content = this.formatComponentDoc(component);
    
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
    const results = await searchInComponents(query, category);
    
    if (results.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `没有找到与 "${query}" 相关的组件。`,
          },
        ],
      };
    }

    const content = this.formatSearchResults(results);
    
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
    const components = await getAllComponents(category);
    const content = this.formatComponentList(components);
    
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
    const component = await getComponentData(componentName);
    
    if (!component || !component.examples) {
      return {
        content: [
          {
            type: 'text',
            text: `组件 "${componentName}" 的示例未找到。`,
          },
        ],
      };
    }

    const examples = scenario 
      ? component.examples.filter(ex => ex.scenario === scenario)
      : component.examples;

    const content = this.formatExamples(componentName, examples);
    
    return {
      content: [
        {
          type: 'text',
          text: content,
        },
      ],
    };
  }

  private formatComponentDoc(component: ComponentData): string {
    let doc = `# ${component.name}\n\n`;
    doc += `${component.description}\n\n`;
    
    // 基本信息
    doc += `## 基本信息\n\n`;
    doc += `- **分类**: ${this.getCategoryName(component.category)}\n`;
    doc += `- **版本**: ${component.version || '3.7.7'}\n`;
    if (component.subComponents && component.subComponents.length > 0) {
      doc += `- **子组件**: ${component.subComponents.map(sub => `${component.name}.${sub}`).join(', ')}\n`;
    }
    doc += `\n`;

    doc += `**导入方式**:\n\`\`\`typescript\n${component.importPath}\n\`\`\`\n\n`;

    // Props 信息（当前为空，显示占位符）
    if (component.props && component.props.length > 0) {
      doc += `## Props\n\n`;
      doc += `| 属性名 | 类型 | 默认值 | 必填 | 描述 |\n`;
      doc += `|--------|------|--------|------|------|\n`;
      
      for (const prop of component.props) {
        const required = prop.required ? '✅' : '❌';
        const defaultValue = prop.defaultValue || '-';
        doc += `| ${prop.name} | \`${prop.type}\` | \`${defaultValue}\` | ${required} | ${prop.description} |\n`;
      }
      doc += `\n`;
    } else {
      doc += `## Props\n\n`;
      doc += `> 📝 Props 信息正在完善中，请参考示例代码了解具体用法。\n\n`;
    }

    // 使用示例
    if (component.examples && component.examples.length > 0) {
      doc += `## 使用示例\n\n`;
      
      // 显示第一个示例（通常是基础用法）
      const primaryExample = component.examples[0];
      doc += `### ${primaryExample.title}\n\n`;
      if (primaryExample.description) {
        doc += `${primaryExample.description}\n\n`;
      }
      
      // 提取并清理示例代码
      const cleanCode = this.extractCleanCode(primaryExample.code);
      doc += `\`\`\`tsx\n${cleanCode}\n\`\`\`\n\n`;
      
      // 如果有多个示例，列出其他示例
      if (component.examples.length > 1) {
        doc += `### 其他示例\n\n`;
        for (let i = 1; i < Math.min(component.examples.length, 4); i++) {
          const example = component.examples[i];
          doc += `**${example.title}**: ${example.description || '查看源码了解更多'}\n\n`;
        }
      }
    }

    return doc;
  }

  /**
   * 从示例代码中提取干净的代码（去除多行注释）
   */
  private extractCleanCode(rawCode: string): string {
    // 去除开头的多行注释
    let cleaned = rawCode.replace(/^\/\*\*[\s\S]*?\*\/\s*\n/, '');
    
    // 保持基本的格式
    return cleaned.trim();
  }

  private formatSearchResults(results: SearchResult[]): string {
    let content = `找到 ${results.length} 个相关结果:\n\n`;
    
    for (const result of results) {
      content += `## ${result.name}\n`;
      content += `${result.description}\n`;
      content += `**分类**: ${result.category}\n`;
      content += `**导入**: \`${result.importPath}\`\n\n`;
    }
    
    return content;
  }

  private formatComponentList(components: ComponentData[]): string {
    const grouped = components.reduce((acc, comp) => {
      const category = comp.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(comp);
      return acc;
    }, {} as Record<string, ComponentData[]>);

    let content = `# Shineout 组件列表\n\n`;
    
    for (const [category, comps] of Object.entries(grouped)) {
      content += `## ${this.getCategoryName(category)}\n\n`;
      
      for (const comp of comps) {
        content += `- **${comp.name}**: ${comp.description}\n`;
      }
      content += `\n`;
    }
    
    return content;
  }

  private formatExamples(componentName: string, examples: ComponentExample[]): string {
    let content = `# ${componentName} 使用示例\n\n`;
    
    for (const example of examples) {
      content += `## ${example.title}\n\n`;
      if (example.description) {
        content += `${example.description}\n\n`;
      }
      content += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
    }
    
    return content;
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      form: '表单组件',
      display: '展示组件', 
      layout: '布局组件',
      feedback: '反馈组件',
      navigation: '导航组件',
      other: '其他组件'
    };
    return names[category] || category;
  }
}