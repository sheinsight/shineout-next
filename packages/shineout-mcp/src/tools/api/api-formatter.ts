import { ComponentAPI, ComponentAPIWithExamples } from './api-query-service.js';

export class APIFormatter {
  /**
   * 格式化完整的 API 文档
   */
  formatComponentAPI(componentName: string, api: ComponentAPI): string {
    let doc = `# ${componentName} API 文档\n\n`;

    // Props
    if (api.props && api.props.length > 0) {
      doc += this.formatProps(api.props);
    }

    // Methods
    if (api.methods && api.methods.length > 0) {
      doc += this.formatMethods(api.methods);
    }

    // Sub Components
    if (api.subComponents && api.subComponents.length > 0) {
      doc += this.formatSubComponents(api.subComponents);
    }

    // Events
    if (api.events && api.events.length > 0) {
      doc += this.formatEvents(api.events);
    }

    return doc;
  }

  /**
   * 格式化包含示例的 API 文档
   */
  formatComponentAPIWithExamples(componentName: string, api: ComponentAPIWithExamples): string {
    let doc = `# ${componentName} API 文档\n\n`;

    // Props
    if (api.props && api.props.length > 0) {
      doc += this.formatProps(api.props);
      
      // 添加与 props 相关的示例
      const propExamples = api.relatedExamples?.filter(ex => ex.prop);
      if (propExamples && propExamples.length > 0) {
        doc += this.formatRelatedExamples('属性使用示例', propExamples);
      }
    }

    // Methods
    if (api.methods && api.methods.length > 0) {
      doc += this.formatMethods(api.methods);
      
      // 添加与 methods 相关的示例
      const methodExamples = api.relatedExamples?.filter(ex => ex.method);
      if (methodExamples && methodExamples.length > 0) {
        doc += this.formatRelatedExamples('方法使用示例', methodExamples);
      }
    }

    // Sub Components
    if (api.subComponents && api.subComponents.length > 0) {
      doc += this.formatSubComponents(api.subComponents);
    }

    // Events
    if (api.events && api.events.length > 0) {
      doc += this.formatEvents(api.events);
    }

    // 完整示例
    if (api.examples && api.examples.length > 0) {
      doc += this.formatFullExamples(api.examples);
    }

    return doc;
  }

  /**
   * 格式化 Props
   */
  formatProps(props: NonNullable<ComponentAPI['props']>): string {
    let doc = `## Props\n\n`;
    doc += `共 ${props.length} 个属性\n\n`;
    doc += `| 属性名 | 类型 | 必填 | 默认值 | 描述 |\n`;
    doc += `|--------|------|------|--------|------|\n`;

    for (const prop of props) {
      const required = prop.required ? '✅' : '❌';
      const defaultValue = prop.defaultValue || '-';
      doc += `| **${prop.name}** | \`${prop.type}\` | ${required} | \`${defaultValue}\` | ${prop.description} |\n`;
    }
    doc += `\n`;

    return doc;
  }

  /**
   * 格式化 Methods
   */
  formatMethods(methods: NonNullable<ComponentAPI['methods']>): string {
    let doc = `## Methods\n\n`;
    
    // 按类别分组
    const grouped = methods.reduce((acc, method) => {
      const category = (method as any).category || 'General';
      if (!acc[category]) acc[category] = [];
      acc[category].push(method);
      return acc;
    }, {} as Record<string, typeof methods>);

    for (const [category, categoryMethods] of Object.entries(grouped)) {
      if (category !== 'General') {
        doc += `### ${category} 方法\n\n`;
      }
      
      for (const method of categoryMethods) {
        doc += `#### ${method.name}\n\n`;
        doc += `${method.description}\n\n`;
        
        if (method.signature) {
          doc += `**签名：**\n\`\`\`typescript\n${method.signature}\n\`\`\`\n\n`;
        }
        
        if (method.parameters && method.parameters.length > 0) {
          doc += `**参数：**\n`;
          for (const param of method.parameters) {
            doc += `- **${param.name}** (\`${param.type}\`): ${param.description}\n`;
          }
          doc += `\n`;
        }
        
        if (method.returns) {
          doc += `**返回值：** \`${method.returns}\`\n\n`;
        }
      }
    }

    return doc;
  }

