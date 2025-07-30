import { ComponentData, ComponentExample } from '../types/index.js';
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

    // 自动获取匹配组件的完整 API 信息
    const detailedResults = await Promise.all(
      results.map(async (result) => {
        const fullComponent = await getComponentData(result.name);
        return fullComponent;
      })
    );

    // 过滤掉 null 值
    const validComponents = detailedResults.filter((comp): comp is ComponentData => comp !== null);

    const content = this.formatSearchResultsWithAPI(validComponents);
    
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
    doc += `- **导入**: \`${component.importPath}\`\n`;
    if (component.subComponents && component.subComponents.length > 0) {
      doc += `- **子组件**: ${component.subComponents.map(sub => {
        const subName = typeof sub === 'object' && 'name' in sub ? sub.name : sub;
        return `${component.name}.${subName}`;
      }).join(', ')}\n`;
    }
    doc += `\n`;

    // 主要 Props（使用与搜索结果相同的格式）
    if (component.props && component.props.length > 0) {
      doc += `## 主要 Props\n\n`;
      
      // 定义重要属性的优先级
      const priorityProps = ['value', 'onChange', 'name', 'data', 'columns', 'rules', 'onSubmit', 'disabled', 'placeholder', 'type', 'keygen'];
      
      // 按优先级排序 props
      const sortedProps = [...component.props].sort((a, b) => {
        const aIndex = priorityProps.indexOf(a.name);
        const bIndex = priorityProps.indexOf(b.name);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.required === b.required ? 0 : a.required ? -1 : 1;
      });
      
      // 显示重要的 props
      const topProps = sortedProps.slice(0, 10);
      for (const prop of topProps) {
        const required = prop.required ? ' *(必填)*' : '';
        const defaultValue = prop.defaultValue ? ` 默认: \`${prop.defaultValue}\`` : '';
        const relatedNote = this.getRelatedNote(prop, component);
        doc += `### ${prop.name}${required}\n`;
        doc += `- **类型**: \`${prop.type}\`\n`;
        doc += `- **描述**: ${prop.description}${relatedNote}\n`;
        if (defaultValue) doc += `- **默认值**: ${defaultValue}\n`;
        doc += `\n`;
      }
      
      if (component.props.length > 10) {
        doc += `> 还有 ${component.props.length - 10} 个其他属性，使用表格查看完整列表\n\n`;
        
        // 完整属性表格
        doc += `<details>\n<summary>查看完整属性列表</summary>\n\n`;
        doc += `| 属性名 | 类型 | 默认值 | 必填 | 描述 |\n`;
        doc += `|--------|------|--------|------|------|\n`;
        
        for (const prop of sortedProps.slice(10)) {
          const required = prop.required ? '✅' : '❌';
          const defaultValue = prop.defaultValue || '-';
          const desc = this.truncateDescription(prop.description, 60);
          doc += `| ${prop.name} | \`${prop.type}\` | \`${defaultValue}\` | ${required} | ${desc} |\n`;
        }
        doc += `\n</details>\n\n`;
      }
    }

    // FormRef 方法（仅对 Form 组件）
    if (component.name === 'Form' && (component as any).formRefMethods) {
      doc += `## FormRef 方法\n\n`;
      const methods = (component as any).formRefMethods;
      for (const method of methods) {
        doc += `### ${method.name}\n`;
        doc += `- **描述**: ${method.description}\n`;
        if (method.signature) {
          doc += `- **签名**: \`${method.signature}\`\n`;
        }
        doc += `\n`;
      }
    }

    // FormDatum 方法（仅对 Form 组件）
    if (component.name === 'Form' && (component as any).formDatumMethods) {
      doc += `## FormDatum 方法\n\n`;
      const methods = (component as any).formDatumMethods;
      for (const method of methods) {
        doc += `### ${method.name}\n`;
        doc += `- **描述**: ${method.description}\n`;
        if (method.signature) {
          doc += `- **签名**: \`${method.signature}\`\n`;
        }
        doc += `\n`;
      }
    }

    // 列配置（仅对 Table 组件）
    if (component.name === 'Table' && (component as any).columnsProps) {
      doc += `## 列配置选项 (CommonColumn)\n\n`;
      const columnProps = (component as any).columnsProps;
      
      // 重要的列配置属性
      const importantProps = ['title', 'render', 'width', 'sorter', 'filter', 'fixed', 'type'];
      doc += `### 常用列配置\n\n`;
      
      for (const propName of importantProps) {
        const prop = columnProps.find((p: any) => p.name === propName);
        if (prop) {
          const required = prop.required ? ' *(必填)*' : '';
          doc += `#### ${prop.name}${required}\n`;
          doc += `- **类型**: \`${prop.type}\`\n`;
          doc += `- **描述**: ${prop.description}\n`;
          if (prop.defaultValue) {
            doc += `- **默认值**: \`${prop.defaultValue}\`\n`;
          }
          doc += `\n`;
        }
      }
      
      // 其他列配置
      const otherProps = columnProps.filter((p: any) => !importantProps.includes(p.name));
      if (otherProps.length > 0) {
        doc += `### 其他列配置选项\n\n`;
        doc += `| 属性 | 类型 | 描述 |\n`;
        doc += `|------|------|------|\n`;
        for (const prop of otherProps.slice(0, 10)) {
          doc += `| ${prop.name} | \`${prop.type}\` | ${this.truncateDescription(prop.description, 50)} |\n`;
        }
        if (otherProps.length > 10) {
          doc += `\n> 还有 ${otherProps.length - 10} 个其他列配置属性\n`;
        }
        doc += `\n`;
      }
    }

    // 使用示例
    if (component.examples && component.examples.length > 0) {
      doc += `## 使用示例\n\n`;
      
      // 优先显示基础示例
      const basicExample = component.examples.find(ex => ex.scenario === 'basic') || component.examples[0];
      
      if (basicExample) {
        doc += `### ${basicExample.title}\n\n`;
        if (basicExample.description) {
          doc += `${basicExample.description}\n\n`;
        }
        
        // 提取并清理示例代码
        const cleanCode = this.extractCleanCode(basicExample.code);
        const truncatedCode = this.truncateCode(cleanCode, 600);
        doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
      }
      
      // 如果是表单组件，显示表单相关示例
      if (component.category === 'form' || component.name === 'Form') {
        const formExample = component.examples.find(ex => 
          ex.scenario === 'form' || 
          ex.title.toLowerCase().includes('form') ||
          ex.title.includes('表单')
        );
        
        if (formExample && formExample !== basicExample) {
          doc += `### ${formExample.title}\n\n`;
          if (formExample.description) {
            doc += `${formExample.description}\n\n`;
          }
          const cleanCode = this.extractCleanCode(formExample.code);
          const truncatedCode = this.truncateCode(cleanCode, 400);
          doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
        }
      }
      
      // 列出其他可用示例
      const displayedExamples = [basicExample];
      if (component.category === 'form') {
        const formEx = component.examples.find(ex => ex.scenario === 'form');
        if (formEx) displayedExamples.push(formEx);
      }
      
      const otherExamples = component.examples.filter(ex => !displayedExamples.includes(ex));
      if (otherExamples.length > 0) {
        doc += `### 其他可用示例\n\n`;
        for (const example of otherExamples.slice(0, 4)) {
          doc += `- **${example.title}**: ${example.description || example.scenario}\n`;
        }
        if (otherExamples.length > 4) {
          doc += `- ...还有 ${otherExamples.length - 4} 个其他示例\n`;
        }
        doc += `\n`;
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


  private formatSearchResultsWithAPI(components: ComponentData[]): string {
    let content = `找到 ${components.length} 个相关组件:\n\n`;
    
    for (const component of components) {
      content += `## ${component.name}\n`;
      content += `${component.description}\n\n`;
      
      // 基本信息
      content += `### 基本信息\n`;
      content += `- **分类**: ${this.getCategoryName(component.category)}\n`;
      content += `- **导入**: \`${component.importPath}\`\n`;
      if (component.subComponents && component.subComponents.length > 0) {
        content += `- **子组件**: ${component.subComponents.map(sub => {
          // 如果子组件是对象，提取名称；如果是字符串，直接使用
          const subName = typeof sub === 'object' && 'name' in sub ? sub.name : sub;
          return `${component.name}.${subName}`;
        }).join(', ')}\n`;
      }
      content += `\n`;

      // 主要 Props（优先显示重要属性）
      if (component.props && component.props.length > 0) {
        content += `### 主要 Props\n`;
        
        // 定义重要属性的优先级
        const priorityProps = ['value', 'onChange', 'name', 'data', 'columns', 'rules', 'onSubmit', 'disabled', 'placeholder', 'type'];
        
        // 按优先级排序 props
        const sortedProps = [...component.props].sort((a, b) => {
          const aIndex = priorityProps.indexOf(a.name);
          const bIndex = priorityProps.indexOf(b.name);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.required === b.required ? 0 : a.required ? -1 : 1;
        });
        
        // 显示前 6 个最重要的 props
        const importantProps = sortedProps.slice(0, 6);
        for (const prop of importantProps) {
          const required = prop.required ? ' *(必填)*' : '';
          const relatedNote = this.getRelatedNote(prop, component);
          content += `- **${prop.name}**${required}: \`${prop.type}\` - ${this.truncateDescription(prop.description, 80)}${relatedNote}\n`;
        }
        
        if (component.props.length > 6) {
          content += `- ...还有 ${component.props.length - 6} 个其他属性\n`;
        }
        content += `\n`;
      }

      // 相关方法或配置
      if ((component as any).formRefMethods) {
        content += `### FormRef 方法\n`;
        const methods = (component as any).formRefMethods;
        for (let i = 0; i < Math.min(3, methods.length); i++) {
          content += `- **${methods[i].name}**: ${this.truncateDescription(methods[i].description, 80)}\n`;
        }
        if (methods.length > 3) {
          content += `- ...还有 ${methods.length - 3} 个其他方法\n`;
        }
        content += `\n`;
      }

      if ((component as any).columnsProps) {
        content += `### 列配置选项\n`;
        const columnProps = (component as any).columnsProps;
        content += `支持 ${columnProps.length} 个列配置属性，包括：\n`;
        const mainProps = ['title', 'render', 'width', 'sorter', 'filter'];
        for (const propName of mainProps) {
          const prop = columnProps.find((p: any) => p.name === propName);
          if (prop) {
            content += `- **${prop.name}**: ${this.truncateDescription(prop.description, 60)}\n`;
          }
        }
        content += `\n`;
      }

      // 使用示例 - 包含实际代码
      if (component.examples && component.examples.length > 0) {
        content += `### 使用示例\n\n`;
        
        // 选择最相关的示例（优先基础示例）
        const basicExample = component.examples.find(ex => ex.scenario === 'basic') || component.examples[0];
        
        if (basicExample) {
          content += `#### ${basicExample.title}\n`;
          if (basicExample.description) {
            content += `${basicExample.description}\n\n`;
          }
          
          // 提取并清理示例代码
          const cleanCode = this.extractCleanCode(basicExample.code);
          const truncatedCode = this.truncateCode(cleanCode, 500);
          
          content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
        }

        // 如果有表单相关的示例，也包含它
        if (component.category === 'form' || component.name === 'Form') {
          const formExample = component.examples.find(ex => 
            ex.scenario === 'form' || 
            ex.title.toLowerCase().includes('form') ||
            ex.title.includes('表单')
          );
          
          if (formExample && formExample !== basicExample) {
            content += `#### ${formExample.title}\n`;
            const cleanCode = this.extractCleanCode(formExample.code);
            const truncatedCode = this.truncateCode(cleanCode, 300);
            content += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
          }
        }

        // 列出其他可用示例
        const otherExamples = component.examples.filter(ex => 
          ex !== basicExample && 
          !(component.category === 'form' && ex.scenario === 'form')
        );
        
        if (otherExamples.length > 0) {
          content += `#### 其他可用示例：\n`;
          otherExamples.slice(0, 3).forEach(ex => {
            content += `- **${ex.title}**: ${ex.description || ex.scenario}\n`;
          });
          content += `\n`;
        }
      }

      content += `---\n\n`;
    }
    
    return content;
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }

  private getRelatedNote(prop: any, component: ComponentData): string {
    // 为特定属性添加相关提示
    if (prop.relatedComponent) {
      return ` (见 ${prop.relatedComponent} 组件)`;
    }
    if (prop.relatedMethods) {
      return ` (见下方${prop.relatedMethods}方法)`;
    }
    if (prop.relatedConfig) {
      return ` (见下方${prop.relatedConfig}配置)`;
    }
    
    // 基于属性名的智能提示
    if (prop.name === 'formRef' && component.name === 'Form') {
      return ' (见下方FormRef方法)';
    }
    if (prop.name === 'columns' && component.name === 'Table') {
      return ' (见下方列配置选项)';
    }
    if (prop.name === 'rules') {
      return ' (见 Rule 组件)';
    }
    
    return '';
  }

  private truncateCode(code: string, maxLength: number): string {
    if (code.length <= maxLength) return code;
    
    // 尝试在合适的位置截断（如组件结尾、函数结尾等）
    const lines = code.split('\n');
    let truncated = '';
    let currentLength = 0;
    
    for (const line of lines) {
      if (currentLength + line.length > maxLength) {
        // 如果当前行会超过限制，尝试找到一个好的截断点
        if (truncated.includes('return (') || truncated.includes('return <')) {
          // 如果已经包含了组件的返回部分，可以在这里截断
          truncated += '\n  // ... 更多代码\n';
          break;
        }
      }
      truncated += line + '\n';
      currentLength += line.length + 1;
    }
    
    return truncated.trim();
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