  /**
   * 格式化子组件
   */
  formatSubComponents(subComponents: NonNullable<ComponentAPI['subComponents']>): string {
    let doc = `## 子组件\n\n`;
    
    for (const sub of subComponents) {
      doc += `- **${sub.name}**`;
      if (sub.description) {
        doc += `: ${sub.description}`;
      }
      doc += `\n`;
    }
    doc += `\n`;

    return doc;
  }

  /**
   * 格式化事件
   */
  formatEvents(events: NonNullable<ComponentAPI['events']>): string {
    let doc = `## Events\n\n`;
    doc += `| 事件名 | 类型 | 描述 |\n`;
    doc += `|--------|------|------|\n`;

    for (const event of events) {
      doc += `| **${event.name}** | \`${event.type}\` | ${event.description} |\n`;
    }
    doc += `\n`;

    return doc;
  }

  /**
   * 格式化 API 搜索结果
   */
  formatAPISearchResults(results: Array<{
    component: string;
    type: 'prop' | 'method' | 'event';
    item: any;
  }>): string {
    if (results.length === 0) {
      return '未找到匹配的 API。';
    }

    let doc = `# API 搜索结果\n\n`;
    doc += `找到 ${results.length} 个匹配项\n\n`;

    // 按组件分组
    const grouped = results.reduce((acc, result) => {
      if (!acc[result.component]) acc[result.component] = [];
      acc[result.component].push(result);
      return acc;
    }, {} as Record<string, typeof results>);

    for (const [component, items] of Object.entries(grouped)) {
      doc += `## ${component}\n\n`;
      
      for (const { type, item } of items) {
        if (type === 'prop') {
          doc += `### 属性: ${item.name}\n`;
          doc += `- **类型**: \`${item.type}\`\n`;
          doc += `- **必填**: ${item.required ? '是' : '否'}\n`;
          doc += `- **描述**: ${item.description}\n\n`;
        } else if (type === 'method') {
          doc += `### 方法: ${item.name}`;
          if (item.category) {
            doc += ` (${item.category})`;
          }
          doc += `\n`;
          doc += `- **描述**: ${item.description}\n`;
          if (item.signature) {
            doc += `- **签名**: \`${item.signature}\`\n`;
          }
          doc += `\n`;
        } else if (type === 'event') {
          doc += `### 事件: ${item.name}\n`;
          doc += `- **类型**: \`${item.type}\`\n`;
          doc += `- **描述**: ${item.description}\n\n`;
        }
      }
    }

    return doc;
  }

  /**
   * 格式化 API 对比结果
   */
  formatAPIComparison(comparison: Record<string, ComponentAPI | null>): string {
    let doc = `# 组件 API 对比\n\n`;
    
    const components = Object.keys(comparison);
    
    // Props 对比
    doc += `## Props 对比\n\n`;
    const allProps = new Set<string>();
    
    // 收集所有 props
    for (const comp of components) {
      if (comparison[comp]?.props) {
        comparison[comp]!.props!.forEach(p => allProps.add(p.name));
      }
    }

    if (allProps.size > 0) {
      doc += `| 属性 | ${components.join(' | ')} |\n`;
      doc += `|------|${components.map(() => '------').join('|')}|\n`;
      
      for (const propName of Array.from(allProps).sort()) {
        doc += `| ${propName} |`;
        
        for (const comp of components) {
          const prop = comparison[comp]?.props?.find(p => p.name === propName);
          if (prop) {
            doc += ` ✅ \`${prop.type}\` |`;
          } else {
            doc += ` ❌ |`;
          }
        }
        doc += `\n`;
      }
      doc += `\n`;
    }

    return doc;
  }

  /**
   * 格式化相关示例
   */
  private formatRelatedExamples(title: string, examples: NonNullable<ComponentAPIWithExamples['relatedExamples']>): string {
    let doc = `### ${title}\n\n`;
    
    // 按属性/方法分组
    const grouped = new Map<string, typeof examples>();
    for (const ex of examples) {
      const key = ex.prop || ex.method || 'unknown';
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(ex);
    }

    for (const [key, items] of grouped) {
      if (items.length > 0) {
        const example = items[0].example;
        doc += `#### 使用 \`${key}\` 的示例\n\n`;
        if (example.description) {
          doc += `${example.description}\n\n`;
        }
        
        // 提取相关代码片段
        const codeSnippet = this.extractRelevantCode(example.code, key);
        doc += `\`\`\`tsx\n${codeSnippet}\n\`\`\`\n\n`;
      }
    }

    return doc;
  }

  /**
   * 格式化完整示例
   */
  private formatFullExamples(examples: NonNullable<ComponentAPIWithExamples['examples']>): string {
    let doc = `## 完整使用示例\n\n`;
    
    // 显示第一个示例
    const basicExample = examples[0];
    
    if (basicExample) {
      doc += `### ${basicExample.title}\n\n`;
      if (basicExample.description) {
        doc += `${basicExample.description}\n\n`;
      }
      
      const cleanCode = this.extractCleanCode(basicExample.code);
      const truncatedCode = this.truncateCode(cleanCode, 600);
      doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
    }

    // 其他重要示例
    const otherExamples = examples.filter(ex => ex !== basicExample);
    if (otherExamples.length > 0) {
      doc += `### 其他示例\n\n`;
      for (const example of otherExamples.slice(0, 2)) {
        doc += `#### ${example.title}\n`;
        if (example.description) {
          doc += `${example.description}\n\n`;
        }
        const cleanCode = this.extractCleanCode(example.code);
        const truncatedCode = this.truncateCode(cleanCode, 400);
        doc += `\`\`\`tsx\n${truncatedCode}\n\`\`\`\n\n`;
      }
    }

    return doc;
  }

  /**
   * 提取相关代码片段
   */
  private extractRelevantCode(fullCode: string, keyword: string): string {
    const lines = fullCode.split('\n');
    const relevantLines: string[] = [];
    let foundKeyword = false;
    let contextBefore = 2;
    let contextAfter = 5;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(keyword)) {
        foundKeyword = true;
        // 添加上下文
        const start = Math.max(0, i - contextBefore);
        const end = Math.min(lines.length, i + contextAfter + 1);
        
        for (let j = start; j < end; j++) {
          relevantLines.push(lines[j]);
        }
        break;
      }
    }
    
    if (!foundKeyword) {
      // 如果没找到关键词，返回前几行
      return lines.slice(0, 10).join('\n') + '\n// ...';
    }
    
    return relevantLines.join('\n');
  }

  /**
   * 清理代码（去除注释）
   */
  private extractCleanCode(rawCode: string): string {
    let cleaned = rawCode.replace(/^\/\*\*[\s\S]*?\*\/\s*\n/, '');
    return cleaned.trim();
  }

  /**
   * 截断代码
   */
  private truncateCode(code: string, maxLength: number): string {
    if (code.length <= maxLength) return code;
    
    const lines = code.split('\n');
    let truncated = '';
    let currentLength = 0;
    
    for (const line of lines) {
      if (currentLength + line.length > maxLength) {
        if (truncated.includes('return (') || truncated.includes('return <')) {
          truncated += '\n  // ... 更多代码\n';
          break;
        }
      }
      truncated += line + '\n';
      currentLength += line.length + 1;
    }
    
    return truncated.trim();
  }
}